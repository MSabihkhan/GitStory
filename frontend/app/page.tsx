// VISUAL AUDIT — GITSTORY Landing Page.png
// Background: #0F0F1A to #1A1A2E gradient
// Header background: #0D1117
// Primary accent color: #8B5CF6
// Card background: #1E293B with 50% opacity
// Border color: #1E293B
// Font (headings): Inter, 600-700 weight
// Font (body): Inter, 400 weight
// Layout: Full width, centered content with max-width 1280px
// Unique elements: Gradient text on headline, feature cards grid, GitHub-style commit visualization

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: N/A
// If any NO: None

import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, MessageSquare, GitBranch } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      {/* Header */}
      <header className="bg-[#0D1117] border-b border-[#30363D]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#F8FAFC]">GitStory</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[#8B949E] hover:text-[#F0F6FC] transition-colors">Features</Link>
            <Link href="#how" className="text-sm text-[#8B949E] hover:text-[#F0F6FC] transition-colors">How It Works</Link>
            <Link href="/login" className="text-sm text-[#8B949E] hover:text-[#F0F6FC] transition-colors">Sign In</Link>
            <Link href="/signup" className="px-4 py-2 bg-[#8B5CF6] text-white text-sm font-medium rounded-lg hover:bg-[#7C3AED] transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] via-[#1A1A2E] to-[#0F0F1A]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-8">
            <Zap size={14} className="text-[#8B5CF6]" />
            <span className="text-sm text-[#8B5CF6] font-medium">Powered by AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-6 leading-tight">
            Mine, Index, and Chat with any{' '}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              GitHub Repository
            </span>
          </h1>
          <p className="text-lg text-[#8B949E] max-w-2xl mx-auto mb-10">
            Transform how you understand codebases. GitStory mines commit history, indexes repository structure, and lets you query anything through natural language.
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors flex items-center gap-2">
              Start For Free <ArrowRight size={18} />
            </Link>
            <Link href="#how" className="px-6 py-3 bg-[#161B22] border border-[#30363D] text-[#F0F6FC] font-semibold rounded-lg hover:bg-[#1C2128] transition-colors">
              See How It Works
            </Link>
          </div>

          {/* Commit Visualization */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#DA3633]" />
                <div className="w-3 h-3 rounded-full bg-[#D29922]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                <span className="ml-2 text-sm text-[#8B949E]">commit-history.ts</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">2h ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span className="text-sm text-[#F0F6FC]">feat: Add RAG-based code query endpoint</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">5h ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span className="text-sm text-[#F0F6FC]">refactor: Simplify embedding pipeline</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#484F58] font-mono w-24">1d ago</span>
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm text-[#F0F6FC]">fix: Resolve token limit issue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-[#0D1117] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-4">Understanding codebases is hard</h2>
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
              <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#DA3633]/10 flex items-center justify-center mb-4">
                  <MessageSquare size={18} className="text-[#F85149]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8B949E]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#0F0F1A] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F8FAFC] mb-4">Everything you need to understand code</h2>
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
              <div key={i} className="bg-[#1E293B]/50 border border-[#1E293B] rounded-xl p-6 hover:bg-[#1E293B] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                  <feature.icon size={18} className="text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8B949E]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0D1117] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#F8FAFC] mb-4">Ready to understand your codebase?</h2>
          <p className="text-[#8B949E] mb-8">Start mining and indexing repositories in minutes.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1117] border-t border-[#30363D] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-[#F8FAFC]">GitStory</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#8B949E]">
              <Link href="#" className="hover:text-[#F0F6FC] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#F0F6FC] transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-[#F0F6FC] transition-colors">Documentation</Link>
            </div>
            <p className="text-sm text-[#484F58]">© 2026 GitStory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
