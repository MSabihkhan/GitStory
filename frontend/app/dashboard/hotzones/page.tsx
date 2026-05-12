"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

// ─── Types matching backend response ──────────────────────────────────────────
// Backend returns: { name, path, churn_score, total_commits, last_modified }
interface ChurnFile {
  name: string;
  path: string;
  churn_score: number;
  total_commits: number;
  last_modified: string;
}

// ─── Color helpers ────────────────────────────────────────────────────────────
function getHeatColor(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio > 0.75) return "#EF4444"; // Critical
  if (ratio > 0.50) return "#F97316"; // High
  if (ratio > 0.25) return "#8B5CF6"; // Medium
  return "#10B981";                    // Stable
}

function getSeverityLabel(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio > 0.75) return "CRITICAL";
  if (ratio > 0.50) return "HIGH";
  if (ratio > 0.25) return "MEDIUM";
  return "STABLE";
}

function getSeverityBadgeColor(label: string): { bg: string; border: string; text: string } {
  switch (label) {
    case "CRITICAL": return { bg: "#2D1515", border: "#EF4444", text: "#EF4444" };
    case "HIGH":     return { bg: "#2D1F15", border: "#F97316", text: "#F97316" };
    case "MEDIUM":   return { bg: "#1F1530", border: "#8B5CF6", text: "#8B5CF6" };
    default:         return { bg: "#0D2818", border: "#10B981", text: "#10B981" };
  }
}

// Extract directory from path for grouping
function getDirectory(path: string): string {
  const parts = path.replace(/\\/g, "/").split("/");
  if (parts.length <= 1) return "root";
  return parts.slice(0, -1).join("/");
}

