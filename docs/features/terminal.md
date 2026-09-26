# Terminal commands

[Documentation index](../README.md) · [Section index](README.md)

Describe the portfolio terminal’s local command interpreter and UI state.

## Contents

- [Supported commands](#supported-commands)
- [Parser contract](#parser-contract)
- [Interaction and history](#interaction-and-history)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Supported commands

| Input | Behavior |
|---|---|
| `help` | Lists help, status, neofetch, ls /projects and clear |
| `status` | Static READY / STATIC_GENERATION / AVAILABLE output |
| `neofetch` | Route-supplied runtime description |
| `ls /projects` | Route-supplied category/slug listing, or empty-catalog message |
| `clear` | Removes visible output entries |
| Any other string | `command not found`, unless supplied in the command map |

Commands execute entirely in browser state. They do not invoke a shell, read server files or check service health.

## Parser contract

`parseTerminalCommand(input, commandMap)` trims and lowercases input and returns `{ clear: boolean, output: string }`. Built-in clear/help/status take precedence over map entries. Map lookup uses `Object.hasOwn`, so inherited keys such as `constructor` are not executed or treated as commands.

SystemTerminal accepts optional `{ input, output }[]`, creates a lowercased command map and initially displays those command entries. The registry supplies neofetch and a listing built from the full ordered catalog, independent of the category filter.

## Interaction and history

Submitting whitespace does nothing. Other input is normalized, prepended to history and either appended to output or used to clear entries. Clear retains command history. ArrowUp moves through prior commands; ArrowDown returns toward an empty input. History and output are lost when the component unmounts. The output area is a polite live region; there is no persistence or remote command execution.

## Source references

- [src/lib/terminal.ts](../../src/lib/terminal.ts) — `export function parseTerminalCommand` ([source line 10](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/src/lib/terminal.ts#L10)).
- [app/components/interactive/SystemTerminal.tsx](../../app/components/interactive/SystemTerminal.tsx) — `export default function SystemTerminal` ([source line 18](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/SystemTerminal.tsx#L18)).
- [app/components/interactive/SystemTerminal.tsx](../../app/components/interactive/SystemTerminal.tsx) — `function navigateHistory` ([source line 38](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/components/interactive/SystemTerminal.tsx#L38)).
- [app/routes/projects.tsx](../../app/routes/projects.tsx) — `const terminalCommands` ([source line 25](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/app/routes/projects.tsx#L25)).

## Related documents

- [Project catalog](project-catalog.md)
