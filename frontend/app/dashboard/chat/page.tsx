"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, ArrowUp, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8005";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [repoName, setRepoName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load repo name from localStorage (set by dashboard when user analyzes a repo)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gitstory_current_repo");
      if (stored) {
        const parsed = JSON.parse(stored);
        const url: string = parsed.url || "";
        // Extract repo name from URL (last segment without .git)
        const name = url.replace(/\/$/, "").split("/").pop()?.replace(".git", "") || "";
        if (name) setRepoName(name);
      }
    } catch {
      // ignore parse errors
    }
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;

    const token = getAccessToken();
    if (!token) {
      setError("You must be logged in to chat.");
      return;
    }
    if (!repoName) {
      setError("No repository selected. Go to the Dashboard and analyze a repo first, then click 'Enable AI Chat' to index it.");
      return;
    }

    // Add user message
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setStreaming(true);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: trimmed, repo_name: repoName }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: "Chat request failed" }));
        throw new Error(errData.detail || "Chat request failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream available");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last potentially incomplete line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;
          if (trimmedLine === "data: [DONE]") continue;
          if (trimmedLine.startsWith("data: ")) {
            try {
              const payload = JSON.parse(trimmedLine.slice(6));
              if (payload.token) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last && last.role === "assistant") {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + payload.token,
                    };
                  }
                  return updated;
                });
              }
              if (payload.error) {
                setError(payload.error);
              }
            } catch {
              // Skip malformed JSON chunks
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
      // Remove the empty assistant message if streaming failed before any content
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === "assistant" && !last.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setStreaming(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh] bg-[#0D1117]">
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="min-h-screen bg-[#0D1117] text-[#8B949E] font-sans p-6 pb-32 relative">
        {/* Header & Status Card */}
        <div className="flex justify-between items-start mb-8 max-w-[1600px] mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              3D RAG EXPLORER
            </h1>
            {repoName && (
              <p className="text-[11px] text-[#00E6A4] font-bold tracking-wider mt-1 uppercase">
                REPO: {repoName}
              </p>
            )}
          </div>

          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 w-72 shadow-lg">
            <div className="text-[#00E6A4] font-bold mb-3 text-[11px] tracking-wider">
              SYSTEM_STATUS: {repoName ? "NOMINAL" : "AWAITING_INDEX"}
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider">INDEX_LOAD</span>
              <div className="flex-1 mx-3 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
                <div className={`h-full bg-[#00E6A4] ${repoName ? "w-[78.4%]" : "w-0"} transition-all duration-1000`}></div>
              </div>
              <span className="text-[10px] text-white">{repoName ? "78.4%" : "0%"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider">GPU_COMPUTE</span>
              <div className="flex-1 mx-3 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
                <div className={`h-full bg-[#8B5CF6] ${streaming ? "w-[85%]" : "w-[12%]"} transition-all duration-500`}></div>
              </div>
              <span className="text-[10px] text-white">{streaming ? "85%" : "12%"}</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
          {/* Welcome message when no messages yet */}
          {messages.length === 0 && (
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00E6A4] shrink-0 mt-1"></div>
              <div>
                <div className="text-[#00E6A4] text-[11px] font-bold tracking-wider mb-2 uppercase">
                  Kernel Assistant
                </div>
                <p className="text-sm leading-relaxed text-[#C9D1D9]">
                  {repoName ? (
                    <>
                      Repository <span className="text-[#00E6A4] font-bold">{repoName}</span> is loaded and ready.<br />
                      Ask me anything about the codebase — architecture, specific files, commit history, or how components connect.
                    </>
                  ) : (
                    <>
                      No repository indexed yet.<br />
                      Go to the <span className="text-[#00E6A4] font-bold">Dashboard</span>, analyze a repository, and click{" "}
                      <span className="text-[#8B5CF6] font-bold">Enable AI Chat</span> to index it first.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Dynamic messages */}
          {messages.map((msg, i) =>
            msg.role === "assistant" ? (
              <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6] shrink-0 mt-1"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#8B5CF6] text-[11px] font-bold tracking-wider mb-2 uppercase">
                    Neural Analysis Engine
                  </div>
                  <div className="text-sm leading-relaxed text-[#C9D1D9] whitespace-pre-wrap break-words">
                    {msg.content || (
                      <span className="inline-flex items-center gap-2 text-[#484F58]">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing query...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="bg-[#1C2128] border border-[#30363D] rounded-2xl p-5 flex items-start gap-6 max-w-4xl">
                  <p className="text-sm leading-relaxed text-[#C9D1D9] pt-1 whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-[#30363D] shrink-0"></div>
                </div>
              </div>
            )
          )}

          {/* Error display */}
          {error && (
            <div className="bg-[#3F1E1E]/50 border border-[#F85149]/50 rounded-xl p-4 text-sm text-[#F85149]">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center pointer-events-none">
          <div className="w-full max-w-[1600px] pointer-events-auto">
            <div className="bg-[#161B22] border border-[#30363D] rounded-full flex items-center p-2 pl-6 shadow-2xl">
              <input
                type="text"
                placeholder={
                  repoName
                    ? "Ask about code, commits, or architecture..."
                    : "Index a repository first to start chatting..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={streaming || !repoName}
                className="bg-transparent border-none flex-1 text-sm text-[#C9D1D9] focus:outline-none placeholder:text-[#484F58] disabled:opacity-50"
              />
              <div className="flex items-center gap-2 pr-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#484F58] hover:text-[#C9D1D9] transition-colors bg-[#0D1117]">
                  <Plus size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={streaming || !input.trim() || !repoName}
                  className="w-10 h-10 rounded-full bg-[#00E6A4] flex items-center justify-center text-[#0D1117] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {streaming ? (
                    <Loader2 size={20} strokeWidth={3} className="animate-spin" />
                  ) : (
                    <ArrowUp size={20} strokeWidth={3} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}