# Shared MCP setup

[Documentation index](../README.md) · [Section index](README.md)

Use the same project MCP definitions when moving between Codex, Claude Code,
Cursor, Gemini CLI and compatible VS Code/Copilot sessions.

## Contents

- [Configuration ownership](#configuration-ownership)
- [First-time setup](#first-time-setup)
- [Updating and verifying](#updating-and-verifying)
- [Switching agents](#switching-agents)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Configuration ownership

MCP lets an agent application call tools exposed by an MCP server. The shared
manifest, [`.agents/mcp/servers.json`](../../.agents/mcp/servers.json), defines this
repository's servers. It is a repository convention; clients load their own
generated configurations rather than reading the manifest directly.

The sync script generates `.codex/config.toml`, `.mcp.json`, `.cursor/mcp.json`,
`.gemini/settings.json` and `.vscode/mcp.json`. It preserves unrelated settings
and server entries while replacing entries managed by this setup. See the
[canonical MCP guide](../../.agents/mcp/README.md) for the client mapping,
supported fields, conflict handling and current adapter limitations.

No MCP servers are currently configured. The shared manifest and generated client
configurations contain empty server lists. The synchronization helpers remain
available for adding servers later. MCP configuration and credentials are
development-tool inputs; the static portfolio does not require them.

The local `.codex/`, `.cursor/` and `.gemini/` directories are removed and ignored
by Git. While the manifest is empty, synchronization skips missing client files
without recreating these directories.

## First-time setup

1. Use Node.js >=22.12.0 and open the repository root in your agent application.
2. Run `npm run mcp:check`. If generated files are missing or outdated, run
   `npm run mcp:sync`, then repeat the check. Neither command starts a server or
   verifies access to an external service.
3. With an empty server list, no credentials are needed. If adding Stitch later,
   provide `STITCH_API_KEY` using the
   [client-specific credential instructions](../../.agents/mcp/README.md#credentials).
   Local Codex supports the ignored root `.env` file as a fallback; do not assume
   all other clients load that file. Keep key values out of tracked files.
4. Restart/reload the client and complete any required project trust or
   authentication step. In VS Code/Copilot, select the configuration source used
   by your harness so the same server is not connected twice.
5. After adding a server, verify a real tool call, such as asking the agent to list
   your Stitch projects if Stitch is configured.
   Passing `mcp:check` alone does not establish that the server is connected.

## Updating and verifying

Edit the shared manifest, then run these commands from the repository root:

```sh
npm run mcp:sync
npm run mcp:check
npm run mcp:test
```

Review and commit the manifest, generated configurations and
[managed-server record](../../.agents/mcp/generated.json) together. Edit the shared
definition instead of generated server entries, which are replaced on sync.
Reload the client after changes. For a new server, follow the canonical guide's
[adding a server instructions](../../.agents/mcp/README.md#adding-a-server-later).

`mcp:check` is read-only and exits with status 1 for configuration drift.
`mcp:test` runs offline Node tests for client output, preservation of unrelated
settings, removal of managed servers, conflict handling, CRLF checkouts and
credential-header resolution. It uses synthetic credentials and temporary files.
Both checks are separate from `npm test` and the current GitHub Actions workflow.

## Switching agents

Each application needs access to its runtime prerequisites and credentials.
Remote/cloud agents need those provisioned in their own execution environment;
the local `.env` is not transferred. Codex's local HTTP header helper does not
support remote MCP connections.

Shared configuration does not transfer chat history, approvals or browser state.
Have the next agent read [AGENTS.md](../../AGENTS.md), and hand off the branch and
commit, pending changes, completed checks and remaining work. Concurrent agents
should use separate worktrees and browser sessions. Continue using the existing
application checks and preserve the `/my-portfolio/` base path.

## Source references

- [`.agents/mcp/README.md`](../../.agents/mcp/README.md) — canonical client and credential guide.
- [`.agents/mcp/servers.json`](../../.agents/mcp/servers.json) — shared definitions.
- [`.agents/mcp/sync.mjs`](../../.agents/mcp/sync.mjs) — `syncWorkspace` and client adapters.
- [`.agents/mcp/headers.mjs`](../../.agents/mcp/headers.mjs) — `resolveHeaders` and local Codex helper.
- [`.agents/mcp/sync.test.mjs`](../../.agents/mcp/sync.test.mjs) — offline verification.
- [`package.json`](../../package.json) — `mcp:sync`, `mcp:check` and `mcp:test` scripts.

## Related documents

- [Local development setup](setup.md)
- [Testing and visual baselines](testing.md)
- [Configuration and commands](../reference/configuration.md)
