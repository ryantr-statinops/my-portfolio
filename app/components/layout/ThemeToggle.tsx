import { useEffect, useState } from "react";

type Props = {
  id: string;
  variant?: "sound" | "default";
  className?: string;
};

export default function ThemeToggle({ id, className = "" }: Props) {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextDark);
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  }

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className={`nav-control inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 ${className || "w-11 shrink-0"}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          className="h-4 w-4 text-foreground transition-transform duration-300"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2m7.07-16.07-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2m16 0h2M6.34 6.34 4.93 4.93m14.14 14.14-1.41-1.41" />
        </svg>
      ) : (
        <svg
          className="h-4 w-4 text-foreground transition-transform duration-300"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
