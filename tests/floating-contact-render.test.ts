import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import FloatingContact from "../app/components/interactive/FloatingContact";

it("prerenders the floating contact widget with accessible markup and contact options", () => {
  const html = renderToStaticMarkup(createElement(FloatingContact));
  expect(html).toContain("floating-controls");
  expect(html).toContain("Work with me");
  expect(html).toContain('aria-controls="floating-contact-panel"');
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('role="dialog"');
  expect(html).toContain('aria-labelledby="floating-contact-heading"');
  expect(html).toContain("Have a project in mind? Let&#x27;s connect.");
  expect(html).toContain('aria-label="Close contact options"');
  expect(html).toContain("Send an Email");
  expect(html).toContain("Connect on LinkedIn");
  expect(html).toContain("Call or Message");
  expect(html).toContain("mailto:trankhang2856@gmail.com?subject=Project%20Inquiry");
  expect(html).toContain("https://www.linkedin.com/in/ryan-tr/");
  expect(html).toContain("tel:+84987357707");
});
