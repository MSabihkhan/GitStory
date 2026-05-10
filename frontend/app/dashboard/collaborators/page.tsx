// VISUAL AUDIT — S4 · Engineers.png
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Role colors: The Feature Lead=#22D2D2, Documentation Guru=#A855F7, DevOps Wizard=#22C55E, Performance Pro=#F59E0B
// Font: Inter, system-ui
// Layout: Sidebar + main content with tabs and 3-column card grid

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: N/A
// If any NO: None

"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { contributors } from "@/lib/mock-data";
import { Plus, Filter, MoreVertical } from "lucide-react";

const tabs = ["All Contributors", "Core Team", "External Maintainers", "Bots"];

export default function CollaboratorsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading">Collaborators</h1>
            <p className="text-text-secondary mt-1">Meet the team behind the code</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
              <Plus size={16} />
              Invite Developer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-sidebar-border mb-6">
          <div className="flex gap-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === index
                    ? "text-accent-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-card-bg border border-card-border rounded-xl p-6 hover:bg-card-hover transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                    style={{ backgroundColor: contributor.avatarBg }}
                  >
                    {contributor.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary">{contributor.name}</span>
                      <button className="p-1 text-text-muted hover:text-text-secondary">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: contributor.roleColor }}
                    >
                      {contributor.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-sidebar-border">
                <div className="text-center px-2">
                  <p className="text-lg font-bold text-text-heading">{contributor.commits}</p>
                  <p className="text-xs text-text-muted">COMMITS</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-lg font-bold text-text-heading">{contributor.prs}</p>
                  <p className="text-xs text-text-muted">PRs</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-lg font-bold text-text-heading">{contributor.reviews}</p>
                  <p className="text-xs text-text-muted">REVIEWS</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
