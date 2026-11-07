const serverName = /^[a-z][a-z0-9_-]*$/;
const variableName = /^[A-Za-z_][A-Za-z0-9_]*$/;

export function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function fields(value, allowed, label) {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) throw new Error(`Unsupported field in ${label}: ${key}`);
  }
}

export function validName(name) {
  return serverName.test(name) && !["constructor", "prototype"].includes(name);
}

export function validateManifest(value) {
  object(value, "Manifest");
  fields(value, ["schemaVersion", "servers"], "manifest");
  if (value.schemaVersion !== 1) throw new Error("Expected manifest schemaVersion 1.");
  object(value.servers, "servers");

  for (const [name, server] of Object.entries(value.servers)) {
    if (!validName(name)) throw new Error(`Invalid server name: ${name}`);
    object(server, name);
    if (server.type === "http") {
      fields(server, ["type", "url", "envHeaders"], name);
      if (typeof server.url !== "string" || !/^https?:\/\//.test(server.url)) {
        throw new Error(`${name} needs an HTTP(S) URL.`);
      }
      const url = new URL(server.url);
      if (url.username || url.password || url.search || url.hash) {
        throw new Error(`${name}: keep credentials and query parameters out of the URL.`);
      }
      if (server.envHeaders !== undefined) {
        object(server.envHeaders, `${name}.envHeaders`);
        for (const [header, variable] of Object.entries(server.envHeaders)) {
          if (!/^[A-Za-z0-9-]+$/.test(header) || typeof variable !== "string" || !variableName.test(variable)) {
            throw new Error(`${name}.envHeaders must map header names to environment variable names.`);
          }
        }
      }
    } else if (server.type === "stdio") {
      fields(server, ["type", "command", "args", "envVars"], name);
      if (typeof server.command !== "string" || !server.command.trim()) {
        throw new Error(`${name} needs a command.`);
      }
      if (server.args !== undefined && (!Array.isArray(server.args) || server.args.some((arg) => typeof arg !== "string"))) {
        throw new Error(`${name}.args must be an array of strings.`);
      }
      if (server.envVars !== undefined && (!Array.isArray(server.envVars) || server.envVars.some((key) => typeof key !== "string" || !variableName.test(key)))) {
        throw new Error(`${name}.envVars must contain environment variable names.`);
      }
    } else {
      throw new Error(`${name}: supported server types are http and stdio.`);
    }
  }
  return value;
}
