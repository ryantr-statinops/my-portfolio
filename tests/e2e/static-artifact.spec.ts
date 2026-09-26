import { expect, test } from "@playwright/test";

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
