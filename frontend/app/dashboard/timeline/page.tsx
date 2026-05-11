"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { api } from "@/lib/api";

interface TimelineStory {
  date: string;
  category: string;
  title: string;
  narrative: string;
  commits: number;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
}

interface TimelineData {
  repo_name: string;
  total_commits: number;
  benchmarks: { name: string; value: string }[];
  stories: TimelineStory[];
}

const mockTimelineData: TimelineData = {
  repo_name: "obsidian-core-v2",
  total_commits: 1248,
  benchmarks: [
    { name: "Refactor Density", value: "42%" },
    { name: "Feature Velocity", value: "3.2x" },
    { name: "Bug Resolution", value: "94%" },
    { name: "Tech Debt", value: "12%" },
  ],
  stories: [
    { date: "Oct 24, 2023", category: "ARCHITECTURAL PIVOT", title: "The Genesis of Core-V2", narrative: "The transition began with decoupling of the rendering engine. AI analysis suggests this move reduced build complexity by 42%.", commits: 47, filesChanged: 128, linesAdded: 4820, linesRemoved: 3240 },
    { date: "Nov 12, 2023", category: "THE GREAT REFACTOR", title: "Visual Synthesis Module", narrative: "Complete rewrite of the authentication module using JWT tokens with refresh token rotation.", commits: 23, filesChanged: 45, linesAdded: 2150, linesRemoved: 1890 },
    { date: "Dec 05, 2023", category: "CONFLICT RESOLUTION", title: "The Latency Crisis", narrative: "Emergency patch for critical performance issue. Response time improved from 142ms to 8ms.", commits: 5, filesChanged: 8, linesAdded: 340, linesRemoved: 180 },
  ],
};

/* ─────────────────────────────────────────────
   EXACT colours extracted from screenshot
───────────────────────────────────────────── */
const C = {
  bg: "#0D1117",
  navBorder: "#21262D",
  cardBg: "#161B22",
  cardBorder: "#21262D",
  teal: "#14B8A6",
  purple: "#7C3AED",
  purpleCardBg: "#161B2E",
  purpleCardBorder: "#3D2F6E",
  amber: "#D97706",
  green: "#22C55E",
  red: "#EF4444",
  textPrimary: "#E6EDF3",
  textSecondary: "#8B949E",
  textMuted: "#6E7681",
  dotLine: "#2D333B",
};

/* ─────────────────────────────────────────────
   UI COMPONENTS
───────────────────────────────────────────── */
function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
        flexShrink: 0,
        position: "relative",
        zIndex: 2,
        boxShadow: `0 0 10px ${color}44`,
      }}
    />
  );
}

function PhaseLabel({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: C.textMuted,
        textTransform: "uppercase" as const,
      }}
    >
      {text}
    </span>
  );
}

