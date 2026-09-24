import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLocation } from "react-router";
import { navigateToSection } from "../../../src/lib/sectionNavigation";
import Footer from "./Footer";
import MobileOverlay from "./MobileOverlay";
import Navbar from "./Navbar";
import VideoBackground from "../interactive/VideoBackground";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    document.documentElement.classList.toggle("homepage-video", isHomePage);
  }, [isHomePage]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>("[data-nav-section]");
    const sections = [...links]
      .map((link) => document.getElementById(link.dataset.navSection ?? ""))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio);
      const activeId = visible[0]?.target.id;
      if (!activeId) return;
      links.forEach((link) => {
        if (link.dataset.navSection === activeId) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("active"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [location.pathname]);

  function navigateToHomeSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    navigateToSection(event.nativeEvent, event.currentTarget, sectionId);
    if (event.nativeEvent.defaultPrevented) event.preventDefault();
  }

  return (
    <>
      {isHomePage && <VideoBackground />}
      <a href="#main-content" className="sr-only fixed left-2 top-2 z-[60] rounded-full bg-foreground px-3 py-1 text-background focus:not-sr-only">Skip to content</a>
      <Navbar menuOpen={menuOpen} menuButtonRef={menuButton} onOpenMenu={() => setMenuOpen(true)} onNavigateToSection={navigateToHomeSection} />
      <MobileOverlay open={menuOpen} onClose={(restoreFocus = true) => {
        setMenuOpen(false);
        if (restoreFocus) menuButton.current?.focus();
      }} onNavigateToSection={navigateToHomeSection} />
      <main id="main-content" tabIndex={-1} className={isHomePage ? "relative z-10" : undefined}>{children}</main>
      <Footer transparentBackground={isHomePage} />
    </>
  );
}
