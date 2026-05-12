"use client";

type SeverityLevel = "CRITICAL" | "WARNING" | "INFO";

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const severityStyles = {
  CRITICAL: {
    bg: "bg-status-critical-bg",
    text: "text-status-critical-text",
  },
  WARNING: {
    bg: "bg-status-warning-bg",
    text: "text-status-warning-text",
  },
  INFO: {
    bg: "bg-status-info-bg",
    text: "text-status-info-text",
  },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles = severityStyles[severity];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold ${styles.bg} ${styles.text}`}
    >
      {severity}
    </span>
  );
}
