import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "ABOUT ME", sectionId: "about-me" },
  { label: "PROJECTS", sectionId: "projects" },
  { label: "CONNECT", sectionId: "connect" },
];

type Props = {
  open: boolean;
  onClose: (restoreFocus?: boolean) => void;
  onNavigateToSection: (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
};

export default function MobileOverlay({ open, onClose, onNavigateToSection }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  return (
    <div id="mobile-nav-overlay" data-open={open} className={`${open ? "fixed flex" : "hidden"} inset-0 z-[60] items-center justify-center overflow-y-auto bg-background/85 px-6 py-20 backdrop-blur-md md:hidden`} aria-hidden={!open}>
      <nav aria-label="Mobile" className="info-box flex max-h-[calc(100svh_-_10rem)] w-full max-w-sm flex-col gap-3 overflow-y-auto">
        {navItems.map((item, index) => <Link key={item.sectionId} ref={index === 0 ? firstLink : undefined} to={`/#${item.sectionId}`} data-mobile-link={item.sectionId} onClick={(event) => { onClose(false); onNavigateToSection(event, item.sectionId); }} className="nav-control flex items-center px-4 py-3 text-xl font-semibold">{item.label}</Link>)}
        <ThemeToggle id="mobile-theme-toggle" />
      </nav>
      <button type="button" data-mobile-close onClick={() => onClose()} aria-label="Close menu" className="info-box info-box--navigation info-box--interactive absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m18 6-12 12M6 6l12 12" /></svg></button>
    </div>
  );
}
