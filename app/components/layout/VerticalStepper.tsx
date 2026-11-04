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
      <div className="relative flex flex-col gap-6 pl-4 font-mono text-xs">
        {/* Vertical tracking line */}
        <div className="absolute left-0 top-1 bottom-1 w-[1.5px] bg-border/40" />

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
              className={`nav-control ${item.isSectionTarget ? "nav-section-link" : ""} group flex items-center gap-2 transition-all duration-200 !min-h-0 py-1 ${
                isActive
                  ? "font-semibold text-foreground translate-x-1"
                  : "text-muted/60 hover:text-muted hover:translate-x-0.5"
              }`}
            >
              {/* Stepper indicator dot aligned with track line */}
              <span
                className={`relative -ml-[19.75px] h-2 w-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary ring-4 ring-primary/20 scale-110"
                    : "border-transparent bg-transparent group-hover:bg-border/60"
                }`}
              />
              <span className="tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
