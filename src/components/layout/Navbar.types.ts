export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "IDENTITY",  href: "/my-portfolio/#about-me",         sectionId: "about-me" },
  { label: "STRATEGY",  href: "/my-portfolio/#intelligence-hub", sectionId: "intelligence-hub" },
  { label: "PROJECTS",  href: "/my-portfolio/#projects",         sectionId: "projects" },
  { label: "CONNECT",   href: "/my-portfolio/#connect",          sectionId: "connect" },
];
