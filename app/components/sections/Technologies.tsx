import type { ReactNode } from "react";

type TechItem = {
  name: string;
  color?: string;
  icon: ReactNode;
};

// --- Clean SVG Icons ---
const icons = {
  python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.814v.825H3.898S0 5.787 0 11.916c0 6.13 3.402 5.92 3.402 5.92h2.032v-2.857s-.11-3.402 3.348-3.402h5.76v-.848s.078-2.656-2.628-2.656zm-1.808 1.637a.89.89 0 1 1 0 1.78.89.89 0 0 1 0-1.78zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.814v-.825h8.122s3.898.444 3.898-5.685c0-6.13-3.402-5.92-3.402-5.92h-2.032v2.857s.11 3.402-3.348 3.402h-5.76v.848s-.078 2.656 2.628 2.656zm1.808-1.637a.89.89 0 1 1 0-1.78.89.89 0 0 1 0 1.78z" />
    </svg>
  ),
  go: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.811 10.231c.328-.543.766-.994 1.303-1.336.536-.341 1.135-.558 1.78-.646l.574 1.748c-.402.062-.77.202-1.096.417a2.234 2.234 0 0 0-.785.845 2.502 2.502 0 0 0-.27 1.144c0 .438.094.832.28 1.173.187.34.452.613.785.812.333.2.719.317 1.147.348v-2.22H3.774v-1.68h3.504v5.474H5.666l-.168-.862c-.529.35-1.107.575-1.72.67-.614.094-1.222.06-1.812-.102a4.015 4.015 0 0 1-1.52-.776 3.89 3.89 0 0 1-1.01-1.42 4.675 4.675 0 0 1-.365-1.884c0-.687.126-1.339.376-1.942.25-.603.606-1.127 1.06-1.562zm10.742-.716c.866 0 1.64.205 2.308.61.667.404 1.189.967 1.554 1.678.365.71.55 1.52.55 2.417 0 .906-.185 1.72-.55 2.43-.365.71-.887 1.272-1.554 1.677-.668.405-1.442.61-2.308.61-.876 0-1.654-.205-2.32-.61-.667-.405-1.187-.967-1.55-1.677-.365-.71-.548-1.524-.548-2.43 0-.897.183-1.707.548-2.417.363-.711.883-1.274 1.55-1.678.666-.405 1.444-.61 2.32-.61zm0 1.834c-.456 0-.848.13-1.166.386a2.415 2.415 0 0 0-.748 1.045 4.07 4.07 0 0 0-.256 1.446c0 .546.086 1.03.256 1.446.17.416.42.766.748 1.044.318.257.71.388 1.166.388.465 0 .862-.131 1.18-.388.318-.278.564-.628.73-1.044.17-.416.253-.9.253-1.446 0-.546-.083-1.03-.254-1.446a2.476 2.476 0 0 0-.73-1.045c-.318-.256-.715-.386-1.18-.386z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.53 0-.96.107-1.289.32a1.054 1.054 0 0 0-.494.915c0 .272.088.495.264.668.176.174.448.33.816.47.369.141.84.288 1.413.442.723.197 1.341.439 1.854.726.513.287.904.664 1.173 1.13.268.468.403 1.05.403 1.748 0 .845-.241 1.558-.724 2.139-.482.582-1.144 1.002-1.986 1.26a8.42 8.42 0 0 1-2.634.385c-.657 0-1.31-.06-1.958-.179a7.73 7.73 0 0 1-1.638-.535v-2.608a6.522 6.522 0 0 0 1.744.757c.607.16 1.226.24 1.855.24.582 0 1.042-.11 1.381-.33.339-.22.509-.533.509-.94 0-.306-.098-.553-.293-.742-.196-.189-.5-.36-1.914-.514-.723-.197-1.34-.439-1.85-.726-.51-.287-.899-.664-1.167-1.13-.268-.468-.402-1.046-.402-1.734 0-.825.234-1.525.702-2.101.468-.575 1.112-.995 1.932-1.26a7.994 7.994 0 0 1 2.457-.395zm-8.87.197v2.327H6.96v9.336H4.253v-9.336H1.595V9.947z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.002 0c-3.13 0-5.32 2.53-5.32 5.86 0 1.45.39 3.01.95 4.35C6.98 11.23 6 12.87 6 15.01c0 2.85 1.63 4.96 4.09 5.76-.23.6-.66 1.15-1.42 1.48-.43.18-.32.75.14.75 3.02 0 4.88-1.52 5.48-3.08.33.05.68.08 1.03.08 3.4 0 6.18-2.69 6.18-6.19 0-2.35-1.28-4.32-3.16-5.33.35-.91.56-1.89.56-2.62C18.9 2.54 15.93 0 12.002 0zm-2.02 4.98a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9zm4.04 0a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9z" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.929 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H2.208a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185M23.79 11.78c-.327-.206-.708-.31-1.107-.31a2.82 2.82 0 0 0-1.748.618 3.5 3.5 0 0 0-.547-.323c-.694-.326-1.52-.456-2.433-.385l-.337.027v1.86a.186.186 0 0 0 .186.185h1.16c.39 0 .753.155 1.026.438a1.36 1.36 0 0 1 .402.996c0 .416-.167.792-.47 1.058a1.47 1.47 0 0 1-1.026.398H1.368a1.368 1.368 0 0 0-1.368 1.368c0 3.298 2.684 5.982 5.982 5.982 4.417 0 8.085-3.056 9.47-7.228 1.135-.11 2.302-.572 3.018-1.488.58-.742.66-1.637.32-2.196" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.835 2.56l3.076 3.077a1.86 1.86 0 0 1 1.765.45c.727.727.8 1.854.218 2.66l2.97 2.97a1.857 1.857 0 0 1 2.66.219c.81-.81.81-2.124 0-2.935a2.073 2.073 0 0 0-.218-.182l-2.97-2.97.001-.001a1.86 1.86 0 0 1 .45-1.765c.81-.81.81-2.124 0-2.934-.81-.81-2.124-.81-2.935 0a1.86 1.86 0 0 1-.45 1.765L10.3 8.066a1.857 1.857 0 0 1-2.66-.219c-.81.81-.81 2.124 0 2.935.244.244.534.412.846.507L5.51 14.266a1.86 1.86 0 0 1-.508-.847c-.81-.81-2.124-.81-2.935 0-.81.81-.81 2.124 0 2.934.81.81 2.124.81 2.935 0a1.86 1.86 0 0 1 .45-1.765l2.977-2.978c.31.095.6.263.844.507.81.81 2.124.81 2.935 0 .81-.81.81-2.124 0-2.934a2.07 2.07 0 0 0-.219-.183l2.97-2.97c.31.096.6.264.845.508.81.81 2.124.81 2.935 0 .81-.81.81-2.124 0-2.934z" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14.23 12.004a2.236 2.236 0 1 1-4.47 0 2.236 2.236 0 0 1 4.47 0zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624-1.78 1.654-3.542 2.603-4.887 2.603-.41 0-.783-.09-1.106-.275-1.374-.792-1.683-3.263-.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.413 13.437a.792.792 0 0 0 .616 1.209H12v8.958a.396.396 0 0 0 .716.233l10.871-13.274a.792.792 0 0 0-.616-1.209z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.2l8.4 4.8v9.7L12 21.4l-8.4-4.7V7L12 2.2z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M22.95 3.376L12.593 23.473a.625.625 0 0 1-1.12 0L1.05 3.376a.625.625 0 0 1 .746-.867l9.96 3.32a.625.625 0 0 0 .488 0l9.96-3.32a.625.625 0 0 1 .746.867z" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7" />
      <path d="M12 15v7" />
      <path d="m4.93 4.93 4.95 4.95" />
      <path d="m14.12 14.12 4.95 4.95" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 14h3" />
      <path d="M1 9h3" />
      <path d="M1 14h3" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  table: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a3 3 0 0 0 3 3h3" />
      <path d="M18 9v3a3 3 0 0 1-3 3h-3" />
    </svg>
  ),
  r: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4h-1v4H8v-9h4c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.57 2.61L15 16.5h-2zm-1-6.5h-2v2h2c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
  ),
};

