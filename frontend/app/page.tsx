import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, MessageSquare, GitBranch } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08090D]">
      {/* Header */}
      <header className="bg-[#08090D] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#00E6A4] transition-colors"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="text-xl font-semibold text-white tracking-[0.15em] uppercase text-[10px]">GITSTORY</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[#484F58] hover:text-[#C9D1D9] transition-colors">Features</Link>
            <Link href="/login" className="text-sm text-[#484F58] hover:text-[#C9D1D9] transition-colors">Sign In</Link>
            <Link href="/signup" className="px-4 py-2 bg-[#00E6A4] text-[#08090D] text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090D] via-[#0A0A0F] to-[#08090D]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00E6A4]/10 border border-[#00E6A4]/20 rounded-full mb-8">
            <Zap size={14} className="text-[#00E6A4]" />
            <span className="text-sm text-[#00E6A4] font-medium">Powered by AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Mine, Index, and Chat with any{' '}
            <span className="bg-gradient-to-r from-[#00E6A4] to-[#00B386] bg-clip-text text-transparent">
              GitHub Repository
            </span>
          </h1>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto mb-10">
            Transform how you understand codebases. GitStory mines commit history, indexes repository structure, and lets you query anything through natural language.
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="px-6 py-3 bg-[#00E6A4] text-[#08090D] font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              Start For Free <ArrowRight size={18} />
            </Link>
          </div>

          {/* Commit Visualization */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#DA3633]" />
                <div className="w-3 h-3 rounded-full bg-[#D29922]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                <span className="ml-2 text-sm text-[#8B949E]">commit-history.ts</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">2h ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#00E6A4]" />
                  <span className="text-sm text-white">feat: Add RAG-based code query endpoint</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">5h ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span className="text-sm text-white">refactor: Simplify embedding pipeline</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">1d ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm text-white">fix: Resolve token limit issue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-[#08090D] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Understanding codebases is hard</h2>
            <p className="text-[#8B949E] max-w-2xl mx-auto">
              Hours spent reading documentation, tracing dependencies, and searching through commit history — time that could be spent building.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Drowning in Code", desc: "Million-line codebases with no clear entry point or architecture." },
              { title: "Lost Context", desc: "Important decisions buried in commit messages and PR comments." },
              { title: "Siloed Knowledge", desc: "Only a few people truly understand how parts of the system work." },
            ].map((item, i) => (
              <div key={i} className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#F85149]/10 flex items-center justify-center mb-4">
                  <MessageSquare size={18} className="text-[#F85149]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#8B949E]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#08090D] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to understand code</h2>
            <p className="text-[#8B949E]">Powerful tools built for developers who value their time.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: GitBranch, title: "Git Analytics", desc: "Deep insights into commit patterns, contributor behavior, and code evolution over time." },
              { icon: MessageSquare, title: "Natural Language Query", desc: "Ask questions about your codebase in plain English and get precise, cited answers." },
              { icon: Zap, title: "Instant Indexing", desc: "Full repository structure indexed in minutes, including file relationships and dependencies." },
              { icon: CheckCircle, title: "Health Scoring", desc: "Automated code health metrics including complexity, churn, and maintainability scores." },
              { icon: MessageSquare, title: "Contextual Narratives", desc: "AI-generated summaries that explain WHY code was written, not just what it does." },
              { icon: CheckCircle, title: "Collaborator Insights", desc: "Understand team dynamics with contributor stats, PR patterns, and review behavior." },
            ].map((feature, i) => (
              <div key={i} className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6 hover:border-[#30363D] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#00E6A4]/10 flex items-center justify-center mb-4">
                  <feature.icon size={18} className="text-[#00E6A4]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8B949E]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#08090D] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to understand your codebase?</h2>
          <p className="text-[#8B949E] mb-8">Start mining and indexing repositories in minutes.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-[#00E6A4] text-[#08090D] font-bold rounded-lg hover:opacity-90 transition-opacity">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#08090D] border-t border-[#1F2937] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#00E6A4] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="text-lg font-semibold text-white">GITSTORY</span>
          </div>
            <div className="flex items-center gap-6 text-sm text-[#8B949E]">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p className="text-sm text-[#484F58]">© 2026 GitStory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}