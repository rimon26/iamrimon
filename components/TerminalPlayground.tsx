"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Terminal as TerminalIcon,
  CornerDownLeft,
  Play,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { TerminalLine } from "@/app/types";
import {
  DEV_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  TERMINAL_WELCOME_MSG,
} from "@/app/data";

export default function TerminalPlayground() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);

  // Load welcome messages once
  useEffect(() => {
    const welcomeLines: TerminalLine[] = TERMINAL_WELCOME_MSG.map((text) => ({
      text,
      type: text.startsWith("===") ? "accent" : "output",
    }));
    setHistory(welcomeLines);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Matrix Rain Canvas Effect!
  useEffect(() => {
    if (!isMatrixActive) return;

    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const columns = Math.floor(canvas.width / 13);
    const drops = new Array(columns).fill(1);

    const chars = "TSJSREACTNEXTNODEGLOBAL010101XYZ<>/{}[]".split("");

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#C1FF00"; // Neon Artistic Lime Matrix text
      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 13;
        const y = drops[i] * 13;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 35);

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixActive]);

  const JOKES = [
    "Why do programmers wear glasses? Because they can't C#.",
    "There are 10 kinds of people: those who understand binary, and those who don't.",
    "['hip', 'hip'] (hip hip array!)",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Rimon's code doesn't have bugs, it has unrequested edge features.",
  ];

  const handleCommand = async (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    commandHistory.current.push(rawCmd);
    historyIndex.current = commandHistory.current.length;

    const parts = rawCmd.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    const newLines: TerminalLine[] = [
      { text: `visitor@Rimon-dev:~$ ${rawCmd}`, type: "input" },
    ];

    switch (command) {
      case "help":
        newLines.push(
          { text: "Available CLI Commands:", type: "accent" },
          {
            text: "  about    - Summary of who Rimon is and what he strives for",
            type: "output",
          },
          {
            text: "  skills   - Lists technical stacks categorized by strength",
            type: "output",
          },
          {
            text: "  projects - Displays Rimon's high-octane engineering builds",
            type: "output",
          },
          {
            text: "  contact  - Shows ways to coordinate with Rimon",
            type: "output",
          },
          {
            text: "  gemini   - Query Rimon's AI Assistant backend (usage: gemini [query])",
            type: "output",
          },
          {
            text: "  matrix   - Toggles code rain visual protocol",
            type: "output",
          },
          {
            text: "  joke     - Drops a lighthearted programmer joke",
            type: "output",
          },
          { text: "  clear    - Flushes terminal shell logs", type: "output" },
        );
        break;

      case "about":
        newLines.push(
          { text: `👤 DEV IN FOCUS: ${DEV_INFO.name}`, type: "accent" },
          { text: `💼 Role: ${DEV_INFO.role}`, type: "output" },
          {
            text: `🔬 Focus: Full-scale TypeScript nodes, low-latency streams, responsive animations.`,
            type: "output",
          },
          { text: `📝 Motto: \"${DEV_INFO.skillsMotto}\"`, type: "accent" },
          { text: `📖 Detail: ${DEV_INFO.about}`, type: "output" },
        );
        break;

      case "skills":
        newLines.push({
          text: "🛠️ CURRENT TECH MATRIX STACK:",
          type: "accent",
        });
        SKILL_CATEGORIES.forEach((cat) => {
          newLines.push({ text: `[${cat.title}]`, type: "accent" });
          cat.skills.forEach((skill) => {
            const barCount = Math.round(skill.level / 10);
            const bar = "█".repeat(barCount) + "░".repeat(10 - barCount);
            newLines.push({
              text: `  ${skill.name.padEnd(24)} ${bar} ${skill.level}%`,
              type: "output",
            });
          });
        });
        break;

      case "projects":
        newLines.push(
          { text: "🚀 ENGINEERING SHOWCASE BUILDS:", type: "accent" },
          {
            text: "Type 'project [id]' to read deeper details of a build.",
            type: "output",
          },
        );
        PROJECTS.forEach((proj) => {
          newLines.push({
            text: `  ID: ${proj.id.padEnd(16)} | ${proj.title} [${proj.category}]`,
            type: "output",
          });
        });
        break;

      case "project":
        if (!args) {
          newLines.push({
            text: "Error: Please specify project id. Example: 'project synthetix-ai'",
            type: "error",
          });
        } else {
          const match = PROJECTS.find(
            (p) => p.id.toLowerCase() === args.toLowerCase(),
          );
          if (match) {
            newLines.push(
              {
                text: `🛰️ ${match.title.toUpperCase()} (${match.category})`,
                type: "accent",
              },
              { text: match.description, type: "output" },
              { text: `Stack: ${match.tags.join(" • ")}`, type: "success" },
              { text: "Key Statistics:", type: "accent" },
            );
            match.stats.forEach((s) => {
              newLines.push({
                text: `  - ${s.label}: ${s.value}`,
                type: "output",
              });
            });
            if (match.liveUrl)
              newLines.push({
                text: `  Deploy Link: ${match.liveUrl}`,
                type: "success",
              });
          } else {
            newLines.push({
              text: `Error: Project '${args}' not found. Enter 'projects' for a list.`,
              type: "error",
            });
          }
        }
        break;

      case "contact":
        newLines.push(
          { text: "📫 COORDINATION HANDSHAKE PROTOCOLS:", type: "accent" },
          { text: `  Email:    ${DEV_INFO.email}`, type: "success" },
          { text: `  GitHub:   ${DEV_INFO.github}`, type: "output" },
          { text: `  LinkedIn: ${DEV_INFO.linkedin}`, type: "output" },
          {
            text: "  Secure Form: Submit your details in the section below!",
            type: "output",
          },
        );
        break;

      case "joke":
        const randJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        newLines.push(
          { text: `🎭 Compiler Humour:`, type: "accent" },
          { text: randJoke, type: "output" },
        );
        break;

      case "matrix":
        setIsMatrixActive((prev) => !prev);
        newLines.push({
          text: !isMatrixActive
            ? "Matrix code screen stream INITIALIZED. Run 'matrix' again to suspend."
            : "Matrix rain screen disabled.",
          type: "success",
        });
        break;

      case "gemini":
        if (!args) {
          newLines.push({
            text: "Error: Enter a question. Usage: gemini why should I hire Rimon?",
            type: "error",
          });
        } else {
          newLines.push({
            text: "📡 Multiplexing request gateway to server-side Gemini AI...",
            type: "output",
          });
          setHistory((prev) => [...prev, ...newLines]);
          setInput("");

          try {
            const res = await fetch("/api/gemini-chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: args }),
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              throw new Error(errData.error || "Server gateway failure");
            }

            const data = await res.json();
            setHistory((prev) => [
              ...prev,
              { text: `🤖 GEMINI CO-PILOT RESPONSE:`, type: "accent" },
              { text: data.response, type: "success" },
            ]);
            return;
          } catch (err: any) {
            setHistory((prev) => [
              ...prev,
              {
                text: `⚠ Gateway connection failed: ${err.message || err}`,
                type: "error",
              },
            ]);
            return;
          }
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newLines.push({
          text: `Command NOT found: '${command}'. Type 'help' to audit available options.`,
          type: "error",
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex.current > 0) {
        historyIndex.current--;
        setInput(commandHistory.current[historyIndex.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex.current < commandHistory.current.length - 1) {
        historyIndex.current++;
        setInput(commandHistory.current[historyIndex.current]);
      } else {
        historyIndex.current = commandHistory.current.length;
        setInput("");
      }
    }
  };

  return (
    <div
      id="terminal-card"
      className="w-full max-w-4xl mx-auto rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden relative"
    >
      {/* Top Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/5 select-none font-display">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="text-[10px] text-neutral-400 font-mono pl-2 flex items-center gap-1.5 uppercase tracking-wider">
            <TerminalIcon size={12} className="text-[#C1FF00]" />{" "}
            visitor@rimon-dev:~
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[#C1FF00] font-mono flex items-center gap-1 bg-[#C1FF00]/10 px-2 py-0.5 rounded-full border border-[#C1FF00]/20 tracking-wider uppercase">
            <Smartphone size={10} /> Try &apos;matrix&apos; or &apos;joke&apos;!
          </span>
        </div>
      </div>

      {/* Actual Shell Panel */}
      <div
        className="p-4 h-[420px] font-mono text-sm overflow-y-auto flex flex-col relative"
        ref={scrollRef}
      >
        {/* Canvas for matrix rain */}
        {isMatrixActive && (
          <canvas
            ref={matrixCanvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-25 mix-blend-screen"
            id="matrix-screen"
          />
        )}

        <div className="flex-1 space-y-1.5 z-10 relative">
          {history.map((line, idx) => {
            let colorCls = "text-neutral-300";
            if (line.type === "input")
              colorCls = "text-[#C1FF00]/90 font-medium";
            else if (line.type === "error") colorCls = "text-red-400";
            else if (line.type === "success")
              colorCls = "text-[#C1FF00] font-semibold";
            else if (line.type === "accent")
              colorCls =
                "text-white font-bold tracking-wide border-l-2 border-[#C1FF00] pl-2";

            return (
              <div
                key={idx}
                className={`${colorCls} leading-relaxed whitespace-pre-wrap break-all text-xs sm:text-sm`}
              >
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Floating instruction helper if history represents base welcome */}
        {history.length <= TERMINAL_WELCOME_MSG.length + 1 && (
          <div className="mt-4 p-3 bg-neutral-900/40 border border-white/10 rounded-lg text-xs text-neutral-300 flex items-start gap-2.5 z-10">
            <div className="bg-[#C1FF00] px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-black font-display">
              Tips
            </div>
            <div>
              Type <strong className="text-[#C1FF00]">skills</strong> to view
              knowledge levels as bars, or query the AI directly:{" "}
              <strong className="text-[#C1FF00]">
                gemini explain how you optimize Redis.
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard CLI Prompter */}
      <div className="p-3 bg-neutral-950/60 border-t border-white/5 flex items-center gap-2 select-none relative z-10">
        <span className="text-[#C1FF00]/80 font-mono text-sm pl-2">
          visitor@rimon-dev:~$
        </span>
        <input
          type="text"
          id="terminal-prompt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="help..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm caret-[#C1FF00] py-1"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => handleCommand(input)}
          id="terminal-submit-btn"
          className="cursor-pointer text-[#C1FF00] hover:text-white p-1 rounded-full transition-all duration-200"
          title="Submit commandLine"
        >
          <CornerDownLeft size={16} />
        </button>
      </div>
    </div>
  );
}
