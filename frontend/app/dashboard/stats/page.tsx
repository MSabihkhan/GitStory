// VISUAL AUDIT — S3 · Activity Health Score.png
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Primary accent: #8B5CF6
// Success: #22C55E
// Chart colors: Production #3B82F6, Staging #8B5CF6
// Layout: Sidebar + main content with metrics, grouped bar chart, donut chart, area chart

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: YES
// If any NO: None

"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { GitCommit, Users, Activity, Clock, Download as ExportIcon, Filter } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { statsMetrics, commitFrequencyData, languageDistribution, codeChurnData } from "@/lib/mock-data";

export default function StatsPage() {
  const [chartView, setChartView] = useState<"daily" | "weekly">("daily");

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-heading">Project Statistics</h1>
            <p className="text-text-secondary mt-1">Comprehensive metrics for your repository</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
              <Filter size={16} />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
              <ExportIcon size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              deltaLabel={metric.deltaLabel}
              icon={index === 0 ? GitCommit : index === 1 ? Users : index === 2 ? Activity : Clock}
              iconBgColor={metric.iconBgColor}
              iconColor={metric.iconColor}
            />
          ))}
        </div>

        {/* Commit Frequency */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-heading">Commit Frequency</h2>
              <p className="text-sm text-text-secondary mt-1">Production vs Staging over time</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartView("daily")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  chartView === "daily"
                    ? "bg-accent-primary text-white"
                    : "bg-page-bg text-text-secondary hover:text-text-primary"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setChartView("weekly")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  chartView === "weekly"
                    ? "bg-accent-primary text-white"
                    : "bg-page-bg text-text-secondary hover:text-text-primary"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={commitFrequencyData}>
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
              <Legend
                wrapperStyle={{ fontSize: "12px", color: "#8B949E" }}
                iconType="circle"
              />
              <Bar dataKey="production" fill="#3B82F6" radius={[4, 4, 0, 0]} name="PRODUCTION" />
              <Bar dataKey="staging" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="STAGING" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Language Distribution */}
          <div className="bg-card-bg border border-card-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-heading mb-6">Language Distribution</h2>
            <div className="relative">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={languageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {languageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161B22",
                      border: "1px solid #30363D",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-text-heading">12</span>
                <span className="text-xs text-text-muted">LANGUAGES</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {languageDistribution.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-xs text-text-secondary">{lang.name}</span>
                  <span className="text-xs text-text-muted ml-auto">{lang.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Churn over Time */}
          <div className="bg-card-bg border border-card-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-heading mb-6">Code Churn over Time</h2>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={codeChurnData}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161B22",
                    border: "1px solid #30363D",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#8B949E" }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="churn"
                  stroke="#EC4899"
                  fill="#EC489920"
                  strokeWidth={2}
                  name="Lines Changed"
                />
                <Area
                  type="monotone"
                  dataKey="lines"
                  stroke="#06B6D4"
                  fill="#06B6D420"
                  strokeWidth={2}
                  name="Lines Added"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
