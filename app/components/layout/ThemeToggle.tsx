type Props = {
  id: string;
};

export default function ThemeToggle({ id }: Props) {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button id={id} type="button" onClick={toggleTheme} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all hover:bg-foreground/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40" aria-label="Toggle theme">
      <svg className="hidden h-[1.2rem] w-[1.2rem] dark:flex" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2m7.07-16.07-1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2m16 0h2M6.34 6.34 4.93 4.93m14.14 14.14-1.41-1.41" />
      </svg>
      <svg className="h-[1.2rem] w-[1.2rem] dark:hidden" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
