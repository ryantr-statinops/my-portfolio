import type { MouseEvent, RefObject } from "react";
import { Link } from "react-router";

const navItems = [
  { label: "ABOUT ME", sectionId: "about-me" },
  { label: "PROJECTS", sectionId: "projects" },
  { label: "CONNECT", sectionId: "connect" },
];

type Props = {
  onOpenMenu: () => void;
  onNavigateToSection: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Navbar({ onOpenMenu, onNavigateToSection, menuOpen, menuButtonRef }: Props) {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 w-full px-4 pt-3">
      <nav aria-label="Primary" className="info-box info-box--navigation navbar-compact pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-1">
        <Link to="/" className="nav-control flex w-11 shrink-0 items-center justify-center" aria-label="Ryan Tran — Home">
          <img src={`${import.meta.env.BASE_URL}images/avt.webp`} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" width="32" height="32" />
        </Link>
        <div className="hidden items-center gap-[calc(0.25rem_+_16px)] pr-4 md:flex">
          {navItems.map((item) => <Link key={item.sectionId} to={`/#${item.sectionId}`} onClick={(event) => onNavigateToSection(event, item.sectionId)} data-nav-section={item.sectionId} className="nav-control nav-section-link inline-flex items-center text-xs font-medium">{item.label}</Link>)}
        </div>
        <button ref={menuButtonRef} type="button" onClick={onOpenMenu} data-mobile-open aria-label="Open menu" aria-controls="mobile-nav-overlay" aria-expanded={menuOpen} className="nav-control inline-flex w-11 shrink-0 items-center justify-center md:hidden"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
      </nav>
    </div>
  );
}
