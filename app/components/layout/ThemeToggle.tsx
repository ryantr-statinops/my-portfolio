type Props = {
  id: string;
  variant?: "sound" | "default";
  className?: string;
};

export default function ThemeToggle({ id, variant = "default", className = "" }: Props) {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className={`nav-control inline-flex items-center justify-center ${className || "w-11 shrink-0"}`}
      aria-label="Toggle theme (Light / Dark mode)"
      title="Toggle theme (Light / Dark mode)"
    >
      {variant === "sound" ? (
        <>
          {/* Dark mode: sound active */}
          <svg className="hidden h-4 w-4 dark:flex" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          {/* Light mode: sound muted */}
          <svg className="h-4 w-4 dark:hidden" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        </>
      ) : (
        <>
          <svg className="hidden h-[1.2rem] w-[1.2rem] dark:flex" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2m7.07-16.07-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2m16 0h2M6.34 6.34 4.93 4.93m14.14 14.14-1.41-1.41" />
          </svg>
          <svg className="h-[1.2rem] w-[1.2rem] dark:hidden" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
