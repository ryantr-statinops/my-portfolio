import { createServer } from "node:http";
import { existsSync, statSync, createReadStream } from "node:fs";
import { extname, resolve, sep } from "node:path";

const basePath = "/my-portfolio";
const siteDirectory = resolve("build/client/my-portfolio");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".data": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(pathname) {
  const relativePath = decodeURIComponent(pathname.slice(basePath.length)).replace(/^\/+/, "");
  const normalizedPath = relativePath || "index.html";
  const file = resolve(siteDirectory, normalizedPath);
  if (file !== siteDirectory && !file.startsWith(`${siteDirectory}${sep}`)) return null;
  if (!existsSync(file)) return null;
  if (statSync(file).isDirectory()) return resolve(file, "index.html");
  return file;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  if (url.pathname !== basePath && !url.pathname.startsWith(`${basePath}/`)) {
    response.writeHead(404).end("Not Found");
    return;
  }

  const file = resolveFile(url.pathname);
  if (file && existsSync(file) && statSync(file).isFile()) {
    response.setHeader("Content-Type", contentTypes[extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(response);
    return;
  }

  const notFound = resolve(siteDirectory, "404.html");
  response.statusCode = 404;
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  if (existsSync(notFound)) createReadStream(notFound).pipe(response);
  else response.end("Not Found");
});

const port = Number(process.env.PORT ?? 4173);
server.listen(port, "127.0.0.1", () => console.log(`Static React preview listening on http://127.0.0.1:${port}${basePath}/`));
