"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export function MetricCard({
  title,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
  iconBgColor,
  iconColor,
}: MetricCardProps) {
  const isPositive = delta >= 0;

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
            isPositive
              ? "bg-accent-success/10 text-accent-success"
              : "bg-accent-critical/10 text-accent-critical"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{isPositive ? "+" : ""}{delta}%</span>
        </div>
      </div>
      <div>
        <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-text-heading">{value}</p>
        <p className="text-text-muted text-xs mt-1">{deltaLabel}</p>
      </div>
    </div>
  );
}
