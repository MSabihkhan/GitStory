export const colors = {
  page: {
    background: "#0D1117",
    backgroundSecondary: "#161B22",
    backgroundTertiary: "#0D1117",
  },
  sidebar: {
    background: "#161B22",
    border: "#30363D",
  },
  card: {
    background: "#161B22",
    border: "#30363D",
    hover: "#1C2128",
  },
  accent: {
    primary: "#8B5CF6",
    primaryHover: "#7C3AED",
    secondary: "#F59E0B",
    success: "#22C55E",
    successDark: "#238636",
    blue: "#3B82F6",
    cyan: "#06B6D4",
    pink: "#EC4899",
    orange: "#F59E0B",
    critical: "#DA3633",
    criticalDark: "#F85149",
    warning: "#D29922",
    warningDark: "#9A6700",
    info: "#58A6FF",
    infoDark: "#1E3A5F",
  },
  text: {
    heading: "#F8FAFC",
    primary: "#F0F6FC",
    secondary: "#8B949E",
    muted: "#484F58",
    mutedLight: "#64748B",
  },
  border: {
    default: "#30363D",
    focus: "#8B5CF6",
  },
  status: {
    critical: {
      bg: "#3F1E1E",
      text: "#F85149",
    },
    warning: {
      bg: "#3E2D1E",
      text: "#D29922",
    },
    info: {
      bg: "#1E3A5F",
      text: "#58A6FF",
    },
  },
  landing: {
    hero: {
      gradientStart: "#0F0F1A",
      gradientEnd: "#1A1A2E",
    },
    card: {
      border: "#1E293B",
      background: "rgba(30, 41, 59, 0.5)",
    },
  },
  collaborators: {
    featureLead: "#22D2D2",
    documentationGuru: "#A855F7",
    devopsWizard: "#22C55E",
    performancePro: "#F59E0B",
  },
  hotzones: {
    stable: "#22C55E",
    low: "#84CC16",
    medium: "#F59E0B",
    high: "#F97316",
    critical: "#EF4444",
  },
  category: {
    srcComponents: "#3B82F6",
    libUtils: "#8B5CF6",
    apiRoutes: "#F59E0B",
  },
  timeline: {
    refactor: "#3B82F6",
    milestone: "#22C55E",
    data: "#F59E0B",
    hotfix: "#DA3633",
  },
  charts: {
    production: "#3B82F6",
    staging: "#8B5CF6",
    churn: "#EC4899",
    churnSecondary: "#06B6D4",
  },
} as const;

export const fonts = {
  heading: {
    family: "Inter, system-ui, sans-serif",
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  body: {
    family: "Inter, system-ui, sans-serif",
    weights: {
      normal: 400,
      medium: 500,
    },
  },
  mono: {
    family: "JetBrains Mono, monospace",
  },
} as const;

export const typography = {
  hero: {
    fontSize: "3.75rem",
    lineHeight: "1.1",
    weight: 700,
  },
  h1: {
    fontSize: "2.25rem",
    lineHeight: "1.2",
    weight: 700,
  },
  h2: {
    fontSize: "1.5rem",
    lineHeight: "1.3",
    weight: 600,
  },
  h3: {
    fontSize: "1.25rem",
    lineHeight: "1.4",
    weight: 600,
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.6",
    weight: 400,
  },
  bodySmall: {
    fontSize: "0.875rem",
    lineHeight: "1.5",
    weight: 400,
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: "1.4",
    weight: 500,
  },
  metric: {
    fontSize: "1.875rem",
    lineHeight: "1.2",
    weight: 700,
  },
  metricSmall: {
    fontSize: "1.5rem",
    lineHeight: "1.2",
    weight: 700,
  },
} as const;

export const spacing = {
  sidebar: {
    width: "256px",
  },
  topnav: {
    height: "64px",
  },
  card: {
    padding: "24px",
    borderRadius: "12px",
  },
  section: {
    paddingY: "48px",
  },
  grid: {
    gap: "24px",
  },
} as const;

export const radius = {
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const shadows = {
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
  glow: {
    primary: "0 0 20px rgba(139, 92, 246, 0.3)",
    success: "0 0 20px rgba(34, 197, 94, 0.3)",
  },
} as const;
