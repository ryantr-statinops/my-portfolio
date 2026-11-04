import { useEffect, useState, type MouseEvent, RefObject } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

type Props = {
  onOpenMenu: () => void;
  onNavigateToSection?: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Navbar({ onOpenMenu, menuOpen, menuButtonRef }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none fixed left-0 top-0 z-50 w-full px-6 py-5 md:px-10 md:py-6 lg:px-14 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Left: Brand + Editorial Menu Button */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
          <Link
            to="/"
            className="font-mono text-lg md:text-xl font-bold uppercase tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="Ryan Tran — Home"
          >
            RYAN TRAN
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={onOpenMenu}
            data-mobile-open
            aria-label="Open menu"
            aria-controls="mobile-nav-overlay"
            aria-expanded={menuOpen}
            className="group flex items-center gap-2.5 text-xs md:text-sm font-medium text-foreground tracking-wide transition-opacity hover:opacity-70 cursor-pointer"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <span className="block h-[1.5px] w-full bg-foreground transition-transform group-hover:translate-x-0.5" />
              <span className="block h-[1.5px] w-3.5 bg-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <span className="font-sans font-medium text-xs md:text-sm">Menu</span>
          </button>
        </div>

        {/* Center: Open & Empty Editorial Breathing Space */}
        <div className="hidden md:block flex-1" />

        {/* Right: Round Search & Theme Toggle Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            aria-label="Search catalog"
            title="Search catalog"
            className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-border/80 bg-background/50 backdrop-blur-sm text-foreground transition-all hover:border-foreground hover:scale-105 active:scale-95 cursor-pointer"
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
            className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-border/80 bg-background/50 backdrop-blur-sm text-foreground transition-all hover:border-foreground hover:scale-105 active:scale-95 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
