export type TerminalCommandMap = Record<string, string>;

export type TerminalCommandResult = {
  clear: boolean;
  output: string;
};

export const TERMINAL_HELP = "help\nstatus\nneofetch\nls /projects\nclear";

export function parseTerminalCommand(
  input: string,
  commandMap: TerminalCommandMap = {},
): TerminalCommandResult {
  const command = input.trim().toLowerCase();

  if (command === "clear") {
    return { clear: true, output: "" };
  }

  if (command === "help") {
    return { clear: false, output: TERMINAL_HELP };
  }

  if (command === "status") {
    return {
      clear: false,
      output: "STATUS: READY\nMODE: STATIC_GENERATION\nREGISTRY: AVAILABLE",
    };
  }

  return {
    clear: false,
    output: commandMap[command] ?? "command not found",
  };
}
