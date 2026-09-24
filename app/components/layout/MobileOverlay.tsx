import { useEffect, useRef } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "ABOUT ME", sectionId: "about-me" },
  { label: "STRATEGY", sectionId: "intelligence-hub" },
  { label: "PROJECTS", sectionId: "projects" },
  { label: "CONNECT", sectionId: "connect" },
];

type Props = {
  open: boolean;
  onClose: (restoreFocus?: boolean) => void;
};

export default function MobileOverlay({ open, onClose }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  return (
    <div id="mobile-nav-overlay" data-open={open} className={`${open ? "fixed flex" : "hidden"} inset-0 z-40 flex-col bg-background/85 backdrop-blur-2xl transition-opacity md:hidden`} aria-hidden={!open}>
      <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-10 p-8">
        {navItems.map((item, index) => (
          <Link key={item.sectionId} ref={index === 0 ? firstLink : undefined} to={`/#${item.sectionId}`} data-mobile-link={item.sectionId} onClick={() => onClose(false)} className="text-3xl font-medium text-foreground transition-colors hover:text-primary">
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
      <button type="button" data-mobile-close onClick={() => onClose()} aria-label="Close menu" className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:text-primary">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m18 6-12 12M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
