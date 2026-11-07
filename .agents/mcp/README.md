# Project MCP configuration

`servers.json` is the source of truth for this repository's MCP servers. The
configuration belongs to the project and is shared across agent applications.
This manifest is a repository convention, not a file that clients load directly.

Only Google Stitch is configured at present. Playwright, Context7, shadcn/ui and
React Grab are not added by this setup. MCP tools support development; they are
not included in the portfolio's production bundle.

## Setup and synchronization

Use Node.js >= 22.12.0. The synchronization and header scripts use built-in Node
modules and do not download or start MCP servers.

```sh
npm run mcp:sync
npm run mcp:check
npm run mcp:test
```

`mcp:sync` generates these project configurations:

| Application | Destination | Server property |
| --- | --- | --- |
| Codex | `.codex/config.toml` | `mcp_servers` tables inside a generated block |
| Claude Code / compatible Copilot sessions | `.mcp.json` | `mcpServers` |
| Cursor | `.cursor/mcp.json` | `mcpServers` |
| Gemini CLI | `.gemini/settings.json` | `mcpServers` (`httpUrl` for HTTP) |
| VS Code | `.vscode/mcp.json` | `servers` |

For VS Code/Copilot, use the configuration source supported by your selected
harness. If it discovers both files, select one source to avoid duplicate
connections. Other apps may require another adapter; do not assume all clients
load `.agents/` or use the same JSON schema.

Commit the manifest, scripts, generated configurations and `generated.json`
together. The latter records managed server names so that synchronization can
remove a renamed or deleted server without removing unrelated entries.

Edit the manifest, not generated server entries. The sync script preserves
unrelated JSON settings and servers, and Codex text outside the marked block.
Managed server entries are replaced on sync. A first-time name conflict,
malformed JSON, JSONC comments or an overlapping manual Codex table causes the
script to stop before writing outputs. JSON files are formatted with two spaces;
JSONC is not supported. The original three-line Codex Stitch configuration is
migrated automatically.

`mcp:check` checks generated files without modifying them and exits with status 1
when they are out of sync. It does not verify network connectivity or credentials.
After syncing, restart/reload your client, trust the project if required, then
verify an actual tool call in each application you use. A configured server does
not prove that the current agent has connected to it.

## Credentials

Never put API keys or tokens in the manifest or generated files. HTTP header
values are **environment variable names** in `envHeaders`:

```json
{
  "schemaVersion": 1,
  "servers": {
    "stitch": {
      "type": "http",
      "url": "https://stitch.googleapis.com/mcp",
      "envHeaders": { "X-Goog-Api-Key": "STITCH_API_KEY" }
    }
  }
}
```

- **Local Codex:** copy `.env.example` to the ignored root `.env` and set
  `STITCH_API_KEY`, or provide it in Codex's process environment. `headers.mjs`
  reads the process environment first, then `.env`. Codex invokes it from this
  project; open Codex at the repository root. Its stdout contains credentials for
  the MCP connection, so do not run it manually or paste its output into chat.
- **Claude Code, Cursor, Gemini CLI and VS Code/Copilot:** generated headers use
  the client's environment-variable syntax. Ensure `STITCH_API_KEY` is available
  to that application's runtime; do not assume every client automatically loads
  the root `.env`. Restart an already running application after changing its
  environment.
- **Remote/cloud agents:** provision credentials in that execution environment.
  A local `.env` and local authentication sessions are not transferred. Codex's
  local header helper is not supported for remote MCP connections; configure a
  remote-runtime-specific authentication method when using that environment.

This adapter currently supports HTTP header authentication and stdio environment
forwarding. OAuth, bearer-token fields and client-specific policies need an
explicit adapter extension. Project-scoped configuration is not an access-control
boundary: service credentials determine which external resources are accessible.

## Adding a server later

Add an HTTP entry as above, or a stdio entry with `command`, optional `args` and
optional `envVars` (names only), then run `npm run mcp:sync`. Use a reviewed,
explicit package version for local package runners rather than `@latest`.
Commands run relative to the project root; use commands available on every
supported machine. The manifest validator rejects unknown fields to catch typos.

## Working across agents

All agents should read the root `AGENTS.md` and this guide. Sharing MCP
configuration shares tool definitions, not chat history, browser state, approvals
or credentials. Hand off the current branch/commit, pending changes, completed
checks and remaining work through repository documentation when changing agents.

If agents work concurrently, use separate worktrees and browser sessions. Verify
the portfolio at `/my-portfolio/` and keep the existing build/test commands as the
common validation workflow.

## Client references

- [Codex MCP configuration](https://developers.openai.com/codex/mcp/)
- [Claude Code MCP configuration](https://code.claude.com/docs/en/mcp)
- [Cursor MCP configuration](https://cursor.com/docs/mcp)
- [Gemini CLI MCP configuration](https://geminicli.com/docs/tools/mcp-server/)
- [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)
