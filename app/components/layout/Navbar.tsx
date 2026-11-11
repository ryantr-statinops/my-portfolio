import type { MouseEvent, RefObject } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

type Props = {
  onOpenMenu: () => void;
  onNavigateToSection?: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Navbar({ onOpenMenu, onNavigateToSection, menuOpen, menuButtonRef }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors">
      <nav aria-label="Primary" className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
        {/* Left: Brand + Editorial Menu Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="font-mono text-base font-bold tracking-tight text-foreground transition-colors hover:text-accent sm:text-lg"
            aria-label="Ryan Tran — Home"
          >
            RT
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={onOpenMenu}
            data-mobile-open
            aria-label="Open menu"
            aria-controls="mobile-nav-overlay"
            aria-expanded={menuOpen}
            className="group flex cursor-pointer items-center gap-2 text-xs font-medium tracking-wide text-foreground transition-opacity hover:opacity-70 sm:hidden"
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span className="block h-[1.5px] w-full bg-foreground transition-transform group-hover:translate-x-0.5" />
              <span className="block h-[1.5px] w-3.5 bg-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <span className="font-sans text-xs font-medium">Menu</span>
          </button>
        </div>

        {/* Center/Right: Inline Navigation Links & Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-4 text-xs font-medium text-muted sm:flex md:gap-6 md:text-sm">
            <Link
              to="/#projects"
              data-nav-section="projects"
              onClick={(e) => onNavigateToSection?.(e, "projects")}
              className="transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              to="/#about-me"
              data-nav-section="about-me"
              onClick={(e) => onNavigateToSection?.(e, "about-me")}
              className="transition-colors hover:text-foreground"
            >
              Experience
            </Link>
            <Link
              to="/#connect"
              data-nav-section="connect"
              onClick={(e) => onNavigateToSection?.(e, "connect")}
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          <div className="hidden h-4 w-[1px] bg-border/80 sm:block" />
          <button
            type="button"
            aria-label="Search catalog"
            title="Search catalog"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/50 text-foreground backdrop-blur-sm transition-all hover:scale-105 hover:border-accent hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)] active:scale-95 md:h-10 md:w-10"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <ThemeToggle
            id="navbar-theme-toggle"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/50 text-foreground backdrop-blur-sm transition-all hover:scale-105 hover:border-accent hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)] active:scale-95 md:h-10 md:w-10"
          />
        </div>
      </nav>
    </header>
  );
}
