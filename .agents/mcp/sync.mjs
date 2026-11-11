import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { object, validName, validateManifest } from "./manifest.mjs";

const begin = "# BEGIN GENERATED PROJECT MCP";
const end = "# END GENERATED PROJECT MCP";
const statePath = ".agents/mcp/generated.json";
const legacyCodex = '[mcp_servers.stitch]\nurl = "https://stitch.googleapis.com/mcp"\nhttp_headers_helper = "node scripts/stitch-mcp-headers.mjs"';
const targets = [
  { path: ".mcp.json", client: "claude", key: "mcpServers" },
  { path: ".cursor/mcp.json", client: "cursor", key: "mcpServers" },
  { path: ".gemini/settings.json", client: "gemini", key: "mcpServers" },
  { path: ".vscode/mcp.json", client: "vscode", key: "servers" },
];
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

function read(root, path) {
  try {
    return readFileSync(join(root, path), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

function parse(text, label) {
  try {
    return object(JSON.parse(text), label);
  } catch {
    throw new Error(`${label}: expected a JSON object (comments/JSONC are not supported); file was not changed.`);
  }
}

function reference(client, name) {
  return ["cursor", "vscode"].includes(client) ? `\${env:${name}}` : `\${${name}}`;
}

function renderServer(server, client) {
  if (server.type === "stdio") {
    return {
      ...(client === "claude" || client === "vscode" ? { type: "stdio" } : {}),
      command: server.command,
      args: server.args ?? [],
      ...(server.envVars?.length ? { env: Object.fromEntries(server.envVars.map((name) => [name, reference(client, name)])) } : {}),
    };
  }
  return {
    ...(client === "claude" || client === "vscode" ? { type: "http" } : {}),
    [client === "gemini" ? "httpUrl" : "url"]: server.url,
    ...(Object.keys(server.envHeaders ?? {}).length ? {
      headers: Object.fromEntries(Object.entries(server.envHeaders).map(([header, variable]) => [header, reference(client, variable)])),
    } : {}),
  };
}

function renderCodex(text, servers) {
  let outside = text.replace(/\r\n/g, "\n");
  if (outside.trim() === legacyCodex) outside = "";
  const lines = outside.split("\n");
  const starts = lines.flatMap((line, index) => line === begin ? [index] : []);
  const ends = lines.flatMap((line, index) => line === end ? [index] : []);
  if (starts.length || ends.length) {
    if (starts.length !== 1 || ends.length !== 1 || starts[0] >= ends[0]) {
      throw new Error(".codex/config.toml: invalid generated block markers; file was not changed.");
    }
    outside = [...lines.slice(0, starts[0]), ...lines.slice(ends[0] + 1)].join("\n");
  }
  // Refuse overlapping manually defined tables rather than trying to rewrite TOML.
  if (/^\s*mcp_servers\s*=|^\s*\[\s*mcp_servers\s*\]/m.test(outside)) {
    throw new Error(".codex/config.toml: move the manual mcp_servers root into individual tables before syncing.");
  }
  for (const name of Object.keys(servers)) {
    const table = new RegExp(`^\\s*\\[\\[?\\s*mcp_servers\\s*\\.\\s*(?:${name}|"${name}"|'${name}')\\s*[.\\]]`, "m");
    if (table.test(outside)) {
      throw new Error(`.codex/config.toml: ${name} already exists outside the generated block; file was not changed.`);
    }
  }
  const block = [begin, "# Edit .agents/mcp/servers.json, then run npm run mcp:sync."];
  for (const [name, server] of Object.entries(servers)) {
    block.push("", `[mcp_servers.${name}]`);
    if (server.type === "http") {
      block.push(`url = ${JSON.stringify(server.url)}`);
      if (Object.keys(server.envHeaders ?? {}).length) {
        block.push(`http_headers_helper = "node .agents/mcp/headers.mjs ${name}"`);
      }
    } else {
      block.push(`command = ${JSON.stringify(server.command)}`, `args = ${JSON.stringify(server.args ?? [])}`);
      if (server.envVars?.length) block.push(`env_vars = ${JSON.stringify(server.envVars)}`);
    }
  }
  block.push(end);
  return `${outside.trimEnd() ? `${outside.trimEnd()}\n\n` : ""}${block.join("\n")}\n`;
}

export function syncWorkspace(root, { check = false } = {}) {
  const manifest = validateManifest(parse(read(root, ".agents/mcp/servers.json"), "servers.json"));
  const stateText = read(root, statePath);
  const previous = stateText ? parse(stateText, statePath).serverNames : [];
  if (!Array.isArray(previous) || previous.some((name) => typeof name !== "string" || !validName(name))) {
    throw new Error(`${statePath}: invalid managed server list.`);
  }
  // Plan every output before writing so a conflict cannot leave a partial sync.
  const hasServers = Object.keys(manifest.servers).length > 0;
  const codexText = read(root, ".codex/config.toml");
  const plan = [];
  if (hasServers || codexText) {
    plan.push({ path: ".codex/config.toml", text: renderCodex(codexText, manifest.servers) });
  }
  for (const target of targets) {
    const text = read(root, target.path);
    if (!hasServers && !text) continue;
    const document = text ? parse(text, target.path) : {};
    const existing = object(document[target.key] ?? {}, `${target.path}: ${target.key}`);
    const next = { ...existing };
    for (const name of previous) delete next[name];
    for (const [name, server] of Object.entries(manifest.servers)) {
      const rendered = renderServer(server, target.client);
      if (Object.hasOwn(existing, name) && !previous.includes(name) && !isDeepStrictEqual(existing[name], rendered)) {
        throw new Error(`${target.path}: ${name} conflicts with an unmanaged server; file was not changed.`);
      }
      Object.defineProperty(next, name, { value: rendered, enumerable: true, writable: true, configurable: true });
    }
    plan.push({ path: target.path, text: json({ ...document, [target.key]: next }) });
  }
  plan.push({ path: statePath, text: json({ serverNames: Object.keys(manifest.servers) }) });
  // Git may check generated files out with CRLF on Windows.
  const changes = plan.filter((entry) => read(root, entry.path).replace(/\r\n/g, "\n") !== entry.text);
  if (!check) {
    for (const entry of changes) {
      const destination = join(root, entry.path);
      mkdirSync(dirname(destination), { recursive: true });
      writeFileSync(destination, entry.text, "utf8");
    }
  }
  return changes.map((entry) => entry.path);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--check") || args.length > 1) throw new Error("Usage: node .agents/mcp/sync.mjs [--check]");
    const check = args.includes("--check");
    const changes = syncWorkspace(fileURLToPath(new URL("../../", import.meta.url)), { check });
    if (changes.length) {
      process.stdout.write(`${check ? "Out of sync" : "Updated"}:\n${changes.map((path) => `  ${path}`).join("\n")}\n`);
      if (check) process.exitCode = 1;
    } else {
      process.stdout.write("Project MCP configurations are in sync.\n");
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
