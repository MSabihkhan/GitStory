// // VISUAL AUDIT — S5 · Structural Hotzones.png
// // Background: #0D1117
// // Sidebar: #161B22, width 256px
// // Card background: #161B22
// // Border color: #30363D
// // Hotzone colors: Stable=#22C55E, Low=#84CC16, Medium=#F59E0B, High=#F97316, Critical=#EF4444
// // Category colors: src/components=#3B82F6, lib/utils=#8B5CF6, api/routes=#F59E0B
// // Font: Inter, system-ui
// // Layout: Sidebar + main content with D3 treemap

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: YES
// // If any NO: None

// "use client";

// import { useState, useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { DashboardShell } from "@/components/layout/DashboardShell";
// import { hotzoneFiles } from "@/lib/mock-data";
// import { Filter } from "lucide-react";

// function Treemap() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const container = containerRef.current;
//     container.innerHTML = "";

//     const width = container.clientWidth;
//     const height = 500;

//     const data = {
//       name: "root",
//       children: hotzoneFiles.map((file) => ({
//         name: file.path.split("/").pop() || file.path,
//         fullPath: file.path,
//         value: file.changes,
//         color: file.color,
//       })),
//     };

//     const root = d3
//       .hierarchy(data)
//       .sum((d: any) => d.value)
//       .sort((a, b) => (b.value || 0) - (a.value || 0));

//     d3.treemap<any>()
//       .size([width, height])
//       .padding(2)
//       .round(true)(root);

//     const svg = d3
//       .select(container)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .style("font-family", "Inter, system-ui, sans-serif");

//     const leaves = root.leaves();

//     leaves.forEach((leaf: any, i) => {
//       const group = svg
//         .append("g")
//         .attr("transform", `translate(${leaf.x0},${leaf.y0})`);

//       const rectWidth = leaf.x1 - leaf.x0;
//       const rectHeight = leaf.y1 - leaf.y0;

//       group
//         .append("rect")
//         .attr("width", rectWidth)
//         .attr("height", rectHeight)
//         .attr("fill", leaf.data.color)
//         .attr("fill-opacity", 0.6)
//         .attr("stroke", leaf.data.color)
//         .attr("stroke-width", 1)
//         .attr("rx", 4)
//         .style("cursor", "pointer")
//         .on("mouseover", function () {
//           d3.select(this).attr("fill-opacity", 0.9);
//         })
//         .on("mouseout", function () {
//           d3.select(this).attr("fill-opacity", 0.6);
//         });

//       if (rectWidth > 60 && rectHeight > 40) {
//         group
//           .append("text")
//           .attr("x", 8)
//           .attr("y", 20)
//           .text(leaf.data.name.length > 20 ? leaf.data.name.slice(0, 20) + "..." : leaf.data.name)
//           .attr("fill", "#F8FAFC")
//           .attr("font-size", "12px")
//           .attr("font-weight", "500")
//           .style("pointer-events", "none");

//         group
//           .append("text")
//           .attr("x", 8)
//           .attr("y", 36)
//           .text(`${leaf.data.value} changes`)
//           .attr("fill", "#8B949E")
//           .attr("font-size", "10px")
//           .style("pointer-events", "none");

//         if (i === 0) {
//           group
//             .append("rect")
//             .attr("x", rectWidth - 70)
//             .attr("y", 6)
//             .attr("width", 60)
//             .attr("height", 18)
//             .attr("fill", "#EF4444")
//             .attr("rx", 4);

//           group
//             .append("text")
//             .attr("x", rectWidth - 40)
//             .attr("y", 18)
//             .text("CRITICAL")
//             .attr("fill", "#FFFFFF")
//             .attr("font-size", "9px")
//             .attr("font-weight", "700")
//             .attr("text-anchor", "middle")
//             .style("pointer-events", "none");
//         }
//       }
//     });
//   }, []);

//   return <div ref={containerRef} className="w-full" />;
// }

// export default function HotzonesPage() {
//   const [activeTab, setActiveTab] = useState("30 Days");

//   return (
//     <DashboardShell>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-text-heading">File Hotzones</h1>
//             <p className="text-text-secondary mt-1">Identify files with the highest change frequency</p>
//           </div>
//           <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
//             <Filter size={16} />
//             Filter
//           </button>
//         </div>

