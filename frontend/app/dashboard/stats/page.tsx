// // VISUAL AUDIT — S3 · Activity Health Score.png
// // Background: #0D1117
// // Sidebar: #161B22, width 256px
// // Card background: #161B22
// // Border color: #30363D
// // Primary accent: #8B5CF6
// // Success: #22C55E
// // Chart colors: Production #3B82F6, Staging #8B5CF6
// // Layout: Sidebar + main content with metrics, grouped bar chart, donut chart, area chart

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: YES
// // If any NO: None

// "use client";

// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   AreaChart,
//   Area,
// } from "recharts";
// import { GitCommit, Users, Activity, Clock, Download as ExportIcon, Filter } from "lucide-react";
// import { DashboardShell } from "@/components/layout/DashboardShell";
// import { MetricCard } from "@/components/ui/MetricCard";
// import { statsMetrics, commitFrequencyData, languageDistribution, codeChurnData } from "@/lib/mock-data";

// export default function StatsPage() {
//   const [chartView, setChartView] = useState<"daily" | "weekly">("daily");

//   return (
//     <DashboardShell>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-text-heading">Project Statistics</h1>
//             <p className="text-text-secondary mt-1">Comprehensive metrics for your repository</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
//               <Filter size={16} />
//               Date Range
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
//               <ExportIcon size={16} />
//               Export Report
//             </button>
//           </div>
//         </div>

//         {/* Metric Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {statsMetrics.map((metric, index) => (
//             <MetricCard
//               key={index}
//               title={metric.title}
//               value={metric.value}
//               delta={metric.delta}
//               deltaLabel={metric.deltaLabel}
//               icon={index === 0 ? GitCommit : index === 1 ? Users : index === 2 ? Activity : Clock}
//               iconBgColor={metric.iconBgColor}
//               iconColor={metric.iconColor}
//             />
//           ))}
//         </div>

//         {/* Commit Frequency */}
//         <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-lg font-semibold text-text-heading">Commit Frequency</h2>
//               <p className="text-sm text-text-secondary mt-1">Production vs Staging over time</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setChartView("daily")}
//                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
//                   chartView === "daily"
//                     ? "bg-accent-primary text-white"
//                     : "bg-page-bg text-text-secondary hover:text-text-primary"
//                 }`}
//               >
//                 Daily
//               </button>
//               <button
//                 onClick={() => setChartView("weekly")}
//                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
//                   chartView === "weekly"
//                     ? "bg-accent-primary text-white"
//                     : "bg-page-bg text-text-secondary hover:text-text-primary"
//                 }`}
//               >
//                 Weekly
//               </button>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={commitFrequencyData}>
//               <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
//               <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#161B22",
//                   border: "1px solid #30363D",
//                   borderRadius: "8px",
//                   fontSize: "12px",
//                 }}
//               />
//               <Legend
//                 wrapperStyle={{ fontSize: "12px", color: "#8B949E" }}
//                 iconType="circle"
//               />
//               <Bar dataKey="production" fill="#3B82F6" radius={[4, 4, 0, 0]} name="PRODUCTION" />
//               <Bar dataKey="staging" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="STAGING" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Language Distribution */}
//           <div className="bg-card-bg border border-card-border rounded-xl p-6">
//             <h2 className="text-lg font-semibold text-text-heading mb-6">Language Distribution</h2>
//             <div className="relative">
//               <ResponsiveContainer width="100%" height={240}>
//                 <PieChart>
//                   <Pie
//                     data={languageDistribution}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={2}
//                     dataKey="value"
//                   >
//                     {languageDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#161B22",
//                       border: "1px solid #30363D",
//                       borderRadius: "8px",
//                       fontSize: "12px",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                 <span className="text-2xl font-bold text-text-heading">12</span>
//                 <span className="text-xs text-text-muted">LANGUAGES</span>
//               </div>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-2">
//               {languageDistribution.map((lang, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: lang.color }}
//                   />
//                   <span className="text-xs text-text-secondary">{lang.name}</span>
//                   <span className="text-xs text-text-muted ml-auto">{lang.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Code Churn over Time */}
//           <div className="bg-card-bg border border-card-border rounded-xl p-6">
//             <h2 className="text-lg font-semibold text-text-heading mb-6">Code Churn over Time</h2>
//             <ResponsiveContainer width="100%" height={240}>
//               <AreaChart data={codeChurnData}>
//                 <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
//                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#8B949E" }} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#161B22",
//                     border: "1px solid #30363D",
//                     borderRadius: "8px",
//                     fontSize: "12px",
//                   }}
//                 />
//                 <Legend
//                   wrapperStyle={{ fontSize: "12px", color: "#8B949E" }}
//                   iconType="circle"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="churn"
//                   stroke="#EC4899"
//                   fill="#EC489920"
//                   strokeWidth={2}
//                   name="Lines Changed"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="lines"
//                   stroke="#06B6D4"
//                   fill="#06B6D420"
//                   strokeWidth={2}
//                   name="Lines Added"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </DashboardShell>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { api } from "@/lib/api";

