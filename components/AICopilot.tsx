"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  Bot,
  RefreshCw,
  User,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "@/app/types";
import { DEV_INFO } from "@/app/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const QUICK_PROMPTS = [
    "What are your core frontend stacks?",
    "Tell me about Synthetix AI Workspace",
    "How can I hire you for a project?",
    "Why TypeScript over JavaScript?",
  ];

  useEffect(() => {
    // Defer setting state to avoid synchronous cascading renders and Next.js hydration mismatches
    const timer = setTimeout(() => {
      setMessages([
        {
          role: "model",
          text: `Hi there! 👋 I am Rimon's AI Co-Pilot. I have full knowledge of page projects, stack, and coordination details. What would you like to investigate?`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isInitial: true,
        },
      ]);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (rawMessageText: string) => {
    const text = rawMessageText.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error("Failed to contact the co-pilot server gateway.");
      }

      const data = await res.json();
      const modelMsg: ChatMessage = {
        role: "model",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      // Safely extract the message if it's an actual Error object
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      const modelErrorMsg: ChatMessage = {
        role: "model",
        text: `⚠️ Error contacting the portfolio assistant grid: ${errorMessage}. Ensure the backend is initialized!`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, modelErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        text: "System cache cleared! Ask me anything about Rimon's experience, background, or system architectures.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isInitial: true,
      },
    ]);
  };

  return (
    <>
      {/* Absolute Trigger floating bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          id="copilot-trigger-bubble"
          className="relative group bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 cursor-pointer shadow-lg shadow-cyan-500/15 py-3.5 px-4 rounded-full flex items-center gap-2 border border-cyan-400/35 overflow-hidden"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Ambient pulsation border pulse */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Sparkles size={18} className="text-white animate-pulse" />
          </motion.div>
          <span className="text-sm font-semibold tracking-wide text-white font-display hidden md:inline pr-1">
            AI Copilot
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </motion.button>
      </div>

      {/* Floating Panel slide out */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="copilot-chat-panel"
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[520px] bg-neutral-950/90 backdrop-blur-2xl border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-40 flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Gradient head accent */}
            <div className="w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600" />

            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900 bg-neutral-900/40 select-none">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/10 text-cyan-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wider font-display flex items-center gap-1.5">
                    Rimon Co-Pilot{" "}
                    <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 px-1 py-0.5 rounded uppercase font-bold tracking-widest">
                      v3.5
                    </span>
                  </h4>
                  <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                    Interactive server runtime live
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  id="reset-chat-btn"
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  title="Flash memory data stream"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Main scroll message area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
              {messages.map((msg, idx) => {
                const isModel = msg.role === "model";
                return (
                  <div
                    key={idx}
                    className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                  >
                    <div className="flex gap-2 max-w-[85%]">
                      {isModel && (
                        <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/10 flex items-center justify-center text-[10px] text-cyan-400 shrink-0 self-end select-none">
                          <Bot size={12} />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-xs select-text ${
                          isModel
                            ? "bg-neutral-900 text-neutral-200 border border-neutral-800 leading-relaxed rounded-bl-none"
                            : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 leading-relaxed rounded-br-none"
                        }`}
                      >
                        <div className="prose prose-invert max-w-none break-words">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                        <div
                          className={`text-[9px] mt-1 text-right font-mono select-none ${
                            isModel ? "text-neutral-500" : "text-cyan-400/50"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {!isModel && (
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-300 shrink-0 self-end select-none">
                          <User size={12} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loader placeholder representation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-500/10 flex items-center justify-center text-[10px] text-cyan-400 shrink-0 self-end animate-spin select-none">
                      <RefreshCw size={10} />
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Micro Quick trigger queries info */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-[#08090d] border-t border-neutral-900 select-none">
                <span className="text-[10px] text-neutral-500 font-medium font-mono block mb-1.5 flex items-center gap-1">
                  <HelpCircle size={10} /> Click a prompt to ask details:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      id={`quick-prompt-${idx}`}
                      onClick={() => handleSendMessage(prompt)}
                      className="cursor-pointer text-[10px] bg-neutral-900/60 hover:bg-cyan-950/20 hover:text-cyan-300 hover:border-cyan-500/30 text-neutral-400 py-1 px-2.5 rounded-lg border border-neutral-800 transition-all duration-200 truncate max-w-full"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt sending textbar */}
            <div className="p-3 bg-neutral-900/50 border-t border-neutral-900 flex gap-2 select-none">
              <input
                type="text"
                id="copilot-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder="Ask about skills, work history..."
                disabled={isLoading}
                className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white outline-none placeholder-neutral-500 disabled:opacity-50"
                autoComplete="off"
              />
              <button
                id="copilot-send-btn"
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-cyan-500 text-neutral-950 hover:bg-cyan-400 cursor-pointer p-2 rounded-xl transition-all font-bold disabled:opacity-40 shrink-0 self-center"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
