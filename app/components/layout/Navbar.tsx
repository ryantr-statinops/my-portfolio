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
        {/* Left: Brand + Menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="Ryan Tran — Home"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/avt.webp`}
              alt=""
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-border"
              width="32"
              height="32"
            />
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              RYAN TRAN
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={onOpenMenu}
            data-mobile-open
            aria-label="Open menu"
            aria-controls="mobile-nav-overlay"
            aria-expanded={menuOpen}
            className="info-box info-box--compact inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-mono font-medium tracking-wide text-foreground transition-colors hover:border-primary/50"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 17h10" />
            </svg>
            <span>Menu</span>
          </button>
        </div>

        {/* Center: Desktop/Tablet Navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.sectionId}
              to={`/#${item.sectionId}`}
              onClick={(event) => onNavigateToSection(event, item.sectionId)}
              data-nav-section={item.sectionId}
              className="nav-control nav-section-link inline-flex items-center font-mono text-xs font-medium tracking-wider text-muted hover:text-foreground transition-colors"
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
