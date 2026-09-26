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
    const sections = ["main", "about-me", "projects", "connect"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame: number | null = null;

    function updateActiveSection() {
      frame = null;
      const readingLine = window.innerHeight * 0.4;
      let activeId = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      })?.id;
      if (activeId !== "main" && window.scrollY > 0 &&
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        activeId = sections.at(-1)?.id;
      }
      links.forEach((link) => {
        if (link.dataset.navSection === activeId) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    function scheduleUpdate() {
      if (frame === null) frame = requestAnimationFrame(updateActiveSection);
    }
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) cancelAnimationFrame(frame);
    };
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
