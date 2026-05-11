// // VISUAL AUDIT — S7 - 3D RAG Explorer.png (Chat section)
// // Background: #0D1117
// // Sidebar: #161B22, width 256px
// // Card background: #161B22
// // Border color: #30363D
// // Primary accent: #8B5CF6
// // Code tag background: #0D1117
// // Font: Inter, system-ui
// // Layout: Left sidebar + main chat area with message bubbles

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: N/A
// // If any NO: None

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { DashboardShell } from "@/components/layout/DashboardShell";
// import { chatMessages } from "@/lib/mock-data";
// import { Plus, Search, Paperclip, Send, MessageSquare, BookOpen, Database, Circle } from "lucide-react";
// import Link from "next/link";

// export default function ChatPage() {
//   const [messages, setMessages] = useState(chatMessages);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const userMsg = { role: "user" as const, content: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//   };

//   return (
//     <DashboardShell>
//       <div className="flex h-[calc(100vh-96px)]">
//         {/* Left Sidebar */}
//         <div className="w-64 bg-page-bg-secondary border-r border-sidebar-border flex flex-col">
//           <div className="p-4">
//             <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-blue text-white text-sm font-medium rounded-lg hover:bg-accent-blue/90 transition-colors">
//               <Plus size={16} />
//               New Chat
//             </button>
//           </div>

//           <div className="px-4 mb-4">
//             <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">ASSISTANT</p>
//             <nav className="space-y-1">
//               <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-accent-primary/10 text-accent-primary rounded-lg">
//                 <MessageSquare size={14} />
//                 Active Chat
//               </Link>
//               <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
//                 History
//               </Link>
//             </nav>
//           </div>

//           <div className="px-4 flex-1">
//             <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">RESOURCES</p>
//             <nav className="space-y-1">
//               <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
//                 <Database size={14} />
//                 Repositories
//               </Link>
//               <Link href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
//                 <BookOpen size={14} />
//                 Knowledge Base
//               </Link>
//             </nav>
//           </div>

//           <div className="p-4 border-t border-sidebar-border">
//             <div className="flex items-center gap-2 text-xs text-accent-success">
//               <Circle size={8} className="fill-accent-success" />
//               System Status — All Nodes Operational
//             </div>
//           </div>
//         </div>

//         {/* Main Chat Area */}
//         <div className="flex-1 flex flex-col">
//           {/* Search Bar */}
//           <div className="p-4 border-b border-sidebar-border">
//             <div className="relative">
//               <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
//               <input
//                 type="text"
//                 placeholder="Search across repositories..."
//                 className="w-full pl-12 pr-4 py-3 bg-page-bg border border-sidebar-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
//               />
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
//               >
//                 {msg.role === "assistant" && (
//                   <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
//                     <span className="text-xs font-semibold text-white">AI</span>
//                   </div>
//                 )}
//                 <div
//                   className={`max-w-2xl rounded-2xl px-4 py-3 ${
//                     msg.role === "user"
//                       ? "bg-accent-primary text-white"
//                       : "bg-card-bg border border-sidebar-border text-text-primary"
//                   }`}
//                 >
//                   <div className="text-xs mb-2 opacity-60">{msg.role === "user" ? "You" : "Assistant"}</div>
//                   <div className="text-sm leading-relaxed whitespace-pre-wrap">
//                     {msg.content.split(/(`[^`]+`)/g).map((part, i) =>
//                       part.match(/^`[^`]+`$/) ? (
//                         <code key={i} className="bg-[#0D1117] px-1.5 py-0.5 rounded text-[#8B5CF6] font-mono text-xs">
//                           {part.slice(1, -1)}
//                         </code>
//                       ) : (
//                         part
//                       )
//                     )}
//                   </div>
//                   <div className="text-xs mt-2 opacity-60">{msg.timestamp}</div>
//                 </div>
//                 {msg.role === "user" && (
//                   <div className="w-8 h-8 rounded-full bg-accent-secondary flex items-center justify-center flex-shrink-0">
//                     <span className="text-xs font-semibold text-white">Y</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="p-4 border-t border-sidebar-border">
//             <div className="flex items-center gap-3">
//               <button className="p-2 text-text-muted hover:text-text-secondary transition-colors">
//                 <Paperclip size={20} />
//               </button>
//               <input
//                 type="text"
//                 placeholder="Ask about your code, commits, or documentation..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 className="flex-1 px-4 py-3 bg-page-bg border border-sidebar-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
//               />
//               <button
//                 onClick={handleSend}
//                 className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white hover:bg-accent-blue/90 transition-colors"
//               >
//                 <Send size={18} />
//               </button>
//             </div>
//             <p className="text-xs text-text-muted mt-2 text-center">
//               GitStory AI may produce inaccurate information. Always verify important details.
//             </p>
//           </div>
//         </div>
//       </div>
//     </DashboardShell>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Plus, ArrowUp, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";