//         {/* Time Filter Tabs */}
//         <div className="flex items-center gap-2 mb-6">
//           {["30 Days", "90 Days", "All Time"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                 activeTab === tab
//                   ? "bg-accent-primary text-white"
//                   : "bg-card-bg text-text-secondary hover:text-text-primary"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Stability Legend */}
//         <div className="bg-card-bg border border-card-border rounded-xl p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <span className="text-xs font-medium text-text-secondary">Stability</span>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-text-muted">Stable</span>
//                 <div className="w-32 h-2 rounded-full bg-gradient-to-r from-[#22C55E] via-[#84CC16] via-[#F59E0B] to-[#EF4444]" />
//                 <span className="text-xs text-text-muted">Hotzone</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
//                 <span className="text-xs text-text-secondary">src/components</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
//                 <span className="text-xs text-text-secondary">lib/utils</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
//                 <span className="text-xs text-text-secondary">api/routes</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Treemap */}
//         <div className="bg-card-bg border border-card-border rounded-xl p-6">
//           <Treemap />
//         </div>
//       </div>
//     </DashboardShell>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DashboardShell } from "@/components/layout/DashboardShell";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const treemapData = [
  { name: "CORE_API.TS",           value: 340, color: "#EF4444",  debt: 9.4, debtColor: "#EF4444" },
  { name: "AUTH.V2",               value: 180, color: "#F97316",  debt: 8.1, debtColor: "#F97316" },
  { name: "STABLE_INFRASTRUCTURE", value: 220, color: "#1E2530",  debt: 1.0, debtColor: "#6B7280" },
  { name: "UI_COMPONENTS_LIB",     value: 290, color: "#7C3AED",  debt: 6.7, debtColor: "#8B5CF6" },
  { name: "STABLE_1",              value: 190, color: "#10B981",  debt: 1.2, debtColor: "#10B981" },
  { name: "STABLE_2",              value: 160, color: "#1E2530",  debt: 0.8, debtColor: "#6B7280" },
];

const topHotspots = [
  { file: "core_api.ts",     meta: "2.4k Lines · 14 Cyclo", debt: 9.4, color: "#EF4444" },
  { file: "legacy_parser.js",meta: "4.1k Lines · 32 Cyclo", debt: 8.1, color: "#F97316" },
  { file: "auth_manager.py", meta: "800 Lines · 8 Cyclo",   debt: 6.7, color: "#8B5CF6" },
  { file: "utils_export.ts", meta: "120 Lines · 2 Cyclo",   debt: 1.2, color: "#10B981" },
];

