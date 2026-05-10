// VISUAL AUDIT — S2 · Dashboard Overview.png
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Primary accent: #8B5CF6
// Success: #22C55E
// Font: Inter, system-ui
// Layout: Sidebar + main content with 4-column metric cards, activity list, charts

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: YES
// If any NO: None

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { GitCommit, Users, Activity, RefreshCw, Plus, GitBranch, ArrowRight } from "lucide-react";
import {
  dashboardMetrics,
  recentActivity,
  commitDistribution,
  collaboratorInsights,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading">Dashboard</h1>
            <p className="text-text-secondary mt-1">Welcome back! Here&apos;s your project overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
              <Plus size={16} />
              New Analysis
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              deltaLabel={metric.deltaLabel}
              icon={index === 0 ? GitCommit : index === 1 ? Users : index === 2 ? Activity : RefreshCw}
              iconBgColor={metric.iconBgColor}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-heading">Recent Activity</h2>
                <button className="text-sm text-accent-primary hover:text-accent-primary-hover transition-colors flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-page-bg rounded-lg hover:bg-card-hover transition-colors">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                      style={{ backgroundColor: activity.iconBg }}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary font-medium truncate">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">{activity.author}</span>
                        <span className="text-xs text-text-muted">•</span>
                        <div className="flex items-center gap-1">
                          <GitBranch size={10} className="text-text-muted" />
                          <span className="text-xs text-text-muted">{activity.branch}</span>
                        </div>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="text-xs text-text-muted">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commit Distribution */}
            <div className="bg-card-bg border border-card-border rounded-xl p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-text-heading">Commit Distribution</h2>
                  <p className="text-sm text-text-secondary mt-1">Daily commits over the past week</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={commitDistribution}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161B22",
                      border: "1px solid #30363D",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="production" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Production" />
                  <Bar dataKey="staging" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Staging" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Collaborator Insights */}
          <div>
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-heading mb-6">Collaborator Insights</h2>
              <div className="space-y-4">
                {collaboratorInsights.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                      style={{ backgroundColor: person.avatarBg }}
                    >
                      {person.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">{person.name}</span>
                        <span className="text-sm font-medium text-accent-primary">{person.value}</span>
                      </div>
                      <div className="mt-1">
                        <div className="h-2 bg-page-bg rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(person.value / collaboratorInsights[0].value) * 100}%`,
                              backgroundColor: person.avatarBg,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-text-muted">{person.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
