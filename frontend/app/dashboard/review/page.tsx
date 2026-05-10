// VISUAL AUDIT — S3 · Activity Health Score.png (Review section)
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Severity colors: CRITICAL=#F85149, WARNING=#D29922, INFO=#58A6FF
// Font: Inter, system-ui
// Layout: Sidebar + main content with HealthGauge, issue list

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: N/A
// If any NO: None

"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { HealthGauge } from "@/components/ui/HealthGauge";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { issues } from "@/lib/mock-data";
import { ChevronRight, Download, Filter, X, AlertTriangle, Info, AlertCircle } from "lucide-react";

export default function ReviewPage() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
            <span>main</span>
            <span>•</span>
            <span>v2.4.1</span>
          </div>
          <h1 className="text-2xl font-bold text-text-heading">Main Project</h1>
        </div>

        {/* Health Score Section */}
        <div className="bg-card-bg border border-card-border rounded-xl p-8 mb-6">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <HealthGauge score={85} label="Health Score" size={160} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-text-heading mb-2">Project Health Score</h2>
              <p className="text-sm text-text-secondary mb-6 max-w-md">
                Overall code quality assessment based on complexity, security, and maintainability metrics.
              </p>
              <div className="flex gap-6">
                <div className="bg-page-bg rounded-lg px-4 py-3">
                  <p className="text-2xl font-bold text-text-heading">1,247</p>
                  <p className="text-xs text-text-muted">FILES ANALYZED</p>
                </div>
                <div className="bg-page-bg rounded-lg px-4 py-3">
                  <p className="text-2xl font-bold text-text-heading">4.2</p>
                  <p className="text-xs text-text-muted">COMPLEXITY</p>
                </div>
                <div className="bg-page-bg rounded-lg px-4 py-3">
                  <p className="text-sm font-medium text-accent-success">2h ago</p>
                  <p className="text-xs text-text-muted">LAST SCAN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Section */}
        <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-semibold text-text-heading">
              Detected Issues <span className="text-text-muted">({issues.length})</span>
            </h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-page-bg border border-sidebar-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
                <Filter size={14} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-page-bg border border-sidebar-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
                <Download size={14} />
                Export Report
              </button>
            </div>
          </div>

          <div className="divide-y divide-sidebar-border">
            {issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-card-hover transition-colors cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    issue.severity === "CRITICAL"
                      ? "bg-[#3F1E1E]"
                      : issue.severity === "WARNING"
                      ? "bg-[#3E2D1E]"
                      : "bg-[#1E3A5F]"
                  }`}
                >
                  {issue.severity === "CRITICAL" ? (
                    <X size={14} className="text-[#F85149]" />
                  ) : issue.severity === "WARNING" ? (
                    <AlertTriangle size={14} className="text-[#D29922]" />
                  ) : (
                    <Info size={14} className="text-[#58A6FF]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <SeverityBadge severity={issue.severity} />
                    <span className="text-xs text-text-muted font-mono truncate">{issue.file}</span>
                  </div>
                  <p className="text-sm font-medium text-text-primary">{issue.title}</p>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-1">{issue.description}</p>
                </div>
                <ChevronRight size={16} className="text-text-muted flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
