import type { MetaFunction } from "react-router";
import { SITE } from "../../src/lib/constants";
import AboutMe from "../components/sections/AboutMe";
import Hero from "../components/sections/Hero";
import ProjectHub from "../components/sections/ProjectHub";
import { projects } from "../data/projects";

const canonical = `${SITE.site}${SITE.base}/`;

export const meta: MetaFunction = () => [
  { title: SITE.title },
  { name: "description", content: SITE.description },
  { tagName: "link", rel: "canonical", href: canonical },
  { property: "og:url", content: canonical },
  { property: "og:image", content: `${SITE.site}${SITE.base}/images/avt.webp` },
  { name: "twitter:image", content: `${SITE.site}${SITE.base}/images/avt.webp` },
];

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <ProjectHub projects={projects} />
    </>
  );
}
