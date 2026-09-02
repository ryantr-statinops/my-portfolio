export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "IDENTITY",  href: "/#about-me",         sectionId: "about-me" },
  { label: "STRATEGY",  href: "/#intelligence-hub", sectionId: "intelligence-hub" },
  { label: "PROJECTS",  href: "/#projects",         sectionId: "projects" },
  { label: "CONNECT",   href: "/#connect",          sectionId: "connect" },
];
