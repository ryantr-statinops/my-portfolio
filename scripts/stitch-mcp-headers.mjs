import { readFile } from "node:fs/promises";

const envText = await readFile(new URL("../.env", import.meta.url), "utf8");
const keyLine = envText
  .split(/\r?\n/)
  .find((line) => /^\s*STITCH_API_KEY\s*=/.test(line));

const apiKey = keyLine?.slice(keyLine.indexOf("=") + 1).trim().replace(/^(['"])(.*)\1$/, "$2");

if (!apiKey || apiKey === "replace-with-your-stitch-api-key") {
  process.stderr.write("Set STITCH_API_KEY in the project .env file.\n");
  process.exitCode = 1;
} else {
  process.stdout.write(JSON.stringify({ "X-Goog-Api-Key": apiKey }));
}
