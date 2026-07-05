import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Cpu, CornerDownLeft, Sparkles, Trash } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system";
  text: string;
  isMarkdown?: boolean;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "Gopi's Multi-Core AI Terminal [v2.8.5-pro]" },
    { type: "system", text: "Initializing secure connection to Gemini-3.5-Flash backend... Done." },
    { type: "system", text: "Type 'help' to view system commands, or ask me any question directly." },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    // Add input line
    setHistory((prev) => [...prev, { type: "input", text: cmd }]);
    setInput("");

    const normalized = cmd.toLowerCase();

    if (normalized === "clear") {
      setHistory([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });

      if (response.ok) {
        const data = await response.json();
        setHistory((prev) => [
          ...prev,
          { type: "output", text: data.output, isMarkdown: true },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: "Error: Failed to reach Gopi's core services. Check network connection.",
          },
        ]);
      }
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          text: "Exception: Local sandbox timeout. Please retry the transaction.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render markdown lines as standard styled elements
  const renderMarkdownText = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5 font-mono text-zinc-300 leading-relaxed text-xs">
        {lines.map((line, i) => {
          // Check for headings
          if (line.startsWith("###")) {
            return (
              <h4 key={i} className="text-secondary font-bold text-sm tracking-tight mt-3">
                {line.replace("###", "").trim()}
              </h4>
            );
          }
          if (line.startsWith("##")) {
            return (
              <h3 key={i} className="text-primary font-bold text-sm tracking-tight mt-4">
                {line.replace("##", "").trim()}
              </h3>
            );
          }
          // Check for bullet lists
          if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
            const content = line.replace(/^[-*]\s*/, "");
            return (
              <div key={i} className="flex items-start pl-3 gap-2">
                <span className="text-primary mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
              </div>
            );
          }
          // Check for numbered lists
          if (/^\d+\.\s*/.test(line.trim())) {
            const content = line.replace(/^\d+\.\s*/, "");
            const num = line.match(/^\d+/)![0];
            return (
              <div key={i} className="flex items-start pl-3 gap-2">
                <span className="text-cyan-400 font-bold">{num}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
              </div>
            );
          }

          // Plain text lines
          return (
            <p
              key={i}
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
              className="min-h-[1em]"
            />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    // Replace strong tags **text** with colored tags
    let formatted = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-white font-semibold">$1</strong>'
    );
    // Replace markdown links [title](url)
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>'
    );
    return formatted;
  };

  return (
    <div
      onClick={focusInput}
      className="w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden focus-within:border-cyan-500/30 transition-all duration-300 font-mono relative flex flex-col min-h-[420px]"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/75 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/75 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/75 block" />
          </div>
          <div className="flex items-center gap-1.5 ml-3 font-semibold text-[11px] text-zinc-500 tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-zinc-600" />
            <span>TERMINAL://ASSISTANT</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            title="Clear Terminal"
            className="p-1 hover:bg-white/5 rounded text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <Trash className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
            <Cpu className="w-3 h-3 text-cyan-500/60" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Terminal Screen lines */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none max-h-[360px]"
      >
        {history.length === 0 && (
          <div className="text-center text-zinc-600 py-12 text-xs">
            Terminal console cleared. Type "help" or ask anything to Gopi's AI representation.
          </div>
        )}
        {history.map((line, idx) => {
          if (line.type === "system") {
            return (
              <div key={idx} className="text-zinc-500 text-xs flex items-center gap-2 select-none">
                <Sparkles className="w-3 h-3 text-purple-500/80" />
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === "input") {
            return (
              <div key={idx} className="flex items-start text-xs select-text">
                <span className="text-primary font-bold mr-2">visitor@gopi-kumar-portfolio:~$</span>
                <span className="text-white break-all font-semibold">{line.text}</span>
              </div>
            );
          }
          // Output lines (markdown support)
          return (
            <div key={idx} className="pl-4 border-l border-zinc-800 py-1 text-xs select-text">
              {line.isMarkdown ? (
                renderMarkdownText(line.text)
              ) : (
                <span className="text-zinc-300 break-words">{line.text}</span>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5 pl-4 text-xs text-zinc-500 select-none">
            <span className="animate-ping w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <span>Gopi's AI agent is compiling reply...</span>
          </div>
        )}
      </div>

      {/* Bottom Form input */}
      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center px-4 py-3 bg-white/[0.01] border-t border-white/5 gap-2 shrink-0 select-text"
      >
        <span className="text-primary font-bold text-xs shrink-0 select-none">visitor@gopi:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder='Ask me questions or type "help"...'
          className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-white font-mono text-xs placeholder-zinc-600 select-all"
          maxLength={100}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-1.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-white transition-all duration-200 text-zinc-400 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
