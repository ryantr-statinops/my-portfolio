import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import test from "node:test";
import { resolveHeaders } from "./headers.mjs";
import { syncWorkspace } from "./sync.mjs";

const stitch = { type: "http", url: "https://stitch.googleapis.com/mcp", envHeaders: { "X-Goog-Api-Key": "STITCH_API_KEY" } };

function write(root, path, value) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
}

const read = (root, path) => readFileSync(join(root, path), "utf8");
const document = (root, path) => JSON.parse(read(root, path));

function fixture(t, servers = { stitch }) {
  const root = mkdtempSync(join(tmpdir(), "portfolio-mcp-"));
  t.after(() => {
    if (dirname(root) !== resolve(tmpdir()) || !basename(root).startsWith("portfolio-mcp-")) {
      throw new Error("Refusing to remove a fixture outside the intended temporary directory.");
    }
    rmSync(root, { recursive: true, force: true });
  });
  write(root, ".agents/mcp/servers.json", { schemaVersion: 1, servers });
  return root;
}

test("renders HTTP transport and credential references for each client without reading .env", (t) => {
  const root = fixture(t);
  write(root, ".env", "STITCH_API_KEY=synthetic-local-test-key\n");
  assert.equal(syncWorkspace(root).length, 6);
  assert.match(read(root, ".codex/config.toml"), /http_headers_helper = "node \.agents\/mcp\/headers\.mjs stitch"/);
  assert.deepEqual(document(root, ".mcp.json").mcpServers.stitch, {
    type: "http", url: stitch.url, headers: { "X-Goog-Api-Key": "${STITCH_API_KEY}" },
  });
  assert.deepEqual(document(root, ".cursor/mcp.json").mcpServers.stitch, {
    url: stitch.url, headers: { "X-Goog-Api-Key": "${env:STITCH_API_KEY}" },
  });
  assert.deepEqual(document(root, ".gemini/settings.json").mcpServers.stitch, {
    httpUrl: stitch.url, headers: { "X-Goog-Api-Key": "${STITCH_API_KEY}" },
  });
  assert.deepEqual(document(root, ".vscode/mcp.json").servers.stitch, {
    type: "http", url: stitch.url, headers: { "X-Goog-Api-Key": "${env:STITCH_API_KEY}" },
  });
  for (const path of [".codex/config.toml", ".mcp.json", ".cursor/mcp.json", ".gemini/settings.json", ".vscode/mcp.json", ".agents/mcp/generated.json"]) {
    assert.ok(!read(root, path).includes("synthetic-local-test-key"));
  }
  assert.deepEqual(syncWorkspace(root), []);
  assert.deepEqual(syncWorkspace(root, { check: true }), []);
});

test("migrates the existing Codex Stitch setup", (t) => {
  const root = fixture(t);
  write(root, ".codex/config.toml", '[mcp_servers.stitch]\r\nurl = "https://stitch.googleapis.com/mcp"\r\nhttp_headers_helper = "node scripts/stitch-mcp-headers.mjs"\r\n');
  syncWorkspace(root);
  assert.equal(read(root, ".codex/config.toml").split("[mcp_servers.stitch]").length, 2);
  assert.ok(!read(root, ".codex/config.toml").includes("scripts/stitch-mcp-headers.mjs"));
});

test("Windows CRLF checkouts do not count as configuration drift", (t) => {
  const root = fixture(t);
  const paths = syncWorkspace(root);
  for (const path of paths) write(root, path, read(root, path).replace(/\n/g, "\r\n"));
  assert.deepEqual(syncWorkspace(root, { check: true }), []);
});