// --- Row 1: Languages & Core Systems (Scroll Left) ---
const row1: readonly TechItem[] = [
  { name: "Python", color: "text-[#3776AB]", icon: icons.python },
  { name: "Go", color: "text-[#00ADD8]", icon: icons.go },
  { name: "TypeScript", color: "text-[#3178C6]", icon: icons.typescript },
  { name: "Linux", color: "text-[#FCC624]", icon: icons.linux },
  { name: "Docker", color: "text-[#2496ED]", icon: icons.docker },
  { name: "SQL", color: "text-[#0099cc]", icon: icons.database },
  { name: "Git", color: "text-[#F05032]", icon: icons.git },
  { name: "Bash", color: "text-[#4EAA25]", icon: icons.terminal },
];

// --- Row 2: Frameworks & Backend Architecture (Scroll Right) ---
const row2: readonly TechItem[] = [
  { name: "FastAPI", color: "text-[#05998B]", icon: icons.fastapi },
  { name: "React", color: "text-[#61DAFB]", icon: icons.react },
  { name: "Supabase", color: "text-[#3ECF8E]", icon: icons.supabase },
  { name: "PostgreSQL", color: "text-[#4169E1]", icon: icons.database },
  { name: "Node.js", color: "text-[#5FA04E]", icon: icons.nodejs },
  { name: "Tailwind CSS", color: "text-[#06B6D4]", icon: icons.tailwind },
  { name: "Vite", color: "text-[#646CFF]", icon: icons.vite },
  { name: "REST & WebSockets", color: "text-[#A855F7]", icon: icons.network },
];