// ─── Treemap Component ────────────────────────────────────────────────────────
function Treemap({ data, maxScore }: { data: ChurnFile[]; maxScore: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;
    const container = containerRef.current;

    function render() {
      container.innerHTML = "";
      const width = container.clientWidth;
      const height = container.clientHeight || 560;

      const treemapItems = data.map((f) => ({
        name: f.name,
        fullPath: f.path,
        value: f.churn_score,
        commits: f.total_commits,
        color: getHeatColor(f.churn_score, maxScore),
      }));

      const hierarchyData = {
        name: "root",
        children: treemapItems,
      };

      const root = d3
        .hierarchy(hierarchyData)
        .sum((d: any) => d.value)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      d3.treemap<any>()
        .size([width, height])
        .padding(4)
        .round(true)(root);

      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("font-family", "system-ui, sans-serif");

      const leaves = root.leaves();

      // Tooltip div
      const tooltip = d3
        .select(container)
        .append("div")
        .style("position", "absolute")
        .style("background", "#161B22")
        .style("border", "1px solid #30363D")
        .style("border-radius", "8px")
        .style("padding", "10px 14px")
        .style("font-size", "12px")
        .style("color", "#E6EDF3")
        .style("pointer-events", "none")
        .style("opacity", "0")
        .style("z-index", "50")
        .style("transition", "opacity 0.15s");

      leaves.forEach((leaf: any) => {
        const g = svg.append("g").attr("transform", `translate(${leaf.x0},${leaf.y0})`);
        const w = leaf.x1 - leaf.x0;
        const h = leaf.y1 - leaf.y0;

        g.append("rect")
          .attr("width", w)
          .attr("height", h)
          .attr("fill", leaf.data.color)
          .attr("fill-opacity", 0.7)
          .attr("rx", 6)
          .style("cursor", "pointer")
          .on("mouseover", function (event: any) {
            d3.select(this).attr("fill-opacity", 1);
            tooltip
              .style("opacity", "1")
              .html(
                `<div style="font-weight:700;margin-bottom:4px">${leaf.data.fullPath || leaf.data.name}</div>` +
                `<div style="color:#8B949E">Churn: <span style="color:${leaf.data.color};font-weight:700">${leaf.data.value}</span> lines</div>` +
                `<div style="color:#8B949E">Commits: <span style="color:#E6EDF3;font-weight:600">${leaf.data.commits}</span></div>`
              );
          })
          .on("mousemove", function (event: any) {
            const rect = container.getBoundingClientRect();
            tooltip
              .style("left", `${event.clientX - rect.left + 12}px`)
              .style("top", `${event.clientY - rect.top - 10}px`);
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill-opacity", 0.7);
            tooltip.style("opacity", "0");
          });

        if (w > 60 && h > 35) {
          const label = leaf.data.name.length > Math.floor(w / 7)
            ? leaf.data.name.slice(0, Math.floor(w / 7)) + "…"
            : leaf.data.name;
          g.append("text")
            .attr("x", 10)
            .attr("y", 22)
            .text(label)
            .attr("fill", "rgba(255,255,255,0.9)")
            .attr("font-size", w > 140 ? "12px" : "10px")
            .attr("font-weight", "600")
            .attr("letter-spacing", "0.04em")
            .style("pointer-events", "none");
        }
        if (w > 60 && h > 55) {
          g.append("text")
            .attr("x", 10)
            .attr("y", 38)
            .text(`${leaf.data.value} churn`)
            .attr("fill", "rgba(255,255,255,0.5)")
            .attr("font-size", "9px")
            .attr("font-weight", "500")
            .style("pointer-events", "none");
        }
      });
    }

    render();
    const resizeObs = new ResizeObserver(render);
    resizeObs.observe(container);
    return () => resizeObs.disconnect();
  }, [data, maxScore]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HotzonesPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<ChurnFile[]>([]);
  const [repoName, setRepoName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchHotzones() {
      if (!isAuthenticated) { setLoading(false); return; }
      const token = getAccessToken();
      if (!token) { setLoading(false); return; }

      try {
        const stored = localStorage.getItem("gitstory_current_repo");
        const cachedData = localStorage.getItem("gitstory_cached_data");
        
        if (!stored) {
          setError("No repository selected. Go to the Dashboard and analyze a repo first.");
          setLoading(false);
          return;
        }

        const repo = JSON.parse(stored);
        if (!repo?.url) {
          setError("Invalid repository data.");
          setLoading(false);
          return;
        }

        const name = repo.url.replace(/\/$/, "").split("/").pop()?.replace(".git", "") || "repo";
        setRepoName(name);

        // Only use cached data - don't fetch automatically
        if (!cachedData) {
          setError("No data available. Analyze a repo from the Dashboard first.");
          setLoading(false);
          return;
        }

        const cached = JSON.parse(cachedData);
        if (cached.hotzone && cached.hotzone.length > 0) {
          console.log("HOTZONES: Using cached data");
          const sorted = [...cached.hotzone].sort((a: any, b: any) => b.churn_score - a.churn_score);
          setFiles(sorted);
        } else {
          setError("No churn data available. Analyze a repo from the Dashboard first.");
        }
      } catch (err: any) {
        console.error("Failed to fetch hotzones:", err);
        setError(err.message || "Failed to load hotzone data");
      } finally {
        setLoading(false);
      }
    }

    fetchHotzones();
  }, [mounted]);

  if (loading) {
    return (
      <DashboardShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0D1117" }}>
          <Loader2 className="w-8 h-8 text-[#10B981] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  const maxScore = files.length > 0 ? files[0].churn_score : 1;
  const totalChurn = files.reduce((sum, f) => sum + f.churn_score, 0);
  const totalCommits = files.reduce((sum, f) => sum + f.total_commits, 0);
  const topFiles = files.slice(0, 6);

  // Risk score: percentage of churn in top 20% of files
  const top20Count = Math.max(1, Math.ceil(files.length * 0.2));
  const top20Churn = files.slice(0, top20Count).reduce((sum, f) => sum + f.churn_score, 0);
  const riskScore = totalChurn > 0 ? Math.round((1 - top20Churn / totalChurn) * 100) : 100;
  const riskLabel = riskScore > 70 ? "LOW" : riskScore > 40 ? "MODERATE" : "CRITICAL";
  const riskBadge = getSeverityBadgeColor(riskScore > 70 ? "STABLE" : riskScore > 40 ? "MEDIUM" : "CRITICAL");

  // Unique directories for the legend
  const dirColors: Record<string, string> = {};
  const dirPalette = ["#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#06B6D4", "#EC4899"];
  files.forEach((f) => {
    const dir = getDirectory(f.path);
    if (!(dir in dirColors)) {
      dirColors[dir] = dirPalette[Object.keys(dirColors).length % dirPalette.length];
    }
  });
  const topDirs = Object.entries(dirColors).slice(0, 5);

  return (
    <DashboardShell>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          background: "#0D1117",
          color: "#E6EDF3",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* ── MAIN TREEMAP AREA ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "28px 24px 0 24px",
              overflow: "hidden",
            }}
          >
            {/* Title block */}
            <div style={{ marginBottom: 12 }}>
              <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.1, color: "#E6EDF3", margin: 0, textTransform: "uppercase" }}>
                STRUCTURAL
              </h1>
              <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.01em", lineHeight: 1.1, color: "#10B981", margin: 0, textTransform: "uppercase" }}>
                HOTZONES
              </h1>
            </div>

            {/* Subtitle */}
            <p style={{ fontSize: 13, color: "#8B949E", margin: "0 0 20px 0", lineHeight: 1.6 }}>
              {error ? (
                <span style={{ color: "#F85149" }}>{error}</span>
              ) : (
                <>
                  Analyzing code churn across <span style={{ color: "#E6EDF3", fontWeight: 600 }}>{files.length}</span> files
                  in <span style={{ color: "#10B981", fontWeight: 600 }}>{repoName}</span>.
                  <br />
                  Size indicates churn volume. Color indicates severity.
                </>
              )}
            </p>

            {/* Treemap */}
            <div style={{ flex: 1, minHeight: 0 }}>
              {files.length > 0 ? (
                <Treemap data={files} maxScore={maxScore} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#484F58" }}>
                  No data to display
                </div>
              )}
            </div>

            {/* Bottom legend */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderTop: "1px solid #21262D",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, color: "#8B949E", fontWeight: 600, letterSpacing: "0.06em" }}>
                  SEVERITY:
                </span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {[
                    { color: "#10B981", label: "Stable" },
                    { color: "#8B5CF6", label: "Medium" },
                    { color: "#F97316", label: "High" },
                    { color: "#EF4444", label: "Critical" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                      <span style={{ fontSize: 10, color: "#8B949E" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {topDirs.map(([dir, color]) => (
                  <div key={dir} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                    <span style={{ fontSize: 10, color: "#8B949E" }}>{dir.length > 20 ? "…" + dir.slice(-18) : dir}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div
            style={{
              width: 480,
              background: "#161B22",
              borderLeft: "1px solid #21262D",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, padding: "28px 28px 0 28px", overflowY: "auto" }}>

              {/* Global Risk Index header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#8B949E", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  GLOBAL RISK INDEX
                </span>
                <div
                  style={{
                    background: riskBadge.bg,
                    border: `1px solid ${riskBadge.border}`,
                    borderRadius: 20,
                    padding: "3px 14px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: riskBadge.text,
                    letterSpacing: "0.08em",
                  }}
                >
                  {riskLabel}
                </div>
              </div>

              {/* Score */}
              <div style={{ fontSize: 64, fontWeight: 800, color: "#10B981", lineHeight: 1, marginBottom: 8, letterSpacing: "-0.02em" }}>
                {riskScore}
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, background: "#21262D", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ width: `${riskScore}%`, height: "100%", background: "#10B981", borderRadius: 2, transition: "width 0.8s ease" }} />
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  gap: 40,
                  paddingBottom: 20,
                  borderBottom: "1px solid #21262D",
                  marginBottom: 20,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.06em", marginBottom: 4 }}>TOTAL CHURN</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>
                    {totalChurn > 1000 ? `${(totalChurn / 1000).toFixed(1)}k` : totalChurn}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.06em", marginBottom: 4 }}>TOTAL COMMITS</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>
                    {totalCommits > 1000 ? `${(totalCommits / 1000).toFixed(1)}k` : totalCommits}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.06em", marginBottom: 4 }}>FILES</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>{files.length}</div>
                </div>
              </div>

              {/* Top Hotspots */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 11, color: "#8B949E", fontWeight: 600, letterSpacing: "0.08em" }}>
                  TOP HOTSPOTS
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {topFiles.map((f, i) => {
                  const color = getHeatColor(f.churn_score, maxScore);
                  const severity = getSeverityLabel(f.churn_score, maxScore);
                  return (
                    <div
                      key={f.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 0",
                        borderBottom: i < topFiles.length - 1 ? "1px solid #21262D" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            width: 3,
                            height: 36,
                            borderRadius: 2,
                            background: color,
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {f.name}
                          </div>
                          <div style={{ fontSize: 11, color: "#8B949E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {f.path} · {f.total_commits} commits
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>
                          {f.churn_score > 1000 ? `${(f.churn_score / 1000).toFixed(1)}k` : f.churn_score}
                        </div>
                        <div style={{ fontSize: 9, color: "#8B949E", letterSpacing: "0.06em", marginTop: 2 }}>
                          CHURN
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Summary footer ── */}
            <div style={{ padding: "20px 28px", flexShrink: 0, borderTop: "1px solid #21262D" }}>
              <div style={{ fontSize: 11, color: "#8B949E", lineHeight: 1.6 }}>
                <span style={{ color: "#10B981", fontWeight: 700 }}>{files.filter((f) => getHeatColor(f.churn_score, maxScore) === "#10B981").length}</span> stable ·{" "}
                <span style={{ color: "#8B5CF6", fontWeight: 700 }}>{files.filter((f) => getHeatColor(f.churn_score, maxScore) === "#8B5CF6").length}</span> medium ·{" "}
                <span style={{ color: "#F97316", fontWeight: 700 }}>{files.filter((f) => getHeatColor(f.churn_score, maxScore) === "#F97316").length}</span> high ·{" "}
                <span style={{ color: "#EF4444", fontWeight: 700 }}>{files.filter((f) => getHeatColor(f.churn_score, maxScore) === "#EF4444").length}</span> critical
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
