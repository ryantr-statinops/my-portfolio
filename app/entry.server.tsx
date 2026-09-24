import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: Parameters<typeof ServerRouter>[0]["context"],
) {
  responseHeaders.set("Content-Type", "text/html; charset=utf-8");
  const markup = renderToString(
    <ServerRouter context={routerContext} url={request.url} />,
  );
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