// --- Row 3: AI, Quantitative Data & Tooling (Scroll Left) ---
const row3: readonly TechItem[] = [
  { name: "MCP (Model Context Protocol)", color: "text-[#F59E0B]", icon: icons.cpu },
  { name: "Agent Harnesses", color: "text-[#EC4899]", icon: icons.bot },
  { name: "Pandas", color: "text-[#150458] dark:text-[#E70488]", icon: icons.table },
  { name: "NumPy", color: "text-[#4DABCF]", icon: icons.cpu },
  { name: "Scikit-Learn", color: "text-[#F7931E]", icon: icons.workflow },
  { name: "GitHub Actions", color: "text-[#2088FF]", icon: icons.workflow },
  { name: "Traefik", color: "text-[#24A1C1]", icon: icons.network },
  { name: "R Language", color: "text-[#276DC3]", icon: icons.r },
];

function TechBadge({ tech }: { tech: TechItem }) {
  return (
    <span className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-dashed border-border/80 dark:border-border/60 bg-surface/30 dark:bg-surface/20 px-3.5 py-1.75 text-xs sm:text-[0.92rem] font-mono leading-none text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-accent hover:bg-surface/70 select-none cursor-default">
      <span aria-hidden="true" className={`inline-block shrink-0 w-4 h-4 ${tech.color || "text-accent"}`}>
        {tech.icon}
      </span>
      <span>{tech.name}</span>
    </span>
  );
}

export default function Technologies() {
  return (
    <section id="skills" aria-labelledby="technologies-title" className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="w-full space-y-6">
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 id="technologies-title" className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
              Technologies
            </h2>
            <span className="rounded-full border border-border/60 bg-surface/40 px-3 py-1 font-mono text-[11px] text-muted">
              24+ Core Tools
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Languages, runtimes, and engineering platforms powering data pipelines, AI workflows, and distributed systems.
          </p>
        </div>

        {/* 3-Row Bidirectional Marquee with Gradient Masking */}
        <div
          className="relative flex flex-col gap-3 sm:gap-4 overflow-hidden py-3"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 2.5rem, black calc(100% - 2.5rem), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 2.5rem, black calc(100% - 2.5rem), transparent)",
          }}
        >
          {/* Row 1: Languages & Core Systems (Scroll Left) */}
          <div className="overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-2.5 sm:gap-3.5 pr-3">
              {[...row1, ...row1].map((tech, idx) => (
                <TechBadge key={`${tech.name}-r1-${idx}`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 2: Frameworks & Backend Architecture (Scroll Right) */}
          <div className="overflow-hidden">
            <div className="animate-marquee-right flex items-center gap-2.5 sm:gap-3.5 pr-3">
              {[...row2, ...row2].map((tech, idx) => (
                <TechBadge key={`${tech.name}-r2-${idx}`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 3: AI, Data Science & Tooling (Scroll Left) */}
          <div className="overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-2.5 sm:gap-3.5 pr-3">
              {[...row3, ...row3].map((tech, idx) => (
                <TechBadge key={`${tech.name}-r3-${idx}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
