import { describe, expect, it } from "vitest";
import { parseTerminalCommand } from "../src/lib/terminal";

describe("portfolio terminal command parser", () => {
  const commands = {
    neofetch: "Runtime: Static Portfolio",
    "ls /projects": "finance-quant",
  };

  it("normalizes command casing and whitespace before whitelist lookup", () => {
    expect(parseTerminalCommand("  NEOFETCH  ", commands).output).toBe("Runtime: Static Portfolio");
    expect(parseTerminalCommand(" LS /PROJECTS ", commands).output).toBe("finance-quant");
  });

  it("provides help and status without executing arbitrary input", () => {
    expect(parseTerminalCommand("help").output).toContain("ls /projects");
    expect(parseTerminalCommand("status").output).toContain("STATIC_GENERATION");
    expect(parseTerminalCommand("uname -a", commands).output).toBe("command not found");
  });

  it("returns an explicit clear action for output reset", () => {
    expect(parseTerminalCommand("clear")).toEqual({ clear: true, output: "" });
  });
});