interface StatsData {
  build_stability: number;
  health_score: number;
  total_commits: string;
  active_contributors: number;
  avg_daily_commits: number;
  commit_frequency: { day: string; production: number; staging: number }[];
  language_distribution: { name: string; value: number; color: string }[];
  code_churn: { week: string; churn: number; lines: number }[];
}

export default function StatsPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [hotzoneData, setHotzoneData] = useState<any[]>([]);
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only use cached data - don't fetch automatically
    const cachedData = localStorage.getItem("gitstory_cached_data");
    const currentRepo = localStorage.getItem("gitstory_current_repo");
    
    if (!cachedData || !currentRepo) {
      // No data - user needs to analyze a repo first
      setLoading(false);
      return;
    }

    const repo = JSON.parse(currentRepo);
    if (repo && repo.url) {
      setRepoUrl(repo.url);
      const urlParts = repo.url.replace('https://github.com/', '').split('/');
      setRepoName(urlParts[1] || urlParts[0] || "Repository");
    }

    const cached = JSON.parse(cachedData);
    if (cached.stats) {
      setStatsData(cached.stats as StatsData);
    }
    if (cached.hotzone) {
      setHotzoneData(cached.hotzone);
    }
    
    setLoading(false);
  }, [mounted]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  const buildStability = statsData?.build_stability ?? 0;
  const healthScore = statsData?.health_score ?? 0;
  const totalCommits = statsData?.total_commits ?? "0";
  const activeContributors = statsData?.active_contributors ?? 0;
  const avgDailyCommits = statsData?.avg_daily_commits ?? 0;
  
  // Calculate complexity based on file count from hotzone data
  const fileCount = hotzoneData?.length ?? 0;
  const complexityLabel = fileCount > 100 ? "High" : fileCount > 50 ? "Medium" : "Low";
  
  // Format commits for display
  const commitsDisplay = typeof totalCommits === 'string' ? totalCommits : String(totalCommits);

  return (
    <DashboardShell>
      <div className="min-h-screen bg-[#0D1117] text-[#8B949E] font-sans">
        
        {/* Top Section: Health Overview */}
        <div className="bg-[#11141D] border-b border-[#1F2937] py-16 px-10 flex flex-col items-center relative">
          <div className="w-full max-w-[1400px] flex justify-between items-start mb-8">
            
            {/* Left Stat */}
            <div className="bg-[#161B22]/50 border border-[#1F2937] rounded-2xl p-5 w-56 shadow-lg backdrop-blur-sm">
              <div className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-1">Total Commits</div>
              <div className="text-3xl font-bold text-[#00E6A4] tracking-tight">{commitsDisplay}</div>
              <div className="text-xs text-[#484F58] mt-1">{activeContributors} contributors</div>
            </div>

            {/* Center Gauge */}
            <div className="flex flex-col items-center -mt-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1F2937" strokeWidth="8" strokeDasharray="198 264" strokeDashoffset="-33" strokeLinecap="round" />
                  <circle 
                    cx="50" cy="50" r="42" 
                    fill="transparent" 
                    stroke={healthScore > 70 ? "#00E6A4" : healthScore > 40 ? "#D97706" : "#EF4444"} 
                    strokeWidth="8" 
                    strokeDasharray={`${healthScore * 2.64} 264`} 
                    strokeDashoffset="-33" 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="flex flex-col items-center text-center z-10 mt-2">
                  <span className="text-5xl font-bold text-white tracking-tight leading-none">{healthScore}</span>
                  <span className="text-[9px] font-bold text-[#484F58] uppercase tracking-[0.2em] mt-2">Health Score</span>
                </div>
              </div>
            </div>

            {/* Right Stat */}
            <div className="bg-[#161B22]/50 border border-[#1F2937] rounded-2xl p-5 w-56 shadow-lg backdrop-blur-sm">
              <div className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-1">Active Files</div>
              <div className="text-2xl font-bold text-white tracking-tight mt-1">{fileCount}</div>
              <div className="text-xs text-[#484F58] mt-1">{avgDailyCommits} daily avg</div>
            </div>
          </div>

          {/* Global Title */}
          <div className="text-center mt-2">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">{repoName || "Repository Stats"}</h1>
            <p className="text-sm text-[#8B949E]">{repoUrl || "No repository selected"}</p>
          </div>
        </div>

        {/* Bottom Section: Pending Anomalies */}
        <div className="p-10 max-w-[1400px] mx-auto w-full">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Code Hotzones</h2>
              <p className="text-sm text-[#8B949E] mt-1">Files with highest commit activity - potential refactoring targets.</p>
            </div>
            <div className="text-sm text-[#484F58]">
              {hotzoneData.length} files tracked
            </div>
          </div>

          {/* Issue Cards Grid - Real Hotzone Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotzoneData.length > 0 ? (
              hotzoneData.slice(0, 6).map((hz: any, i: number) => {
                const commits = hz.total_commits || 0;
                const severity = commits > 10 ? "CRITICAL" : commits > 5 ? "PERFORMANCE" : "STABLE";
                const color = commits > 10 ? "#EF4444" : commits > 5 ? "#D97706" : "#00E6A4";
                const fillLevel = commits > 10 ? "100%" : commits > 5 ? "65%" : "30%";
                const id = `#HX-${String(i + 1).padStart(3, '0')}`;
                return (
                  <AnomalyCard 
                    key={i}
                    severity={severity}
                    id={id}
                    title={hz.name || hz.path?.split('/').pop() || "Unknown File"}
                    desc={`${commits} commits · ${hz.churn_score || 0} lines changed · Last: ${hz.last_modified ? new Date(hz.last_modified).toLocaleDateString() : 'N/A'}`}
                    path={hz.path || hz.name || "Unknown"}
                    color={color}
                    assignee={hz.author || "Multiple"}
                    fillLevel={fillLevel}
                  />
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12 text-[#484F58]">
                No hotzone data available. Analyze a repository first.
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

// Sub-component for the Issue Cards
function AnomalyCard({ severity, id, title, desc, path, color, assignee, fillLevel }: any) {
  return (
    <div className="bg-[#161B22] border border-[#1F2937] rounded-2xl relative overflow-hidden flex flex-col shadow-xl hover:border-[#30363D] transition-colors">
      {/* Top Color Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color }}></div>
      
      <div className="p-7 flex-1 flex flex-col">
        {/* Header (Badge & ID) */}
        <div className="flex justify-between items-center mb-6">
          <span 
            className="text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest bg-opacity-5"
            style={{ color: color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
          >
            {severity}
          </span>
          <span className="text-[11px] font-bold text-[#484F58]">{id}</span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-[#8B949E] leading-relaxed mb-6">{desc}</p>

        {/* File Path Snippet */}
        <div className="bg-[#0D1117] border border-[#1F2937] rounded-lg p-3 mb-6">
          <code className="text-[#00E6A4] text-xs font-mono">{path}</code>
        </div>

        <div className="mt-auto">
          {/* Severity Bar */}
          <div className="mb-6">
            <div className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-2">Severity</div>
            <div className="h-1.5 w-full bg-[#0D1117] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: fillLevel, backgroundColor: color }}></div>
            </div>
          </div>

          {/* Assignee & Action */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
              <div className="text-[11px] text-[#8B949E]">
                Assigned to <span className="font-bold text-white">{assignee}</span>
              </div>
            </div>
          </div>

          <button 
            className="w-full mt-6 py-3 rounded-xl border border-opacity-30 text-xs font-bold flex items-center justify-center gap-2 transition-colors hover:bg-opacity-5"
            style={{ color: color, borderColor: color, backgroundColor: `${color}00` }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${color}10`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${color}00`}
          >
            View Details <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}