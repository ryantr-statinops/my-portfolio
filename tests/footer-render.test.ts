import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import Footer from "../app/components/layout/Footer";

it.each([false, true])("prerenders the compact Connect footer (transparent=%s)", (transparentBackground) => {
  const html = renderToStaticMarkup(createElement(Footer, { transparentBackground }));
  expect(html).toContain(transparentBackground ? "bg-transparent" : "bg-background");
  expect(html).toContain('aria-labelledby="connect-title"');
  expect(html).toContain("Let’s connect");
  expect(html).toContain("Back to top");
  expect(html.match(/<a /g)).toHaveLength(4);
  expect(html.match(/mailto:/g)).toHaveLength(1);
  expect(html).toContain("tel:+84987357707");
  for (const text of ["min-h-screen", "reveal", "System Status", "Deployment:", "Protocol_Secure", "Precision_Systems_Specialist", "<img"]) expect(html).not.toContain(text);
});
