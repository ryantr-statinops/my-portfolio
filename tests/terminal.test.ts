import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { parseTerminalCommand } from "../src/lib/terminal";

describe("Portfolio Runtime Terminal", () => {
  const commands = {
    neofetch: "Runtime: Static Portfolio",
    "ls /projects": "No projects published yet.",
  };

  it("accepts only the read-only whitelist", () => {
    expect(parseTerminalCommand("help").output).toContain("ls /projects");
    expect(parseTerminalCommand(" status ").output).toContain("STATIC_GENERATION");
    expect(parseTerminalCommand("neofetch", commands).output).toContain("Static Portfolio");
    expect(parseTerminalCommand("ls /projects", commands).output).toContain("No projects published yet.");
    expect(parseTerminalCommand("clear").clear).toBe(true);
    expect(parseTerminalCommand("uname -a", commands).output).toBe("command not found");
  });

  it("keeps portfolio runtime copy neutral", () => {
    const files = [
      "src/components/interactive/SystemTerminal.astro",
      "src/components/sections/StrategyHub.astro",
      "src/components/sections/PortfolioRegistry.astro",
      "src/pages/projects/index.astro",
    ];

    for (const file of files) {
      expect(readFileSync(file, "utf8").toLowerCase(), file).not.toContain("cluster");
    }
  });
});
