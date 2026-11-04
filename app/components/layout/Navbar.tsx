import { useEffect, useState, type MouseEvent, RefObject } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

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
    <header className="pointer-events-none fixed left-0 top-0 z-50 flex w-full justify-center px-3 pt-3 md:pt-4">
      <div
        className={`info-box pointer-events-auto flex items-center justify-between gap-3 rounded-full !py-1.5 px-3 md:gap-6 md:!py-2 md:px-5 transition-all duration-300 ${
          isScrolled
            ? "border-border/80 bg-background/90 shadow-2xl backdrop-blur-xl scale-[0.98]"
            : "border-border/40 bg-background/70 shadow-lg backdrop-blur-lg scale-100"
        }`}
      >
        {/* Left: Brand & Live Status + Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-85"
            aria-label="Ryan Tran — Home"
          >
            <div className="relative shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}images/avt.webp`}
                alt=""
                className="h-7 w-7 md:h-8 md:w-8 rounded-full object-cover ring-1 ring-border/80"
                width="32"
                height="32"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-foreground leading-none">
                RYAN TRAN
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-semibold mt-1 leading-none">
                AVAILABLE
              </span>
            </div>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={onOpenMenu}
            data-mobile-open
            aria-label="Open menu"
            aria-controls="mobile-nav-overlay"
            aria-expanded={menuOpen}
            className="group inline-flex h-7 md:h-8 items-center gap-1.5 rounded-full border border-border/50 bg-surface/60 px-2.5 text-xs font-mono font-medium tracking-wide text-foreground transition-all hover:bg-surface hover:border-primary/40"
          >
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:scale-110">
              <path d="M4 7h16M4 17h10" />
            </svg>
            <span className="hidden sm:inline text-[11px]">Menu</span>
          </button>
        </div>

        {/* Center: Desktop/Tablet Navigation Dock Tabs */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 rounded-full border border-border/40 bg-surface/40 p-1 backdrop-blur-sm">
          {navItems.map((item) => (
            <Link
              key={item.sectionId}
              to={`/#${item.sectionId}`}
              onClick={(event) => onNavigateToSection(event, item.sectionId)}
              data-nav-section={item.sectionId}
              className="nav-control nav-section-link inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-semibold tracking-wider text-muted hover:text-foreground transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search button + Volume/Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Search catalog"
            className="info-box inline-flex h-9 w-9 items-center justify-center !p-0 rounded-full text-foreground transition-colors hover:border-primary/50"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <ThemeToggle
            id="navbar-theme-toggle"
            className="info-box inline-flex h-9 w-9 items-center justify-center !p-0 rounded-full text-foreground transition-colors hover:border-primary/50"
          />
        </div>
      </div>
    </header>
  );
}
