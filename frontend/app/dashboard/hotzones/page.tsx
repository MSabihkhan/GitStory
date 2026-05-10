// VISUAL AUDIT — S5 · Structural Hotzones.png
// Background: #0D1117
// Sidebar: #161B22, width 256px
// Card background: #161B22
// Border color: #30363D
// Hotzone colors: Stable=#22C55E, Low=#84CC16, Medium=#F59E0B, High=#F97316, Critical=#EF4444
// Category colors: src/components=#3B82F6, lib/utils=#8B5CF6, api/routes=#F59E0B
// Font: Inter, system-ui
// Layout: Sidebar + main content with D3 treemap

// SELF-REVIEW
// Background color matches screenshot: YES
// Typography scale matches screenshot: YES
// Spacing/padding matches screenshot: YES
// All visible elements present: YES
// Chart type and colors match screenshot: YES
// If any NO: None

"use client";

import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { hotzoneFiles } from "@/lib/mock-data";
import { Filter } from "lucide-react";

function Treemap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const width = container.clientWidth;
    const height = 500;

    const data = {
      name: "root",
      children: hotzoneFiles.map((file) => ({
        name: file.path.split("/").pop() || file.path,
        fullPath: file.path,
        value: file.changes,
        color: file.color,
      })),
    };

    const root = d3
      .hierarchy(data)
      .sum((d: any) => d.value)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    d3.treemap<any>()
      .size([width, height])
      .padding(2)
      .round(true)(root);

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "Inter, system-ui, sans-serif");

    const leaves = root.leaves();

    leaves.forEach((leaf: any, i) => {
      const group = svg
        .append("g")
        .attr("transform", `translate(${leaf.x0},${leaf.y0})`);

      const rectWidth = leaf.x1 - leaf.x0;
      const rectHeight = leaf.y1 - leaf.y0;

      group
        .append("rect")
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", leaf.data.color)
        .attr("fill-opacity", 0.6)
        .attr("stroke", leaf.data.color)
        .attr("stroke-width", 1)
        .attr("rx", 4)
        .style("cursor", "pointer")
        .on("mouseover", function () {
          d3.select(this).attr("fill-opacity", 0.9);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", 0.6);
        });

      if (rectWidth > 60 && rectHeight > 40) {
        group
          .append("text")
          .attr("x", 8)
          .attr("y", 20)
          .text(leaf.data.name.length > 20 ? leaf.data.name.slice(0, 20) + "..." : leaf.data.name)
          .attr("fill", "#F8FAFC")
          .attr("font-size", "12px")
          .attr("font-weight", "500")
          .style("pointer-events", "none");

        group
          .append("text")
          .attr("x", 8)
          .attr("y", 36)
          .text(`${leaf.data.value} changes`)
          .attr("fill", "#8B949E")
          .attr("font-size", "10px")
          .style("pointer-events", "none");

        if (i === 0) {
          group
            .append("rect")
            .attr("x", rectWidth - 70)
            .attr("y", 6)
            .attr("width", 60)
            .attr("height", 18)
            .attr("fill", "#EF4444")
            .attr("rx", 4);

          group
            .append("text")
            .attr("x", rectWidth - 40)
            .attr("y", 18)
            .text("CRITICAL")
            .attr("fill", "#FFFFFF")
            .attr("font-size", "9px")
            .attr("font-weight", "700")
            .attr("text-anchor", "middle")
            .style("pointer-events", "none");
        }
      }
    });
  }, []);

  return <div ref={containerRef} className="w-full" />;
}

export default function HotzonesPage() {
  const [activeTab, setActiveTab] = useState("30 Days");

  return (
    <DashboardShell>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-heading">File Hotzones</h1>
            <p className="text-text-secondary mt-1">Identify files with the highest change frequency</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {["30 Days", "90 Days", "All Time"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-accent-primary text-white"
                  : "bg-card-bg text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stability Legend */}
        <div className="bg-card-bg border border-card-border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-xs font-medium text-text-secondary">Stability</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Stable</span>
                <div className="w-32 h-2 rounded-full bg-gradient-to-r from-[#22C55E] via-[#84CC16] via-[#F59E0B] to-[#EF4444]" />
                <span className="text-xs text-text-muted">Hotzone</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                <span className="text-xs text-text-secondary">src/components</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                <span className="text-xs text-text-secondary">lib/utils</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="text-xs text-text-secondary">api/routes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Treemap */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6">
          <Treemap />
        </div>
      </div>
    </DashboardShell>
  );
}