/* ─────────────────────────────────────────────
   CARDS
───────────────────────────────────────────── */
function Card1() {
  return (
    <div style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ height: 2, backgroundColor: C.teal }} />
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ backgroundColor: C.teal, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20 }}>
            ARCHITECTURAL PIVOT
          </span>
          <span style={{ fontSize: 12, color: C.textSecondary }}>Oct 24, 2023</span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>The Genesis of Core-V2</h3>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>
          The transition began with decoupling of the rendering engine. AI analysis suggests this move reduced build complexity by 42%.
        </p>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div style={{ backgroundColor: C.purpleCardBg, border: `1px solid ${C.purpleCardBorder}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ height: 2, backgroundColor: C.purple }} />
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ color: "#A78BFA", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.purple}` }}>
            THE GREAT REFACTOR
          </span>
          <span style={{ fontSize: 12, color: C.textSecondary }}>Nov 12, 2023</span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>Visual Synthesis Module</h3>
        <div style={{ marginTop: 20, backgroundColor: "#0D1117", border: `1px solid #30363D`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: C.textSecondary }}>
          git commit -m "feat: unified obsidian shader system"
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ height: 2, backgroundColor: C.amber }} />
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ color: C.amber, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.amber}` }}>
            CONFLICT RESOLUTION
          </span>
          <span style={{ fontSize: 12, color: C.textSecondary }}>Dec 05, 2023</span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>The Latency Crisis</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24 }}>
          <span style={{ backgroundColor: C.red, color: "#fff", fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 6 }}>142ms</span>
          <ChevronRight size={14} color={C.textSecondary} />
          <span style={{ backgroundColor: C.green, color: "#fff", fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 6 }}>8ms</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function BottomStatsBar() {
  const stats = [
    { label: "Story Velocity", value: "12.4x" },
    { label: "Active Narratives", value: "3" },
    { label: "Collaborators", value: "18" },
    { label: "Timeline Status", value: "LIVE ANALYSIS", status: true },
  ];

  return (
    <div style={{ height: 80, backgroundColor: C.bg, borderTop: `1px solid ${C.navBorder}`, display: "flex" }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 32, borderRight: i < stats.length - 1 ? `1px solid ${C.navBorder}` : "none" }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: C.textMuted, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</span>
          {s.status ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#162112", border: `1px solid #2ea043`, borderRadius: 20, padding: "5px 14px", alignSelf: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{s.value}</span>
            </div>
          ) : (
            <span style={{ fontSize: 26, fontWeight: 700, color: C.textPrimary }}>{s.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN RENDER
 ───────────────────────────────────────────── */
export default function TimelinePage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);

  useEffect(() => {
    async function fetchTimeline() {
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
        const data = await api.getTimeline(token, "https://github.com/test/repo");
        setTimelineData(data as TimelineData);
      } catch (err) {
        console.error("Failed to fetch timeline:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, [isAuthenticated, getAccessToken]);

  const displayData = timelineData || mockTimelineData;

  if (loading) {
    return (
      <DashboardShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", backgroundColor: C.bg }}>
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: C.bg, fontFamily: "sans-serif", overflow: "hidden" }}>
      
      {/* SCROLLABLE CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 60px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, margin: "0 0 6px 0" }}>Timeline</h1>
        <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 48 }}>
          Visualizing the story of <span style={{ color: C.green }}>{displayData.repo_name}</span> · {displayData.total_commits.toLocaleString()} commits.
        </p>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Vertical spine line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, backgroundColor: C.dotLine, transform: "translateX(-50%)" }} />

          {/* Dynamic stories from API or fallback to mock */}
          {displayData.stories.slice(0, 3).map((story, index) => {
            const colors = [C.teal, C.purple, C.amber];
            const phases = ["PHASE 01 / INFRASTRUCTURE", "PHASE 02 / REFINEMENT", "PHASE 03 / OPTIMIZATION"];
            const isEven = index % 2 === 1;
            
            return (
              <div key={index} style={{ display: "flex", alignItems: "flex-start", marginBottom: 64, position: "relative" }}>
                {isEven ? (
                  <>
                    <div style={{ flex: 1, paddingRight: 40, textAlign: "right", paddingTop: 30 }}>
                      <PhaseLabel text={phases[index]} />
                    </div>
                    <div style={{ width: 40, display: "flex", justifyContent: "center", paddingTop: 30 }}><Dot color={colors[index]} /></div>
                    <div style={{ flex: 1, paddingLeft: 40 }}>
                      <div style={{ backgroundColor: index === 1 ? C.purpleCardBg : C.cardBg, border: `1px solid ${index === 1 ? C.purpleCardBorder : C.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ height: 2, backgroundColor: colors[index] }} />
                        <div style={{ padding: "20px 24px 24px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                            <span style={{ color: index === 1 ? "#A78BFA" : colors[index], fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20, border: `1px solid ${colors[index]}` }}>
                              {story.category}
                            </span>
                            <span style={{ fontSize: 12, color: C.textSecondary }}>{story.date}</span>
                          </div>
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>{story.title}</h3>
                          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{story.narrative}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ flex: 1, paddingRight: 40 }}>
                      <div style={{ backgroundColor: index === 1 ? C.purpleCardBg : C.cardBg, border: `1px solid ${index === 1 ? C.purpleCardBorder : C.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
                        <div style={{ height: 2, backgroundColor: colors[index] }} />
                        <div style={{ padding: "20px 24px 24px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                            <span style={{ backgroundColor: colors[index], color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20 }}>
                              {story.category}
                            </span>
                            <span style={{ fontSize: 12, color: C.textSecondary }}>{story.date}</span>
                          </div>
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>{story.title}</h3>
                          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>{story.narrative}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 40, display: "flex", justifyContent: "center", paddingTop: 30 }}><Dot color={colors[index]} /></div>
                    <div style={{ flex: 1, paddingLeft: 40, paddingTop: 30 }}><PhaseLabel text={phases[index]} /></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomStatsBar />
      </div>
    </DashboardShell>
  );
}