import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "react-router";

const sections = [
  { id: "main", label: "Intro", isSectionTarget: false },
  { id: "about-me", label: "ABOUT ME", isSectionTarget: true },
  { id: "projects", label: "PROJECTS", isSectionTarget: true },
  { id: "connect", label: "CONNECT", isSectionTarget: true },
];

type Props = {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
};

export default function VerticalStepper({ onNavigate }: Props) {
  const [activeSection, setActiveSection] = useState("main");

  useEffect(() => {
    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame: number | null = null;

    function handleScroll() {
      frame = null;
      const readingLine = window.innerHeight * 0.45;
      let current = sectionElements.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      })?.id;

      if (!current && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        current = sections.at(-1)?.id;
      }
      if (current) {
        setActiveSection(current);
      }
    }

    function schedule() {
      if (frame === null) frame = requestAnimationFrame(handleScroll);
    }

    handleScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-6 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start select-none pointer-events-auto"
    >
      <div className="relative flex flex-col gap-6 font-mono text-xs">
        {/* Continuous vertical tracking line running exactly down the center (left = 7px of 15px column) */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border/40 pointer-events-none" />

        {sections.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              data-nav-section={item.isSectionTarget ? item.id : undefined}
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate(e, item.id);
                } else {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`nav-control ${item.isSectionTarget ? "nav-section-link" : ""} group flex items-center gap-3 transition-colors duration-200 !min-h-0 !bg-transparent hover:!bg-transparent py-0.5 cursor-pointer`}
            >
              {/* Dedicated 15px indicator node column - center is at x = 7.5px */}
              <div className="relative flex h-[15px] w-[15px] items-center justify-center shrink-0">
                {isActive ? (
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-4 w-4 rounded-full bg-accent/20 ring-1 ring-accent/40 animate-pulse" />
                    <span className="relative h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-muted/40 transition-colors" />
                )}
              </div>

              {/* Label text: only text shifts on active, the circle stays dead-center */}
              <span
                className={`tracking-wider text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? "!text-accent font-bold translate-x-1"
                    : "!text-muted/60 group-hover:!text-foreground group-hover:translate-x-0.5"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
