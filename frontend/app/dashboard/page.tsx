"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { Settings, LayoutGrid, Gauge, GitBranch, Tablet, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

// Mock data matching the screenshot visuals
const repositoryGrowth = [
  { day: "M", value: 30 },
  { day: "T", value: 45 },
  { day: "W", value: 35 },
  { day: "T", value: 65 },
  { day: "F", value: 40 },
  { day: "S", value: 55 },
  { day: "S", value: 25 },
  { day: "M", value: 50 },
];

export default function DashboardPage() {
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
          <MetricCard title="Total Commits" value="12,842" delta="+12.4%" color="#00E6A4" />
          <MetricCard title="Active Contributors" value="48" badge="Active Now" color="#8B5CF6" />
          <MetricCard title="Code Health Score" value="94%" delta="↑ 2.1% this week" color="#00E6A4" />
          <MetricCard title="Last Sync" value="2 MINS AGO" badge="SECURE LINK" color="#D97706" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Recent Activity List */}
          <div className="col-span-8 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              <span className="text-[10px] font-bold text-[#00E6A4] uppercase tracking-widest cursor-pointer">View All Stream</span>
            </div>
            
            <ActivityItem 
              title="Refactored Core Auth Middleware"
              desc="JWT validation and session persistence. Optimized token refresh cycle."
              tag="#refactor"
              time="14:20 PM"
              color="#00E6A4"
            />
            <ActivityItem 
              title="Merge PR #492: Obsidian UI System"
              desc="Integrated 3D component library and glassmorphism shaders into dashboard."
              tag="#merge"
              time="11:05 AM"
              color="#8B5CF6"
            />
            <ActivityItem 
              title="Critical: Memory Leak Detected"
              desc="Scanner found leak in WebSocket listener within hotzone rendering engine."
              button="INITIATE FIX"
              time="09:45 AM"
              color="#EF4444"
            />
          </div>

          {/* Right Column: Charts & Hotzones */}
          <div className="col-span-4 flex flex-col gap-6">
            
            {/* Repository Growth Chart */}
            <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-6">Repository Growth</h3>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={repositoryGrowth}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#484F58', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {repositoryGrowth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#00E6A4" fillOpacity={1} />
                      ))}
                    </Bar>
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