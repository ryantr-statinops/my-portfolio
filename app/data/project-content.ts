const contentFiles = import.meta.glob<string>("../content/projects/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export function readProjectMarkdown(routeSlug: string) {
  const markdown = contentFiles[`../content/projects/${routeSlug}.md`];
  if (markdown === undefined) {
    throw new Response("Project content not found", { status: 404 });
  }
  return markdown;
}
