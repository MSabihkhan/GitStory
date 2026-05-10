// VISUAL AUDIT — S6 · Timeline Narration.png
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Timeline categories: REFACTOR=#3B82F6, MILESTONE=#22C55E, DATA=#F59E0B, HOTFIX=#DA3633
// Font: Inter, system-ui
// Layout: Left sidebar + main content (timeline) + right sidebar

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: YES
// If any NO: None

"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthGauge } from "@/components/ui/HealthGauge";
import { timelineStories } from "@/lib/mock-data";
import { GitBranch, GitCommit, MessageSquare, Download, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

function TimelineConnector({ items }: { items: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const height = items * 320;
    svg.attr("height", height);

    const line = svg
      .append("line")
      .attr("x1", 24)
      .attr("y1", 40)
      .attr("x2", 24)
      .attr("y2", height - 40)
      .attr("stroke", "#30363D")
      .attr("stroke-width", 2);

    for (let i = 0; i < items; i++) {
      svg
        .append("circle")
        .attr("cx", 24)
        .attr("cy", 40 + i * 320)
        .attr("r", 6)
        .attr("fill", "#161B22")
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 2);
    }
  }, [items]);

  return <svg ref={svgRef} width={48} className="flex-shrink-0" />;
}

export default function TimelinePage() {
  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-text-heading">Development Narrative</h1>
              <p className="text-text-secondary mt-1">AI-generated stories from your commit history</p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {timelineStories.map((story, index) => (
                <div key={index} className="flex gap-6">
                  <TimelineConnector items={1} />
                  <div className="flex-1 bg-card-bg border border-card-border rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs text-text-muted font-mono">{story.date}</span>
                        <span
                          className="ml-3 inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold text-white"
                          style={{ backgroundColor: story.categoryColor }}
                        >
                          {story.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-text-heading mb-3">{story.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{story.narrative}</p>
                    <div className="flex items-center gap-6 text-sm text-text-muted mb-4">
                      <div className="flex items-center gap-2">
                        <GitCommit size={14} />
                        <span>{story.commits} commits</span>
                      </div>
                      <span>{story.filesChanged} files</span>
                      <span>+{story.linesAdded} / -{story.linesRemoved}</span>
                    </div>
                    <button className="text-sm text-accent-primary hover:text-accent-primary-hover transition-colors flex items-center gap-1">
                      View Diff <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-3 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
                Load previous story segments
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-text-heading mb-6">Narrative Summary</h2>

              {/* Health Score */}
              <div className="flex items-center justify-center mb-6">
                <HealthGauge score={85} label="Health Score" size={120} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-6 text-sm">
                <span className="text-accent-success">+12%</span>
                <span className="text-text-muted">vs last month</span>
              </div>

              {/* Top Contributor */}
              <div className="mb-6">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Top Contributor</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-sm font-semibold text-white">
                    SC
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Sarah Chen</p>
                    <p className="text-xs text-text-muted">Feature Lead</p>
                  </div>
                </div>
              </div>

              {/* Project Insights */}
              <div className="space-y-3 mb-6">
                <p className="text-xs text-text-muted uppercase tracking-wider">Project Insights</p>
                {[
                  { icon: GitCommit, text: "142 active branches", color: "#3B82F6" },
                  { icon: MessageSquare, text: "89 open pull requests", color: "#8B5CF6" },
                  { icon: GitBranch, text: "3 unmerged feature branches", color: "#F59E0B" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <span className="text-sm text-text-secondary">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Export Button */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
                <Download size={16} />
                Export Narrative PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
