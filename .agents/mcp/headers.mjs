import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseEnv } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateManifest } from "./manifest.mjs";

export function resolveHeaders(server, environment, envText = "") {
  const local = parseEnv(envText);
  return Object.fromEntries(Object.entries(server.envHeaders ?? {}).map(([header, variable]) => {
    const value = environment[variable] ?? local[variable];
    if (!value || value === "replace-with-your-stitch-api-key" || /[\r\n]/.test(value)) {
      throw new Error(`Set ${variable} in the environment or project .env file.`);
    }
    return [header, value];
  }));
}

// Codex invokes this helper locally. Its stdout is a credential channel, not a log.
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const manifest = validateManifest(JSON.parse(readFileSync(new URL("./servers.json", import.meta.url), "utf8")));
    const server = manifest.servers[process.argv[2]];
    if (!server || server.type !== "http") throw new Error("Specify a configured HTTP MCP server.");
    let envText = "";
    try {
      envText = readFileSync(fileURLToPath(new URL("../../.env", import.meta.url)), "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw new Error("Cannot read the project .env file.");
    }
    process.stdout.write(JSON.stringify(resolveHeaders(server, process.env, envText)));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
