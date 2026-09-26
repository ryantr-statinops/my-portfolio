import { isRouteErrorResponse, Link } from "react-router";
import { SITE } from "../../src/lib/constants";
import { getProjectBySlug, orderedProjects } from "../data/projects";
import { readProjectMarkdown } from "../data/project-content";
import type { Project } from "../data/project-schema";
import ProjectMarkdown from "../components/ProjectMarkdown";

type ProjectLoaderData = { project: Project; markdown: string };

export function loader({ params }: { params: { slug?: string } }): ProjectLoaderData {
  const project = getProjectBySlug(params.slug ?? "");
  if (!project) {
    throw new Response("Project not found", { status: 404 });
  }
  return { project, markdown: readProjectMarkdown(project.routeSlug) };
}

export function meta({ data }: { data?: ProjectLoaderData }) {
  if (!data) {
    return [{ title: "Project Not Found | Ryan Tran" }, { name: "robots", content: "noindex" }];
  }

  const { project } = data;
  const title = `${project.title} | Ryan Tran`;
  const canonical = `${SITE.site}${SITE.base}/projects/${project.routeSlug}/`;
  const image = `${SITE.site}${SITE.base}${project.thumbnail}`;
  return [
    { title },
    { name: "description", content: project.description },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:type", content: "article" },
    { property: "og:url", content: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: project.description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: project.description },
    { name: "twitter:image", content: image },
  ];
}

export default function ProjectRoute({ loaderData }: { loaderData: ProjectLoaderData }) {
  const { project, markdown } = loaderData;
  const related = orderedProjects.filter((entry) => entry.routeSlug !== project.routeSlug).slice(0, 2);
  return (
    <article className="mx-auto max-w-4xl px-6 py-32 md:px-8">
      <header className="mb-16 space-y-6 border-b border-border pb-16">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary"><span className="rounded border border-primary/20 px-2 py-1">{project.category.replaceAll("-", " ")}</span><span className="text-muted">•</span><time className="font-mono text-muted" dateTime={project.date}>{project.date}</time></div>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">{project.title}</h1>
        <p className="text-xl leading-relaxed text-muted">{project.description}</p>
        <div className="space-y-4 pt-4"><div className="flex flex-wrap gap-2">{project.stack.map((technology) => <span key={technology} className="rounded bg-primary/5 px-3 py-1 font-mono text-xs">{technology}</span>)}</div><p className="border-l-2 border-primary pl-4 text-sm text-muted">{project.impact}</p><div className="flex flex-wrap gap-3">{project.links.github && <a className="rounded border border-border px-4 py-2 text-sm hover:border-primary" href={project.links.github} target="_blank" rel="noreferrer">Source Repository</a>}{project.links.demo && <a className="rounded border border-border px-4 py-2 text-sm hover:border-primary" href={project.links.demo} target="_blank" rel="noreferrer">Live Demo</a>}</div></div>
      </header>
      <ProjectMarkdown content={markdown} />
      <nav aria-label="Related projects" className="mt-20 border-t border-border pt-12"><h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">Related Projects</h2><ul className="grid gap-4 sm:grid-cols-2">{related.map((entry: Project) => <li key={entry.routeSlug}><Link className="block rounded border border-border p-4 hover:border-primary" to={`/projects/${entry.routeSlug}/`}><span className="block font-semibold">{entry.title}</span><span className="mt-2 block text-xs text-muted">{entry.category.replaceAll("-", " ")}</span></Link></li>)}</ul></nav>
    </article>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  return <main className="mx-auto max-w-3xl px-6 py-32"><h1 className="text-4xl font-bold">{isNotFound ? "Project not found" : "Unable to load project"}</h1><p className="mt-4 text-muted">{isNotFound ? "This project slug is not in the published portfolio." : "An unexpected error occurred while loading this project."}</p><Link className="mt-8 inline-block underline" to="/projects/">Return to Project Registry</Link></main>;
}
