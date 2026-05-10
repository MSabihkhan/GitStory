// VISUAL AUDIT — S7 - 3D RAG Explorer.png (Chat section)
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Primary accent: #8B5CF6
// Code tag background: #0D1117
// Font: Inter, system-ui
// Layout: Left sidebar + main chat area with message bubbles

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: N/A
// If any NO: None

"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { chatMessages } from "@/lib/mock-data";
import { Plus, Search, Paperclip, Send, MessageSquare, BookOpen, Database, Circle } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
  };

  return (
    <DashboardShell>
      <div className="flex h-[calc(100vh-96px)]">
        {/* Left Sidebar */}
        <div className="w-64 bg-page-bg-secondary border-r border-sidebar-border flex flex-col">
          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-blue text-white text-sm font-medium rounded-lg hover:bg-accent-blue/90 transition-colors">
              <Plus size={16} />
              New Chat
            </button>
          </div>

          <div className="px-4 mb-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">ASSISTANT</p>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-accent-primary/10 text-accent-primary rounded-lg">
                <MessageSquare size={14} />
                Active Chat
              </Link>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
                History
              </Link>
            </nav>
          </div>

          <div className="px-4 flex-1">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">RESOURCES</p>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
                <Database size={14} />
                Repositories
              </Link>
              <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
                <BookOpen size={14} />
                Knowledge Base
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-xs text-accent-success">
              <Circle size={8} className="fill-accent-success" />
              System Status — All Nodes Operational
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search across repositories..."
                className="w-full pl-12 pr-4 py-3 bg-page-bg border border-sidebar-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-2xl rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-accent-primary text-white"
                      : "bg-card-bg border border-sidebar-border text-text-primary"
                  }`}
                >
                  <div className="text-xs mb-2 opacity-60">{msg.role === "user" ? "You" : "Assistant"}</div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content.split(/(`[^`]+`)/g).map((part, i) =>
                      part.match(/^`[^`]+`$/) ? (
                        <code key={i} className="bg-[#0D1117] px-1.5 py-0.5 rounded text-[#8B5CF6] font-mono text-xs">
                          {part.slice(1, -1)}
                        </code>
                      ) : (
                        part
                      )
                    )}
                  </div>
                  <div className="text-xs mt-2 opacity-60">{msg.timestamp}</div>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">Y</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <button className="p-2 text-text-muted hover:text-text-secondary transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Ask about your code, commits, or documentation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 bg-page-bg border border-sidebar-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white hover:bg-accent-blue/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2 text-center">
              GitStory AI may produce inaccurate information. Always verify important details.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
