import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import MobileOverlay from "./MobileOverlay";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

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
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only fixed left-2 top-2 z-[60] rounded-full bg-foreground px-3 py-1 text-background focus:not-sr-only">Skip to content</a>
      <Navbar menuOpen={menuOpen} menuButtonRef={menuButton} onOpenMenu={() => setMenuOpen(true)} />
      <MobileOverlay open={menuOpen} onClose={(restoreFocus = true) => {
        setMenuOpen(false);
        if (restoreFocus) menuButton.current?.focus();
      }} />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