test("preserves unrelated settings and servers when updating or removing managed servers", (t) => {
  const root = fixture(t);
  write(root, ".codex/config.toml", 'model = "example-model"\n\n[mcp_servers.personal]\nurl = "https://example.org/mcp"\n');
  write(root, ".gemini/settings.json", { theme: "custom", mcpServers: { personal: { command: "my-server" } } });
  syncWorkspace(root);
  write(root, ".agents/mcp/servers.json", { schemaVersion: 1, servers: {} });
  syncWorkspace(root);
  assert.deepEqual(document(root, ".gemini/settings.json"), { theme: "custom", mcpServers: { personal: { command: "my-server" } } });
  const codex = read(root, ".codex/config.toml");
  assert.match(codex, /^model = "example-model"/);
  assert.match(codex, /\[mcp_servers.personal\]/);
  assert.ok(!codex.includes("[mcp_servers.stitch]"));
  assert.deepEqual(document(root, ".mcp.json").mcpServers, {});
});

test("renders stdio commands, arguments and environment forwarding", (t) => {
  const root = fixture(t, { local: { type: "stdio", command: "node", args: ["tools/server.mjs", "--flag"], envVars: ["LOCAL_TOKEN"] } });
  syncWorkspace(root);
  assert.deepEqual(document(root, ".mcp.json").mcpServers.local, {
    type: "stdio", command: "node", args: ["tools/server.mjs", "--flag"], env: { LOCAL_TOKEN: "${LOCAL_TOKEN}" },
  });
  assert.deepEqual(document(root, ".vscode/mcp.json").servers.local.env, { LOCAL_TOKEN: "${env:LOCAL_TOKEN}" });
  assert.match(read(root, ".codex/config.toml"), /env_vars = \["LOCAL_TOKEN"\]/);
});

test("check mode reports drift without writing files", (t) => {
  const root = fixture(t);
  syncWorkspace(root);
  const original = read(root, ".mcp.json");
  write(root, ".agents/mcp/servers.json", { schemaVersion: 1, servers: {} });
  assert.ok(syncWorkspace(root, { check: true }).includes(".mcp.json"));
  assert.equal(read(root, ".mcp.json"), original);
  syncWorkspace(root);
  assert.deepEqual(syncWorkspace(root, { check: true }), []);
});

test("an unmanaged server conflict prevents all output writes", (t) => {
  const root = fixture(t);
  write(root, ".cursor/mcp.json", { mcpServers: { stitch: { url: "https://example.org/custom" } } });
  const original = read(root, ".cursor/mcp.json");
  assert.throws(() => syncWorkspace(root), /conflicts with an unmanaged server/);
  assert.equal(read(root, ".cursor/mcp.json"), original);
  assert.throws(() => read(root, ".codex/config.toml"), { code: "ENOENT" });
});

test("rejects overlapping Codex tables, malformed JSON and unsupported manifests without writing", (t) => {
  const root = fixture(t);
  write(root, ".codex/config.toml", '[mcp_servers."stitch"]\nurl = "https://example.org/custom"\n');
  assert.throws(() => syncWorkspace(root), /outside the generated block/);
  write(root, ".codex/config.toml", "");
  write(root, ".cursor/mcp.json", "{ // JSONC settings\n}");
  assert.throws(() => syncWorkspace(root), /comments\/JSONC are not supported/);
  assert.equal(read(root, ".codex/config.toml"), "");
  write(root, ".agents/mcp/servers.json", { schemaVersion: 1, servers: { stitch: { ...stitch, headers: { "X-Key": "literal" } } } });
  assert.throws(() => syncWorkspace(root), /Unsupported field/);
  assert.throws(() => read(root, ".mcp.json"), { code: "ENOENT" });
});

test("header helper resolves local dotenv and prefers process environment", () => {
  assert.deepEqual(resolveHeaders(stitch, {}, 'STITCH_API_KEY="synthetic-file-key" # comment\n'), { "X-Goog-Api-Key": "synthetic-file-key" });
  assert.deepEqual(resolveHeaders(stitch, { STITCH_API_KEY: "synthetic-env-key" }, "STITCH_API_KEY=synthetic-file-key"), { "X-Goog-Api-Key": "synthetic-env-key" });
  for (const value of [undefined, "", "replace-with-your-stitch-api-key", "bad\nheader"]) {
    assert.throws(() => resolveHeaders(stitch, { STITCH_API_KEY: value }), /Set STITCH_API_KEY/);
  }
});
