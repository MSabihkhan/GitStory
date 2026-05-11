"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

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
  return (
    <DashboardShell>
      <div style={{ display: "flex", flexDirection: "column", backgroundColor: C.bg, fontFamily: "sans-serif", overflow: "hidden" }}>
      
      {/* SCROLLABLE CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 60px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, margin: "0 0 6px 0" }}>Timeline</h1>
        <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 48 }}>
          Visualizing the story of <span style={{ color: C.green }}>obsidian-core-v2</span> · 1,248 commits.
        </p>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Vertical spine line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, backgroundColor: C.dotLine, transform: "translateX(-50%)" }} />

          {/* PHASE 1 */}
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 64, position: "relative" }}>
            <div style={{ flex: 1, paddingRight: 40 }}><Card1 /></div>
            <div style={{ width: 40, display: "flex", justifyContent: "center", paddingTop: 30 }}><Dot color={C.teal} /></div>
            <div style={{ flex: 1, paddingLeft: 40, paddingTop: 30 }}><PhaseLabel text="PHASE 01 / INFRASTRUCTURE" /></div>
          </div>

          {/* PHASE 2 */}
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 64, position: "relative" }}>
            <div style={{ flex: 1, paddingRight: 40, textAlign: "right", paddingTop: 30 }}><PhaseLabel text="PHASE 02 / REFINEMENT" /></div>
            <div style={{ width: 40, display: "flex", justifyContent: "center", paddingTop: 30 }}><Dot color={C.purple} /></div>
            <div style={{ flex: 1, paddingLeft: 40 }}><Card2 /></div>
          </div>

          {/* PHASE 3 */}
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 64, position: "relative" }}>
            <div style={{ flex: 1, paddingRight: 40 }}><Card3 /></div>
            <div style={{ width: 40, display: "flex", justifyContent: "center", paddingTop: 30 }}><Dot color={C.amber} /></div>
            <div style={{ flex: 1, paddingLeft: 40, paddingTop: 30 }}><PhaseLabel text="PHASE 03 / OPTIMIZATION" /></div>
          </div>
        </div>
      </div>

      <BottomStatsBar />
      </div>
    </DashboardShell>
  );
}