export default function ChatPage() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <h1 className="text-2xl font-bold text-white tracking-wide">
          3D RAG EXPLORER
        </h1>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 w-72 shadow-lg">
          <div className="text-[#00E6A4] font-bold mb-3 text-[11px] tracking-wider">
            SYSTEM_STATUS: NOMINAL
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider">INDEX_LOAD</span>
            <div className="flex-1 mx-3 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
              <div className="h-full bg-[#00E6A4] w-[78.4%]"></div>
            </div>
            <span className="text-[10px] text-white">78.4%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider">GPU_COMPUTE</span>
            <div className="flex-1 mx-3 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
              <div className="h-full bg-[#8B5CF6] w-[42.1%]"></div>
            </div>
            <span className="text-[10px] text-white">42.1%</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
        
        {/* Message 1: Kernel Assistant */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#00E6A4] shrink-0 mt-1"></div>
          <div>
            <div className="text-[#00E6A4] text-[11px] font-bold tracking-wider mb-2 uppercase">
              Kernel Assistant
            </div>
            <p className="text-sm leading-relaxed text-[#C9D1D9]">
              Initialization complete. I have indexed 4,821 commits and 12,000+ code nodes.<br />
              What specifically would you like to analyze within the 3D repository graph?
            </p>
          </div>
        </div>

        {/* Message 2: Lead Developer (User) */}
        <div className="flex justify-end">
          <div className="bg-[#1C2128] border border-[#30363D] rounded-2xl p-5 flex items-start gap-6 max-w-4xl">
            <p className="text-sm leading-relaxed text-[#C9D1D9] pt-1">
              Show me the relationship between the auth-gateway refactor<br />
              and the performance regression in the latency-core branch.
            </p>
            <div className="flex flex-col items-end gap-2">
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#8B949E] mt-1">
                Lead Developer
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#30363D] shrink-0"></div>
          </div>
        </div>

        {/* Message 3: Neural Analysis Engine */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6] shrink-0 mt-1"></div>
          <div className="w-full">
            <div className="text-[#8B5CF6] text-[11px] font-bold tracking-wider mb-2 uppercase">
              Neural Analysis Engine
            </div>
            <p className="text-sm leading-relaxed text-[#C9D1D9] mb-6">
              Based on RAG retrieval, identified 84.2% semantic overlap in middleware logic.<br />
              The 3D graph visualizes the collision point where auth hooks interfere with telemetry.
            </p>

            {/* 3D Graph Mockup Area */}
            <div className="bg-[#0D1117] border border-[#30363D] rounded-xl h-[400px] relative overflow-hidden flex items-center justify-center">
              
              {/* Simulated Nodes */}
              <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#00E6A4]"></div>
              <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
              <div className="absolute top-[45%] left-[18%] w-1.5 h-1.5 rounded-full bg-[#30363D]"></div>
              <div className="absolute top-[60%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
              <div className="absolute top-[20%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#00E6A4]"></div>
              <div className="absolute top-[35%] left-[52%] w-1.5 h-1.5 rounded-full bg-[#00E6A4]"></div>
              <div className="absolute top-[48%] left-[60%] w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
              <div className="absolute top-[18%] left-[68%] w-1.5 h-1.5 rounded-full bg-[#30363D]"></div>
              <div className="absolute top-[30%] left-[75%] w-1.5 h-1.5 rounded-full bg-[#30363D]"></div>
              <div className="absolute top-[38%] left-[88%] w-1.5 h-1.5 rounded-full bg-[#00E6A4]"></div>

              {/* Center Overlay Text */}
              <div className="text-center z-10 relative">
                <div className="text-[#00E6A4] font-bold text-lg tracking-widest mb-1">
                  VECTOR_COLLISION_094
                </div>
                <div className="text-[10px] tracking-widest text-[#484F58] uppercase font-semibold">
                  Real-time telemetry stream active
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Input Bar */}
      <div className="fixed bottom-8 left-0 right-0 px-6 flex justify-center pointer-events-none">
        <div className="w-full max-w-[1600px] pointer-events-auto">
          <div className="bg-[#161B22] border border-[#30363D] rounded-full flex items-center p-2 pl-6 shadow-2xl">
            <input
              type="text"
              placeholder="Inquire about code anomalies or repository patterns..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none flex-1 text-sm text-[#C9D1D9] focus:outline-none placeholder:text-[#484F58]"
            />
            <div className="flex items-center gap-2 pr-1">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#484F58] hover:text-[#C9D1D9] transition-colors bg-[#0D1117]">
                <Plus size={20} strokeWidth={2.5} />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#00E6A4] flex items-center justify-center text-[#0D1117] hover:opacity-90 transition-opacity">
                <ArrowUp size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </DashboardShell>
  );
}