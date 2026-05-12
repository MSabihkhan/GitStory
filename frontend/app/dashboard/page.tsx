"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LineChart, Line } from "recharts";
import { Settings, LayoutGrid, Gauge, GitBranch, Tablet, Sparkles, Loader2, Search, Play, CheckCircle, Link } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
  totalCommits: number;
  totalContributors: number;
  healthScore: number;
}

interface TimelineData {
  narration: string;
  commits: Array<{ hash: string; message: string; date: string; author: string }>;
}

interface HotzoneData {
  filename: string;
  commits: number;
  lines_changed: number;
}

interface StatsData {
  build_stability: number;
  health_score: number;
  total_commits: string;
  active_contributors: number;
  avg_daily_commits: number;
  commit_frequency: Array<{ day: string; production: number; staging: number }>;
  language_distribution: Array<{ name: string; value: number; color: string }>;
  code_churn: Array<{ week: string; churn: number; lines: number }>;
}

interface CollaboratorsData {
  contributors: Array<{
    name: string;
    role: string;
    avatar_bg: string;
    commits: string;
    prs: string;
    impact: string;
    impact_color: string;
  }>;
}

const mockActivity = [
  { title: "Refactored Core Auth Middleware", desc: "JWT validation and session persistence.", tag: "#refactor", time: "14:20 PM", color: "#00E6A4" },
  { title: "Merge PR #492: Obsidian UI System", desc: "Integrated component library into dashboard.", tag: "#merge", time: "11:05 AM", color: "#8B5CF6" },
  { title: "Critical: Memory Leak Detected", desc: "Scanner found leak in WebSocket listener.", button: "INITIATE FIX", time: "09:45 AM", color: "#EF4444" },
  { title: "Added GraphQL Schema Support", desc: "New resolver architecture for nested queries.", tag: "#feature", time: "08:30 AM", color: "#00E6A4" },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getAccessToken, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const fetchedRef = useRef(false);
  const [hotzoneData, setHotzoneData] = useState<HotzoneData[]>([]);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [collaboratorsData, setCollaboratorsData] = useState<CollaboratorsData | null>(null);
  const [indexingStatus, setIndexingStatus] = useState<string | null>(null);
  const [isIndexing, setIsIndexing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string>("--");
  const [cancelAnalysis, setCancelAnalysis] = useState(false);
  const analysisCancelledRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const formatLastSync = (dateStr: string) => {
    if (!dateStr || dateStr === "--") return "--";
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      
      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days === 1) return "Yesterday";
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    } catch {
      return "--";
    }
  };
  const [moduleStatus, setModuleStatus] = useState<{
    timeline: 'idle' | 'loading' | 'done' | 'error';
    hotzone: 'idle' | 'loading' | 'done' | 'error';
    stats: 'idle' | 'loading' | 'done' | 'error';
    collaborators: 'idle' | 'loading' | 'done' | 'error';
  }>({ timeline: 'idle', hotzone: 'idle', stats: 'idle', collaborators: 'idle' });

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state === "oauth_callback") {
      console.log("OAuth callback received");
    }
  }, [searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only run once when mounted changes to true - load from cache if available
  useEffect(() => {
    if (!mounted || hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    // Check if there's cached data to display
    const cachedData = localStorage.getItem("gitstory_cached_data");
    const currentRepo = localStorage.getItem("gitstory_current_repo");
    const moduleStatusCache = localStorage.getItem("gitstory_module_status");
    const storedKeys = Object.keys(localStorage).filter(k => k.startsWith('gitstory'));
    
    console.log("DASHBOARD: Loading from localStorage - currentRepo:", !!currentRepo, "cachedData:", !!cachedData, "moduleStatusCache:", !!moduleStatusCache);
    console.log("DASHBOARD: All gitstory keys:", storedKeys);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        console.log("DASHBOARD: Cached data keys:", Object.keys(parsed));
      } catch (e) {}
    }
    
    if (currentRepo) {
      try {
        const repo = JSON.parse(currentRepo);
        if (repo?.url) {
          // Extract repo name, removing any tree/branch/path
          let repoName = repo.url.replace('https://github.com/', '').replace(/\/$/, '');
          const treeIndex = repoName.indexOf('/tree/');
          if (treeIndex > 0) {
            repoName = repoName.substring(0, treeIndex);
          }
          setRepoUrl(repo.url);
          setSelectedRepo(repoName);
          console.log("DASHBOARD: Set selectedRepo:", repoName);
        }
      } catch (e) {
        console.log("DASHBOARD: Failed to load repo", e);
      }
    }
    
    if (cachedData) {
      try {
        const cached = JSON.parse(cachedData);
        
        if (cached.timeline) setTimelineData(cached.timeline);
        if (cached.hotzone) setHotzoneData(cached.hotzone);
        if (cached.stats) setStatsData(cached.stats);
        if (cached.collaborators) setCollaboratorsData(cached.collaborators);
        if (cached.lastSync) setLastSync(cached.lastSync);
        
        // Load module status from cache if available, or set to done if data exists
        if (moduleStatusCache) {
          const savedStatus = JSON.parse(moduleStatusCache);
          console.log("DASHBOARD: Loaded moduleStatusCache:", savedStatus);
          // Ensure we have 'done' status if data exists in cache
          const updatedStatus = {
            timeline: cached.timeline ? (savedStatus.timeline === 'loading' ? 'done' : savedStatus.timeline) : 'idle',
            hotzone: cached.hotzone ? (savedStatus.hotzone === 'loading' ? 'done' : savedStatus.hotzone) : 'idle',
            stats: cached.stats ? (savedStatus.stats === 'loading' ? 'done' : savedStatus.stats) : 'idle',
            collaborators: cached.collaborators ? (savedStatus.collaborators === 'loading' ? 'done' : savedStatus.collaborators) : 'idle'
          };
          console.log("DASHBOARD: Setting moduleStatus to:", updatedStatus);
          setModuleStatus(updatedStatus);
          localStorage.setItem("gitstory_module_status", JSON.stringify(updatedStatus));
        } else {
          console.log("DASHBOARD: No moduleStatusCache, setting all to done");
          setModuleStatus({
            timeline: cached.timeline ? 'done' : 'idle',
            hotzone: cached.hotzone ? 'done' : 'idle',
            stats: cached.stats ? 'done' : 'idle',
            collaborators: cached.collaborators ? 'done' : 'idle'
          });
        }
      } catch (e) {
        console.log("DASHBOARD: Failed to load cached data", e);
      }
    }
    
    // Load indexing status from localStorage
    const savedIndexingStatus = localStorage.getItem("gitstory_indexing_status");
    const savedIsIndexing = localStorage.getItem("gitstory_is_indexing");
    if (savedIndexingStatus) {
      setIndexingStatus(savedIndexingStatus);
    }
    if (savedIsIndexing === "true") {
      // Mark as indexing but don't auto-resume (user can click Enable AI Chat to resume)
      setIsIndexing(true);
    }
    
    setLoading(false);
  }, [mounted]);

  // Prevent infinite loop by not including getAccessToken in deps

  const handleTokenExpired = () => {
    logout();
    router.push('/login');
  };

  const fetchModuleData = async (token: string, repo: string) => {
    analysisCancelledRef.current = false;
    const initialStatus = { timeline: 'loading' as const, hotzone: 'loading' as const, stats: 'loading' as const, collaborators: 'loading' as const };
    setModuleStatus(initialStatus);
    localStorage.setItem("gitstory_module_status", JSON.stringify(initialStatus));
    
    let timelineData: any = null;
    let hotzoneData: any = null;
    let statsData: any = null;
    let collaboratorsData: any = null;
    
    try {
      timelineData = await api.getTimeline(token, repo, { onTokenExpired: handleTokenExpired }) as any;
      if (analysisCancelledRef.current) { console.log("DASHBOARD: Analysis cancelled after timeline"); return; }
      console.log("DASHBOARD: Timeline received - has commits:", !!timelineData?.commits, "count:", timelineData?.commits?.length);
      setTimelineData(timelineData as TimelineData);
      setModuleStatus(s => { 
        const newStatus = { ...s, timeline: 'done' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    } catch (e: any) {
      if (analysisCancelledRef.current) return;
      if (e.message.includes('expired')) {
        handleTokenExpired();
        return;
      }
      setModuleStatus(s => { 
        const newStatus = { ...s, timeline: 'error' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    }
    if (analysisCancelledRef.current) return;

    try {
      hotzoneData = await api.getHotzone(token, repo, { onTokenExpired: handleTokenExpired }) as any;
      if (analysisCancelledRef.current) return;
      console.log("DASHBOARD: Hotzone received - length:", hotzoneData?.length);
      console.log("DASHBOARD: First hotzone item:", hotzoneData?.[0]);
      setHotzoneData(hotzoneData as HotzoneData[]);
      setModuleStatus(s => { 
        const newStatus = { ...s, hotzone: 'done' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    } catch (e: any) {
      if (analysisCancelledRef.current) return;
      if (e.message.includes('expired')) {
        handleTokenExpired();
        return;
      }
      setModuleStatus(s => { 
        const newStatus = { ...s, hotzone: 'error' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    }
    if (analysisCancelledRef.current) return;

    try {
      statsData = await api.getStats(token, repo, { onTokenExpired: handleTokenExpired }) as any;
      if (analysisCancelledRef.current) return;
      console.log("DASHBOARD: Stats received - full:", JSON.stringify(statsData).slice(0, 200));
      console.log("DASHBOARD: total_commits type:", typeof statsData?.total_commits, "value:", statsData?.total_commits);
      console.log("DASHBOARD: health_score:", statsData?.health_score);
      console.log("DASHBOARD: active_contributors:", statsData?.active_contributors);
      setStatsData(statsData as StatsData);
      setModuleStatus(s => { 
        const newStatus = { ...s, stats: 'done' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    } catch (e: any) {
      if (analysisCancelledRef.current) return;
      if (e.message.includes('expired')) {
        handleTokenExpired();
        return;
      }
      setModuleStatus(s => { 
        const newStatus = { ...s, stats: 'error' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    }
    if (analysisCancelledRef.current) return;

    try {
      collaboratorsData = await api.getCollaborators(token, repo, { onTokenExpired: handleTokenExpired });
      if (analysisCancelledRef.current) return;
      setCollaboratorsData(collaboratorsData as CollaboratorsData);
      setModuleStatus(s => { 
        const newStatus = { ...s, collaborators: 'done' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    } catch (e: any) {
      if (analysisCancelledRef.current) return;
      if (e.message.includes('expired')) {
        handleTokenExpired();
        return;
      }
      setModuleStatus(s => { 
        const newStatus = { ...s, collaborators: 'error' as const };
        localStorage.setItem("gitstory_module_status", JSON.stringify(newStatus));
        return newStatus;
      });
    }
    if (analysisCancelledRef.current) return;

    // Save to localStorage using local variables (not stale state)
    const allData = {
      timeline: timelineData,
      hotzone: hotzoneData,
      stats: statsData,
      collaborators: collaboratorsData,
      lastSync: new Date().toISOString()
    };
    console.log("DASHBOARD: Saving to localStorage - timeline:", !!timelineData, "hotzone:", !!hotzoneData, "stats:", !!statsData, "collaborators:", !!collaboratorsData);
    localStorage.setItem("gitstory_cached_data", JSON.stringify(allData));
    console.log("DASHBOARD: Saved gitstory_cached_data successfully");
    setLastSync("Just now");
  };

  const handleRepoSubmit = async () => {
    if (!repoUrl.trim()) return;
    
    const token = getAccessToken();
    if (!token) return;

    let cleanUrl = repoUrl.trim();
    if (!cleanUrl.startsWith("http")) {
      cleanUrl = "https://github.com/" + cleanUrl;
    }
    cleanUrl = cleanUrl.replace(/\/$/, "");

    setSelectedRepo(cleanUrl);
    setLoading(true);
    setError(null);
    setCancelAnalysis(false);
    analysisCancelledRef.current = false;

    // Save repo URL for other pages to access
    localStorage.setItem("gitstory_current_repo", JSON.stringify({ url: cleanUrl }));
    console.log("DASHBOARD: Saved repo to localStorage:", cleanUrl);

    try {
      await fetchModuleData(token, cleanUrl);
      console.log("DASHBOARD: fetchModuleData completed");
    } catch (err: any) {
      console.error("Failed to fetch repo data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIndexRepo = async (resume = false) => {
    if (!selectedRepo) return;
    
    const token = getAccessToken();
    if (!token) return;

    let jobId = localStorage.getItem("gitstory_indexing_job_id");
    
    if (resume && jobId) {
      setIsIndexing(true);
      setIndexingStatus("Resuming indexing...");
      checkIndexingStatus(token, jobId);
      return;
    }

    setIsIndexing(true);
    setIndexingStatus("Starting indexing...");
    localStorage.setItem("gitstory_is_indexing", "true");

    try {
      const result = await api.indexRepo(token, selectedRepo, false);
      jobId = result.job_id;
      localStorage.setItem("gitstory_indexing_job_id", jobId);
      
      setIndexingStatus("Indexing in progress...");
      
      checkIndexingStatus(token, jobId);
    } catch (err: any) {
      setIndexingStatus(`Error: ${err.message}`);
      setIsIndexing(false);
      localStorage.setItem("gitstory_is_indexing", "false");
    }
  };

  const checkIndexingStatus = (token: string, jobId: string) => {
    const checkStatus = async () => {
      if (!isIndexing) return;
      try {
        const status = await api.getIndexStatus(token, jobId);
        if (status.status === "done") {
          setIndexingStatus("Indexing complete! Chat is now enabled.");
          setIsIndexing(false);
          localStorage.setItem("gitstory_is_indexing", "false");
          localStorage.setItem("gitstory_indexing_status", "Indexing complete! Chat is now enabled.");
        } else if (status.status === "error") {
          setIndexingStatus(`Indexing failed: ${status.error}`);
          setIsIndexing(false);
          localStorage.setItem("gitstory_is_indexing", "false");
          localStorage.setItem("gitstory_indexing_status", `Indexing failed: ${status.error}`);
        } else {
          localStorage.setItem("gitstory_indexing_status", "Indexing in progress...");
          setTimeout(checkStatus, 3000);
        }
      } catch {
        setTimeout(checkStatus, 3000);
      }
    };
    setTimeout(checkStatus, 2000);
  };

  const cancelIndexing = () => {
    setIsIndexing(false);
    setIndexingStatus("Indexing cancelled.");
    localStorage.setItem("gitstory_is_indexing", "false");
    localStorage.setItem("gitstory_indexing_status", "Indexing cancelled.");
    localStorage.removeItem("gitstory_indexing_job_id");
  };

  if (!mounted) {
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
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-1">Overview</h1>
            <p className="text-[10px] text-[#484F58] font-bold tracking-tighter uppercase">
              V1.0 Obsidian Chronograph — Repository Analytics
            </p>
          </div>

          <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#484F58]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="Paste GitHub repo URL (e.g., facebook/react)"
                  className="w-full bg-[#08090D] border border-[#1F2937] rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#484F58] focus:outline-none focus:border-[#00E6A4]"
                  onKeyDown={(e) => e.key === "Enter" && handleRepoSubmit()}
                />
              </div>
              <button
                onClick={handleRepoSubmit}
                disabled={!repoUrl.trim()}
                className="bg-[#00E6A4] text-[#08090D] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#00CC8E] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                Analyze
              </button>
            </div>

            {selectedRepo && (
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-[#00E6A4]">
                    {moduleStatus.timeline === 'loading' || moduleStatus.hotzone === 'loading' || moduleStatus.stats === 'loading' || moduleStatus.collaborators === 'loading' ? (
                      <span className="inline-block w-4 h-4 border-2 border-[#00E6A4] border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                    )}
                    Analyzing: {selectedRepo}
                  </span>
                  {(moduleStatus.timeline === 'loading' || moduleStatus.hotzone === 'loading' || moduleStatus.stats === 'loading' || moduleStatus.collaborators === 'loading') && (
                    <button 
                      onClick={() => {
                        analysisCancelledRef.current = true;
                        setModuleStatus({ timeline: 'idle', hotzone: 'idle', stats: 'idle', collaborators: 'idle' });
                        localStorage.setItem("gitstory_module_status", JSON.stringify({ timeline: 'idle', hotzone: 'idle', stats: 'idle', collaborators: 'idle' }));
                      }}
                      className="text-xs text-[#EF4444] hover:text-[#FF6B6B] cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00E6A4] transition-all duration-500 rounded-full"
                      style={{
                        width: `${((moduleStatus.timeline === 'done' ? 1 : 0) + 
                                (moduleStatus.hotzone === 'done' ? 1 : 0) + 
                                (moduleStatus.stats === 'done' ? 1 : 0) + 
                                (moduleStatus.collaborators === 'done' ? 1 : 0)) * 25}%`
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#484F58] whitespace-nowrap">
                    {Math.round(((moduleStatus.timeline === 'done' ? 1 : 0) + 
                                (moduleStatus.hotzone === 'done' ? 1 : 0) + 
                                (moduleStatus.stats === 'done' ? 1 : 0) + 
                                (moduleStatus.collaborators === 'done' ? 1 : 0)) * 25)}%
                  </span>
                </div>
                <div className="flex gap-4 text-xs mt-2">
                  <div className={`flex items-center gap-1 ${moduleStatus.timeline === 'done' ? 'text-[#00E6A4]' : moduleStatus.timeline === 'error' ? 'text-[#EF4444]' : 'text-[#484F58]'}`}>
                    {moduleStatus.timeline === 'done' ? '✓' : '○'}
                    Timeline
                  </div>
                  <div className={`flex items-center gap-1 ${moduleStatus.hotzone === 'done' ? 'text-[#00E6A4]' : moduleStatus.hotzone === 'error' ? 'text-[#EF4444]' : 'text-[#484F58]'}`}>
                    {moduleStatus.hotzone === 'done' ? '✓' : '○'}
                    Hotzone
                  </div>
                  <div className={`flex items-center gap-1 ${moduleStatus.stats === 'done' ? 'text-[#00E6A4]' : moduleStatus.stats === 'error' ? 'text-[#EF4444]' : 'text-[#484F58]'}`}>
                    {moduleStatus.stats === 'done' ? '✓' : '○'}
                    Stats
                  </div>
                  <div className={`flex items-center gap-1 ${moduleStatus.collaborators === 'done' ? 'text-[#00E6A4]' : moduleStatus.collaborators === 'error' ? 'text-[#EF4444]' : 'text-[#484F58]'}`}>
                    {moduleStatus.collaborators === 'done' ? '✓' : '○'}
                    Collaborators
                  </div>
                </div>
                {moduleStatus.timeline !== 'loading' && !isIndexing && (
                  <button
                    onClick={() => handleIndexRepo()}
                    className="mt-3 bg-[#8B5CF6] text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#7C3AED]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Enable AI Chat
                  </button>
                )}
                {isIndexing && (
                  <div className="mt-3 flex items-center gap-2 text-[#8B5CF6]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{indexingStatus}</span>
                    <button 
                      onClick={cancelIndexing}
                      className="text-xs text-[#EF4444] hover:text-[#FF6B6B] cursor-pointer ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg text-[#EF4444] text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Total Commits" 
              value={(statsData && statsData.total_commits) ? String(statsData.total_commits) : "--"} 
              delta={moduleStatus.stats === 'done' ? "+12.4%" : undefined}
              color="#00E6A4" 
            />
            <MetricCard 
              title="Active Contributors" 
              value={(statsData && statsData.active_contributors) ? String(statsData.active_contributors) : "--"} 
              badge="Active Now" 
              color="#8B5CF6" 
            />
            <MetricCard 
              title="Code Health Score" 
              value={(statsData && statsData.health_score) ? `${statsData.health_score}%` : "--"} 
              delta={moduleStatus.stats === 'done' ? "↑ 2.1% this week" : undefined}
              color="#00E6A4" 
            />
            <MetricCard title="Last Sync" value={formatLastSync(lastSync)} badge="SECURE LINK" color="#D97706" />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                <span className="text-[10px] font-bold text-[#00E6A4] uppercase tracking-widest cursor-pointer">View All Stream</span>
              </div>
              
              {(timelineData && (timelineData as any).commits?.length > 0) ? (timelineData as any).commits.slice(0, 4).map((commit: any, i: number) => (
                <ActivityItem 
                  key={commit.hash || commit.msg}
                  title={(commit.msg || commit.message || "Commit").slice(0, 50)}
                  desc={commit.author || "Unknown"}
                  tag="#commit"
                  time={commit.date || commit.author_date ? new Date(commit.date || commit.author_date).toLocaleTimeString() : "--"}
                  color={["#00E6A4", "#8B5CF6", "#D97706", "#EF4444"][i % 4]}
                />
              )) : (
                mockActivity.map((activity: any, i: number) => (
                  <ActivityItem 
                    key={i}
                    title={activity.title}
                    desc={activity.desc}
                    tag={activity.tag}
                    time={activity.time}
                    color={activity.color}
                  />
                ))
              )}
            </div>

            <div className="col-span-4 flex flex-col gap-6">
              {statsData && (
                <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
                  <h3 className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-6">Language Distribution</h3>
                  <div className="space-y-3">
                    {statsData.language_distribution?.map((lang, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-xs text-[#C9D1D9] flex-1">{lang.name}</span>
                        <span className="text-xs font-bold text-[#484F58]">{lang.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-6">
                <h3 className="text-[10px] font-bold text-[#484F58] uppercase tracking-widest mb-6">Active Hotzones</h3>
                <div className="space-y-6">
                  {hotzoneData && hotzoneData.length > 0 ? (
                    hotzoneData.slice(0, 5).map((hz: any, i: number) => (
                      <HotzoneRow 
                        key={i}
                        label={hz.path || hz.name || "Unknown"}
                        status={hz.total_commits > 10 ? "CRITICAL" : hz.total_commits > 5 ? "HEAVY" : "NOMINAL"}
                        dotColor={hz.total_commits > 10 ? "#EF4444" : hz.total_commits > 5 ? "#D97706" : "#00E6A4"}
                      />
                    ))
                  ) : (
                    <>
                      <HotzoneRow label="/api/v1/auth" status="CRITICAL" dotColor="#EF4444" />
                      <HotzoneRow label="/core/rendering" status="HEAVY" dotColor="#D97706" />
                      <HotzoneRow label="/ui/obsidian" status="NOMINAL" dotColor="#00E6A4" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    }>
      <DashboardContent />
    </Suspense>
  );
}

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