// ─── Treemap Component ────────────────────────────────────────────────────────
function Treemap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    const data = {
      name: "root",
      children: treemapData.map((d) => ({ ...d })),
    };

    const root = d3
      .hierarchy(data)
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

    leaves.forEach((leaf: any) => {
      const g = svg.append("g").attr("transform", `translate(${leaf.x0},${leaf.y0})`);
      const w = leaf.x1 - leaf.x0;
      const h = leaf.y1 - leaf.y0;

      g.append("rect")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", leaf.data.color)
        .attr("rx", 6)
        .style("cursor", "pointer")
        .on("mouseover", function () { d3.select(this).attr("opacity", 0.85); })
        .on("mouseout",  function () { d3.select(this).attr("opacity", 1); });

      if (w > 50 && h > 30) {
        g.append("text")
          .attr("x", 10)
          .attr("y", 22)
          .text(leaf.data.name)
          .attr("fill", "rgba(255,255,255,0.9)")
          .attr("font-size", w > 120 ? "11px" : "9px")
          .attr("font-weight", "600")
          .attr("letter-spacing", "0.04em")
          .style("pointer-events", "none");
      }
    });

    const resizeObs = new ResizeObserver(() => {
      container.innerHTML = "";
      const newW = container.clientWidth;
      const newH = container.clientHeight || 560;
      d3.treemap<any>().size([newW, newH]).padding(4).round(true)(root);
      const newSvg = d3.select(container).append("svg").attr("width", newW).attr("height", newH).style("font-family", "system-ui, sans-serif");
      root.leaves().forEach((leaf: any) => {
        const g = newSvg.append("g").attr("transform", `translate(${leaf.x0},${leaf.y0})`);
        const w2 = leaf.x1 - leaf.x0;
        const h2 = leaf.y1 - leaf.y0;
        g.append("rect").attr("width", w2).attr("height", h2).attr("fill", leaf.data.color).attr("rx", 6).style("cursor","pointer");
        if (w2 > 50 && h2 > 30) {
          g.append("text").attr("x", 10).attr("y", 22).text(leaf.data.name).attr("fill","rgba(255,255,255,0.9)").attr("font-size", w2 > 120 ? "11px" : "9px").attr("font-weight","600").attr("letter-spacing","0.04em").style("pointer-events","none");
        }
      });
    });
    resizeObs.observe(container);
    return () => resizeObs.disconnect();
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HotzonesPage() {
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
      {/* ── BODY ── */}
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
            <h1
              style={{
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                color: "#E6EDF3",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              STRUCTURAL
            </h1>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                color: "#10B981",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              HOTZONES
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{ fontSize: 13, color: "#8B949E", margin: "0 0 20px 0", lineHeight: 1.6 }}>
            Analyzing technical debt across 14,028 modules.
            <br />
            Elevation indicates risk magnitude.
          </p>

          {/* Treemap */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <Treemap />
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
                STABILITY:
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F97316" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#8B949E" }} />
              </div>
              <span style={{ fontSize: 11, color: "#8B949E" }}>Stable → Volatile</span>
            </div>
            <span style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.04em" }}>
              HEIGHT: Technical Debt Magnitude
            </span>
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
          {/* Panel content */}
          <div style={{ flex: 1, padding: "28px 28px 0 28px", overflow: "hidden" }}>

            {/* Global Risk Index header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: "#8B949E", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                GLOBAL RISK INDEX
              </span>
              <div
                style={{
                  background: "#2D1515",
                  border: "1px solid #EF4444",
                  borderRadius: 20,
                  padding: "3px 14px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#EF4444",
                  letterSpacing: "0.08em",
                }}
              >
                CRITICAL
              </div>
            </div>

            {/* Score */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "#10B981",
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              74.2
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: 3,
                background: "#21262D",
                borderRadius: 2,
                marginBottom: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "74.2%",
                  height: "100%",
                  background: "#10B981",
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Complexity + Coupling */}
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
                <div style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.06em", marginBottom: 4 }}>COMPLEXITY</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>1.4k MH</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#8B949E", letterSpacing: "0.06em", marginBottom: 4 }}>COUPLING</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>89.1%</div>
              </div>
            </div>

            {/* Top Hotspots */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: "#8B949E", fontWeight: 600, letterSpacing: "0.08em" }}>
                TOP HOTSPOTS
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {topHotspots.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: i < topHotspots.length - 1 ? "1px solid #21262D" : "none",
                  }}
                >
                  {/* Left: bar + info */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div
                      style={{
                        width: 3,
                        height: 36,
                        borderRadius: 2,
                        background: h.color,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3", marginBottom: 4 }}>
                        {h.file}
                      </div>
                      <div style={{ fontSize: 11, color: "#8B949E" }}>{h.meta}</div>
                    </div>
                  </div>

                  {/* Right: debt score */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: h.color, lineHeight: 1 }}>
                      {h.debt.toFixed(1)}
                    </div>
                    <div style={{ fontSize: 9, color: "#8B949E", letterSpacing: "0.06em", marginTop: 2 }}>
                      DEBT
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA BUTTON ── */}
          <div style={{ padding: "20px 28px", flexShrink: 0 }}>
            <button
              style={{
                width: "100%",
                height: 52,
                background: "#10B981",
                color: "#0D1117",
                border: "none",
                borderRadius: 32,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "background 0.15s, transform 0.1s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#0EA572")}
              onMouseOut={(e)  => (e.currentTarget.style.background = "#10B981")}
            >
              INITIATE REFACTOR SCAN
            </button>
          </div>
        </div>
      </div>
      </div>
    </DashboardShell>
  );
}
