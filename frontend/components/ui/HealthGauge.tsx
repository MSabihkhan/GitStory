"use client";

interface HealthGaugeProps {
  score: number;
  label?: string;
  size?: number;
}

export function HealthGauge({ score, label = "Health Score", size = 200 }: HealthGaugeProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  const getColor = (value: number) => {
    if (value >= 80) return "#22C55E";
    if (value >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#30363D"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 8px ${getColor(score)}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-text-heading">{score}</span>
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
    </div>
  );
}
