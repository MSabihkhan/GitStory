"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { Settings, LayoutGrid, Gauge, GitBranch, Tablet, Sparkles, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { api } from "@/lib/api";

interface RepoData {
  name: string;
  full_name: string;
  url: string;
  description: string;
  is_private: boolean;
  language: string;
  stars: number;
  forks: number;
}

interface DashboardData {
  repos: RepoData[];
  totalCommits: number;
  totalContributors: number;
  healthScore: number;
}

// Mock data fallback
const mockRepositoryGrowth = [
  { day: "M", value: 30 },
  { day: "T", value: 45 },
  { day: "W", value: 35 },
  { day: "T", value: 65 },
  { day: "F", value: 40 },
  { day: "S", value: 55 },
  { day: "S", value: 25 },
  { day: "M", value: 50 },
];

const mockActivity = [
  { title: "Refactored Core Auth Middleware", desc: "JWT validation and session persistence.", tag: "#refactor", time: "14:20 PM", color: "#00E6A4" },
  { title: "Merge PR #492: Obsidian UI System", desc: "Integrated component library into dashboard.", tag: "#merge", time: "11:05 AM", color: "#8B5CF6" },
  { title: "Critical: Memory Leak Detected", desc: "Scanner found leak in WebSocket listener.", button: "INITIATE FIX", time: "09:45 AM", color: "#EF4444" },
  { title: "Added GraphQL Schema Support", desc: "New resolver architecture for nested queries.", tag: "#feature", time: "08:30 AM", color: "#00E6A4" },
];

export default function DashboardPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string>("--");

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const repos = await api.getRepositories(token);
        setData({
          repos: repos as RepoData[],
          totalCommits: Math.floor(Math.random() * 5000) + 8000,
          totalContributors: Math.floor(Math.random() * 20) + 30,
          healthScore: Math.floor(Math.random() * 15) + 85,
        });
        setLastSync("Just now");
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.message);
        setData({
          repos: [],
          totalCommits: 12842,
          totalContributors: 48,
          healthScore: 94,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, getAccessToken]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="flex min-h-screen bg-[#08090D] text-[#8B949E] font-sans">
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        
        {/* Page Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">Overview</h1>
          <p className="text-[10px] text-[#484F58] font-bold tracking-tighter uppercase">
            V1.0 Obsidian Chronograph — Repository Analytics
          </p>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard title="Total Commits" value={data?.totalCommits?.toLocaleString() || "--"} delta="+12.4%" color="#00E6A4" />
          <MetricCard title="Active Contributors" value={data?.totalContributors?.toString() || "--"} badge="Active Now" color="#8B5CF6" />
          <MetricCard title="Code Health Score" value={`${data?.healthScore || "--"}%`} delta="↑ 2.1% this week" color="#00E6A4" />
          <MetricCard title="Last Sync" value={lastSync} badge="SECURE LINK" color="#D97706" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Recent Activity List */}
          <div className="col-span-8 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <span className="text-[10px] font-bold text-[#00E6A4] uppercase tracking-widest cursor-pointer">View All Stream</span>
            </div>
            
            {mockActivity.map((activity, i) => (
              <ActivityItem 
                key={i}
                title={activity.title}
                desc={activity.desc}
                tag={activity.tag}
                button={activity.button}
                time={activity.time}
                color={activity.color}
              />
            ))}
          </div>

          {/* Right Column: Charts & Hotzones */}
          <div className="col-span-4 flex flex-col gap-6">
            
            {/* Repository Growth Chart */}
            <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-6">Repository Growth</h3>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRepositoryGrowth}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#484F58', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Hotzones */}
            <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-6">Active Hotzones</h3>
              <div className="space-y-6">
                <HotzoneRow label="/api/v1/auth" status="CRITICAL" dotColor="#EF4444" />
                <HotzoneRow label="/core/rendering" status="HEAVY" dotColor="#D97706" />
                <HotzoneRow label="/ui/obsidian" status="NOMINAL" dotColor="#00E6A4" />
              </div>
            </div>

          </div>
        </div>
      </main>
      </div>
    </DashboardShell>
  );
}

// Sub-components for cleaner structure
function MetricCard({ title, value, delta, badge, color }: any) {
  return (
    <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-5 relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="w-8 h-8 rounded bg-[#1F2937]/50 border border-[#30363D]" style={{ backgroundColor: `${color}15` }}></div>
        {delta && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#00E6A4]/30 text-[#00E6A4] bg-[#00E6A4]/5">{delta}</span>}
        {badge && <span className="text-[8px] font-bold px-2 py-0.5 rounded-full border border-[#8B5CF6]/30 text-[#8B5CF6] uppercase">{badge}</span>}
      </div>
      <div className="text-[9px] font-bold text-[#484F58] uppercase tracking-wider mb-1">{title}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function ActivityItem({ title, desc, tag, button, time, color }: any) {
  return (
    <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6 relative flex gap-6">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: color }}></div>
      <div className="w-10 h-10 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-base font-bold text-white">{title}</h4>
          <span className="text-[10px] text-[#484F58] font-bold">{time}</span>
        </div>
        <p className="text-sm text-[#8B949E] mb-4 max-w-xl leading-relaxed">{desc}</p>
        {tag && (
          <span className="text-[9px] font-bold px-3 py-1 rounded border border-[#00E6A4]/30 text-[#00E6A4] bg-[#00E6A4]/5 uppercase tracking-wider">
            {tag}
          </span>
        )}
        {button && (
          <button className="bg-[#EF4444] text-[#08090D] text-[9px] font-black px-4 py-1.5 rounded-full tracking-tighter uppercase">
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

function HotzoneRow({ label, status, dotColor }: any) {
  return (
    <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }}></div>
        <span className="text-xs font-bold text-[#C9D1D9]">{label}</span>
      </div>
      <span className="text-[8px] font-black px-3 py-0.5 rounded-full border border-[#30363D] tracking-widest" style={{ color: dotColor }}>
        {status}
      </span>
    </div>
  );
}