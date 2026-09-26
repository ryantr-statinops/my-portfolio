import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProjectHub from "../app/components/sections/ProjectHub";
import { fixtureProjects } from "./fixtures/projects";
import { PROJECT_STATUS } from "../app/components/ProjectStatusBadge";
import { projectStatusSchema } from "../app/data/project-schema";
import { projectCatalogSchema } from "../app/data/project-schema";

describe("Project Hub prerender", () => {
  it.each(projectStatusSchema.options)("renders readable %s status before hydration", (status) => {
    const html = renderToStaticMarkup(createElement(ProjectHub, { projects: [{ ...fixtureProjects[0], status }] }));
    expect(html).toContain(`data-project-status="${status}"`);
    expect(html).toContain(PROJECT_STATUS[status].label);
    expect(html).toContain("Status: ");
  });
  it("renders all overviews and safe external links before hydration", () => {
    const html = renderToStaticMarkup(createElement(ProjectHub, { projects: projectCatalogSchema.parse(fixtureProjects) }));
    for (const p of fixtureProjects) {
      expect(html).toContain(p.title);
      expect(html).toContain(p.description);
      expect(html).toContain(p.links.github);
    }
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
    expect(html).not.toContain('data-project-category=');
    expect(html.indexOf("Data First")).toBeLessThan(html.indexOf("Software First"));
  });
  it("renders an honest empty state", () => {
    const html = renderToStaticMarkup(createElement(ProjectHub, { projects: [] }));
    expect(html).toContain("Projects are being prepared.");
    expect(html).not.toContain("View repository");
  });
});
