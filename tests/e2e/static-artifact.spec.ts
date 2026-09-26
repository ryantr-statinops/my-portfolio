import { expect, test } from "@playwright/test";

import { readFileSync } from "node:fs";
import { projectCatalogSchema } from "../../app/data/project-schema";
const projects = projectCatalogSchema.parse(JSON.parse(readFileSync(new URL("../../app/data/projects.json", import.meta.url), "utf8")));

const publicBase = "https://ryantr-statinops.github.io/my-portfolio/";

test("static sitemap and robots preserve the GitHub Pages base URL", async ({ request, baseURL }) => {
  const indexResponse = await request.get(new URL("sitemap-index.xml", baseURL).href);
  const sitemapResponse = await request.get(new URL("sitemap-0.xml", baseURL).href);
  const robotsResponse = await request.get(new URL("robots.txt", baseURL).href);
  expect(indexResponse.status()).toBe(200);
  expect(sitemapResponse.status()).toBe(200);
  expect(robotsResponse.status()).toBe(200);

  const indexXml = await indexResponse.text();
  const sitemapXml = await sitemapResponse.text();
  const robots = await robotsResponse.text();
  expect(indexXml).toContain(`${publicBase}sitemap-0.xml`);
  expect(robots).toContain(`Sitemap: ${publicBase}sitemap-index.xml`);

  const routeUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(routeUrls).toHaveLength(1);
  expect(routeUrls.every((url) => url.startsWith(publicBase))).toBe(true);
  expect(routeUrls.every((url) => !url.includes("/my-portfolio/my-portfolio/"))).toBe(true);
});

for (const path of ["projects/", "projects/not-a-published-project/", "missing-page/"]) test(`${path} returns a real 404 with a Hub link`, async ({ request, baseURL }) => {
  const response = await request.get(new URL(path, baseURL).href);
  expect(response.status()).toBe(404);
  const html = await response.text();
  expect(html).toContain("Page not found");
  expect(html).toContain('href="/my-portfolio/#projects"');
});

test("static homepage includes every published overview, status and repository", async ({ request, baseURL }) => {
  const response = await request.get(baseURL!);
  expect(response.status()).toBe(200);
  const html = await response.text();
  for (const project of projects) {
    expect(html).toContain(project.title);
    expect(html).toContain(project.description);
    expect(html).toContain(project.links.github);
    expect(html).toContain(`data-project-status="${project.status}"`);
  }
  expect(html.match(/data-project-overview/g)).toHaveLength(12);
  expect(html).not.toContain("Projects are being prepared.");
});
