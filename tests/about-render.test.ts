import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutMe from "../app/components/sections/AboutMe";

describe("About Me static content", () => {
  it("renders the approved profile, education and contact details without animation gating", () => {
    const html = renderToStaticMarkup(createElement(AboutMe));
    for (const text of ["Statistics Student", "Data · AI · Software", "BSc in Statistics", "Ton Duc Thang University", "2024–Present", "Open to work", "mailto:trankhang2856@gmail.com", "tel:+84987357707"]) expect(html).toContain(text);
    expect(html.match(/<section/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="about-me-title"');
    for (const text of ["reveal", "Journey", "System_Principle", "production hardware", "HUB NETWORK", "Top 3"]) expect(html).not.toContain(text);
  });
  it("renders six focus areas in the approved order", () => {
    const html = renderToStaticMarkup(createElement(AboutMe));
    const titles = ["Backend Engineering", "Data Engineering", "AI Engineering", "Infrastructure", "Quantitative Analytics", "Statistics → Engineering"];
    expect(html.match(/data-focus-card/g)).toHaveLength(6);
    const indices = titles.map(title => html.indexOf(title));
    expect(indices.every(i => i >= 0)).toBe(true);
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });
});
