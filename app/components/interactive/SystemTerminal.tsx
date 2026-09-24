import { useState } from "react";
import { parseTerminalCommand } from "../../../src/lib/terminal";

type Command = {
  input: string;
  output: string;
};

type Props = {
  commands?: Command[];
};

const defaultCommands = [
  { input: "neofetch", output: "Runtime: Static Portfolio\nHost: GitHub Pages\nBuild: React + TypeScript\nContent: Markdown + Zod\nStyle: Tailwind CSS 4\nMode: Static Generation\nTheme: Minimal-Dark\nTerminal: Portfolio Runtime" },
  { input: "ls /projects", output: "finance-quant\nops-automation\ndata-math\nsystem-ui" },
];

export default function SystemTerminal({ commands = defaultCommands }: Props) {
  const commandMap = Object.fromEntries(commands.map((command) => [command.input.toLowerCase(), command.output]));
  const [entries, setEntries] = useState(commands);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState("");

  function submitCommand(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    setHistory((current) => [command, ...current]);
    setHistoryIndex(-1);
    const result = parseTerminalCommand(command, commandMap);
    if (result.clear) setEntries([]);
    else setEntries((current) => [...current, { input: command, output: result.output }]);
    setInput("");
  }

  function navigateHistory(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : history[nextIndex]);
    }
  }

  return (
    <div data-terminal className="glass overflow-hidden rounded-lg border border-border bg-black font-mono text-[11px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-border bg-white/5 px-4 py-2"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" /></div><span className="text-[10px] uppercase tracking-widest text-muted opacity-50">bash — 80x24</span></div>
      <div data-terminal-output aria-live="polite" className="min-h-[300px] max-h-[420px] space-y-4 overflow-y-auto p-5">
        {entries.map((entry, index) => <div key={`${index}-${entry.input}`} data-terminal-entry className="space-y-1"><div className="flex gap-2"><span className="font-bold text-success">➜</span><span className="text-accent">~</span><span className="text-white/90">{entry.input}</span></div><pre className="whitespace-pre-wrap leading-relaxed text-muted">{entry.output}</pre></div>)}
        {entries.length > 0 && <div className="flex gap-2"><span className="font-bold text-success">➜</span><span className="text-accent">~</span><span className="h-4 w-2 animate-pulse bg-primary" /></div>}
      </div>
      <form data-terminal-form onSubmit={submitCommand} className="flex items-center gap-2 border-t border-border bg-white/5 px-4 py-3">
        <label htmlFor="terminal-command" className="sr-only">Enter a portfolio terminal command</label><span className="font-bold text-success">➜</span>
        <input id="terminal-command" data-terminal-input type="text" autoComplete="off" spellCheck={false} placeholder="help" value={input} onChange={(event) => setInput(event.currentTarget.value)} onKeyDown={navigateHistory} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-muted" />
        <button type="submit" className="min-h-11 rounded border border-border px-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:border-primary hover:text-primary">Run</button>
      </form>
    </div>
  );
}
