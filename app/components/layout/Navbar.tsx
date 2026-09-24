import type { RefObject } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "ABOUT ME", sectionId: "about-me" },
  { label: "STRATEGY", sectionId: "intelligence-hub" },
  { label: "PROJECTS", sectionId: "projects" },
  { label: "CONNECT", sectionId: "connect" },
];

type Props = {
  onOpenMenu: () => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Navbar({ onOpenMenu, menuOpen, menuButtonRef }: Props) {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 w-full px-4 pt-3">
      <nav aria-label="Primary" className="pointer-events-auto mx-auto flex max-w-fit items-center gap-1 rounded-full border border-border/60 bg-card/30 py-1 pl-2 pr-1 shadow-lg shadow-black/5 backdrop-blur-2xl glass">
        <Link to="/" className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-muted/10 transition-transform hover:scale-105" aria-label="Ryan Tran — Home">
          <img src={`${import.meta.env.BASE_URL}images/avt.webp`} alt="" className="h-full w-full object-cover" width="36" height="36" />
        </Link>
        <div className="hidden divide-x divide-border/50 md:flex">
          {navItems.map((item) => (
            <Link key={item.sectionId} to={`/#${item.sectionId}`} data-nav-section={item.sectionId} className="rounded-full px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:text-primary aria-[current=true]:bg-foreground/5 aria-[current=true]:text-primary">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-1 hidden border-l border-border/50 pl-2 md:block"><ThemeToggle /></div>
        <button ref={menuButtonRef} type="button" onClick={onOpenMenu} data-mobile-open aria-label="Open menu" aria-controls="mobile-nav-overlay" aria-expanded={menuOpen} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:text-primary md:hidden">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </nav>
    </div>
  );
}
