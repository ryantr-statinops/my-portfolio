# Frontend MCP setup

This repository configures Google Stitch and shadcn/ui as project-scoped Codex MCP servers. React Grab is available only while developing this portfolio. pen.dev is not part of this setup.

## First-time setup

1. Clone the repository and open it in Codex. Trust this checkout so Codex loads `.codex/config.toml`.
2. Copy `.env.example` to `.env` and add your Google Stitch API key to `STITCH_API_KEY`.
3. Run `npm ci` to install the portfolio's development dependencies.
4. Restart Codex and check that the Stitch and shadcn servers are listed for this project.

Keep `.env` on your computer. It contains credentials and must not be committed. Each clone needs its own `.env` file. The Stitch header helper reads that file only for local Codex sessions. Codex remote executors do not support the local header helper.

## Check each tool

- **Stitch** — Ask Codex to list your Stitch projects. The helper returns only the `X-Goog-Api-Key` header to Codex and does not print the key.
- **shadcn/ui** — Ask Codex to search the default registry for `button`. This does not initialize shadcn/ui or install a component.
- **React Grab** — Run `npm run dev`, open `http://localhost:5173/my-portfolio/`, hover a UI element and press **Ctrl+C**. Paste the copied component and source location into Codex. React Grab is excluded from production builds.
