export interface MetricData {
  title: string;
  value: string;
  delta: number;
  deltaLabel: string;
  iconBgColor: string;
  iconColor: string;
}

export interface ActivityItem {
  type: "commit" | "pr" | "merge";
  icon: string;
  iconBg: string;
  message: string;
  author: string;
  branch: string;
  time: string;
}

export interface ContributorData {
  name: string;
  initials: string;
  avatarBg: string;
  commits: number;
  prs: number;
  reviews: number;
  role: string;
  roleColor: string;
}

export interface TimelineStory {
  date: string;
  category: "REFACTOR" | "MILESTONE" | "DATA" | "HOTFIX";
  categoryColor: string;
  title: string;
  narrative: string;
  commits: number;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
}

export interface IssueItem {
  severity: "CRITICAL" | "WARNING" | "INFO";
  file: string;
  title: string;
  description: string;
}

export interface HotzoneFile {
  path: string;
  changes: number;
  color: string;
}

export interface ChartDataPoint {
  day: string;
  production: number;
  staging: number;
}

export interface LanguageData {
  name: string;
  value: number;
  color: string;
}

export const dashboardMetrics: MetricData[] = [
  {
    title: "Total Commits",
    value: "1,247",
    delta: 12,
    deltaLabel: "vs last month",
    iconBgColor: "#8B5CF6/20",
    iconColor: "#8B5CF6",
  },
  {
    title: "Active Contributors",
    value: "24",
    delta: 4,
    deltaLabel: "vs last month",
    iconBgColor: "#22C55E/20",
    iconColor: "#22C55E",
  },
  {
    title: "Code Health Score",
    value: "87",
    delta: 3,
    deltaLabel: "vs last month",
    iconBgColor: "#3B82F6/20",
    iconColor: "#3B82F6",
  },
  {
    title: "Last Sync",
    value: "2m ago",
    delta: 0,
    deltaLabel: "Auto-sync enabled",
    iconBgColor: "#F59E0B/20",
    iconColor: "#F59E0B",
  },
];

export const recentActivity: ActivityItem[] = [
  {
    type: "commit",
    icon: "+",
    iconBg: "#22C55E",
    message: "feat: Add RAG-based code query endpoint",
    author: "Sarah Chen",
    branch: "main",
    time: "2h ago",
  },
  {
    type: "commit",
    icon: "~",
    iconBg: "#F59E0B",
    message: "refactor: Simplify embedding pipeline",
    author: "Alex Kim",
    branch: "feature/rag",
    time: "5h ago",
  },
  {
    type: "pr",
    icon: ">",
    iconBg: "#3B82F6",
    message: "feat: Add authentication middleware",
    author: "Jordan Lee",
    branch: "feature/auth",
    time: "1d ago",
  },
  {
    type: "merge",
    icon: "✓",
    iconBg: "#8B5CF6",
    message: "fix: Resolve token limit issue",
    author: "Sam Park",
    branch: "hotfix/tokens",
    time: "2d ago",
  },
];

export const commitDistribution: ChartDataPoint[] = [
  { day: "Mon", production: 12, staging: 8 },
  { day: "Tue", production: 19, staging: 12 },
  { day: "Wed", production: 15, staging: 10 },
  { day: "Thu", production: 22, staging: 15 },
  { day: "Fri", production: 18, staging: 11 },
  { day: "Sat", production: 8, staging: 5 },
  { day: "Sun", production: 5, staging: 3 },
];

export const collaboratorInsights = [
  { name: "Sarah Chen", initials: "SC", avatarBg: "#8B5CF6", value: 312, label: "commits" },
  { name: "Alex Kim", initials: "AK", avatarBg: "#22C55E", value: 245, label: "commits" },
  { name: "Jordan Lee", initials: "JL", avatarBg: "#3B82F6", value: 189, label: "commits" },
  { name: "Sam Park", initials: "SP", avatarBg: "#F59E0B", value: 156, label: "commits" },
];

export const statsMetrics: MetricData[] = [
  {
    title: "Total Commits",
    value: "12,847",
    delta: 23,
    deltaLabel: "vs last month",
    iconBgColor: "#8B5CF6/20",
    iconColor: "#8B5CF6",
  },
  {
    title: "Active Contributors",
    value: "47",
    delta: 8,
    deltaLabel: "vs last month",
    iconBgColor: "#22C55E/20",
    iconColor: "#22C55E",
  },
  {
    title: "Avg. Daily Commits",
    value: "156",
    delta: 12,
    deltaLabel: "vs last month",
    iconBgColor: "#3B82F6/20",
    iconColor: "#3B82F6",
  },
  {
    title: "Code Review Time",
    value: "4.2h",
    delta: -15,
    deltaLabel: "vs last month",
    iconBgColor: "#F59E0B/20",
    iconColor: "#F59E0B",
  },
];

export const commitFrequencyData: ChartDataPoint[] = [
  { day: "Mon", production: 45, staging: 23 },
  { day: "Tue", production: 52, staging: 31 },
  { day: "Wed", production: 38, staging: 28 },
  { day: "Thu", production: 67, staging: 45 },
  { day: "Fri", production: 43, staging: 29 },
  { day: "Sat", production: 21, staging: 12 },
  { day: "Sun", production: 15, staging: 8 },
];

export const languageDistribution: LanguageData[] = [
  { name: "TypeScript", value: 42, color: "#3B82F6" },
  { name: "Python", value: 28, color: "#F59E0B" },
  { name: "JavaScript", value: 15, color: "#F0F6FC" },
  { name: "Go", value: 8, color: "#06B6D4" },
  { name: "Rust", value: 4, color: "#F97316" },
  { name: "Other", value: 3, color: "#8B949E" },
];

export const codeChurnData = [
  { week: "W1", churn: 1240, lines: 890 },
  { week: "W2", churn: 1580, lines: 1120 },
  { week: "W3", churn: 980, lines: 720 },
  { week: "W4", churn: 2100, lines: 1450 },
  { week: "W5", churn: 1850, lines: 1290 },
  { week: "W6", churn: 1320, lines: 980 },
  { week: "W7", churn: 1680, lines: 1150 },
  { week: "W8", churn: 1420, lines: 1020 },
];

export const timelineStories: TimelineStory[] = [
  {
    date: "March 15, 2026",
    category: "MILESTONE",
    categoryColor: "#22C55E",
    title: "Production Deployment Pipeline",
    narrative: "Successfully deployed the new microservices architecture to production with zero downtime. The refactoring reduced API response times by 40% and improved overall system reliability.",
    commits: 47,
    filesChanged: 128,
    linesAdded: 4820,
    linesRemoved: 3240,
  },
  {
    date: "March 8, 2026",
    category: "REFACTOR",
    categoryColor: "#3B82F6",
    title: "Authentication Module Overhaul",
    narrative: "Complete rewrite of the authentication module using JWT tokens with refresh token rotation. Implemented OAuth 2.0 integration for GitHub, Google, and Microsoft SSO providers.",
    commits: 23,
    filesChanged: 45,
    linesAdded: 2150,
    linesRemoved: 1890,
  },
  {
    date: "February 28, 2026",
    category: "DATA",
    categoryColor: "#F59E0B",
    title: "Database Schema Migration",
    narrative: "Migrated from PostgreSQL 12 to PostgreSQL 15 with improved indexing strategy. Added automated backup system with point-in-time recovery capability.",
    commits: 12,
    filesChanged: 34,
    linesAdded: 1560,
    linesRemoved: 980,
  },
  {
    date: "February 15, 2026",
    category: "HOTFIX",
    categoryColor: "#DA3633",
    title: "Critical Security Patch",
    narrative: "Emergency patch for CVE-2026-1234 affecting the authentication service. All user sessions were invalidated and password reset flow was updated.",
    commits: 5,
    filesChanged: 8,
    linesAdded: 340,
    linesRemoved: 180,
  },
];

export const contributors: ContributorData[] = [
  {
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "#8B5CF6",
    commits: 487,
    prs: 89,
    reviews: 234,
    role: "The Feature Lead",
    roleColor: "#22D2D2",
  },
  {
    name: "Alex Kim",
    initials: "AK",
    avatarBg: "#22C55E",
    commits: 312,
    prs: 67,
    reviews: 156,
    role: "Documentation Guru",
    roleColor: "#A855F7",
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    avatarBg: "#3B82F6",
    commits: 245,
    prs: 45,
    reviews: 98,
    role: "DevOps Wizard",
    roleColor: "#22C55E",
  },
  {
    name: "Sam Park",
    initials: "SP",
    avatarBg: "#F59E0B",
    commits: 198,
    prs: 34,
    reviews: 67,
    role: "Performance Pro",
    roleColor: "#F59E0B",
  },
  {
    name: "Taylor Swift",
    initials: "TS",
    avatarBg: "#EC4899",
    commits: 167,
    prs: 28,
    reviews: 89,
    role: "Security Sentinel",
    roleColor: "#EC4899",
  },
  {
    name: "Morgan Yu",
    initials: "MY",
    avatarBg: "#06B6D4",
    commits: 134,
    prs: 22,
    reviews: 45,
    role: "Code Architect",
    roleColor: "#06B6D4",
  },
];

export const issues: IssueItem[] = [
  {
    severity: "CRITICAL",
    file: "src/services/auth.service.ts",
    title: "Hardcoded credentials detected",
    description: "API keys and secrets found in source code. Move to environment variables immediately.",
  },
  {
    severity: "WARNING",
    file: "src/utils/helper.ts",
    title: "Complex function complexity",
    description: "Function exceeds maximum cyclomatic complexity threshold of 10.",
  },
  {
    severity: "WARNING",
    file: "src/components/Button.tsx",
    title: "Missing prop types",
    description: "Component props are not properly typed, may cause runtime errors.",
  },
  {
    severity: "INFO",
    file: "src/hooks/useAuth.ts",
    title: "Deprecated API usage",
    description: "Using deprecated useEffect syntax. Consider migrating to newer pattern.",
  },
  {
    severity: "WARNING",
    file: "src/api/routes.ts",
    title: "SQL injection vulnerability",
    description: "User input not sanitized before database query execution.",
  },
  {
    severity: "INFO",
    file: "src/styles/global.css",
    title: "Duplicate CSS rules",
    description: "Found 15 duplicate CSS declarations that can be consolidated.",
  },
];

export const hotzoneFiles: HotzoneFile[] = [
  { path: "src/components/Auth/LoginForm.tsx", changes: 47, color: "#EF4444" },
  { path: "src/services/api/handlers.ts", changes: 38, color: "#F97316" },
  { path: "lib/utils/format.ts", changes: 29, color: "#F59E0B" },
  { path: "src/hooks/useAuth.ts", changes: 24, color: "#F59E0B" },
  { path: "src/pages/dashboard/index.tsx", changes: 19, color: "#84CC16" },
  { path: "lib/database/connection.ts", changes: 15, color: "#84CC16" },
  { path: "src/styles/theme.css", changes: 12, color: "#84CC16" },
  { path: "src/types/index.ts", changes: 8, color: "#22C55E" },
  { path: "README.md", changes: 5, color: "#22C55E" },
];

export const chatMessages = [
  {
    role: "assistant" as const,
    content: `Hi! I'm your GitStory assistant. I can help you understand this codebase.\n\nHere's a quick overview:\n- 1,247 commits across 47 contributors\n- Main languages: TypeScript (42%), Python (28%)\n- Most active file: src/components/Auth/LoginForm.tsx (47 changes)\n\nWhat would you like to explore?`,
    timestamp: "10:32 AM",
  },
  {
    role: "user" as const,
    content: "How does the authentication flow work?",
    timestamp: "10:33 AM",
  },
  {
    role: "assistant" as const,
    content: `The authentication system in this repo uses JWT tokens with a refresh rotation strategy.\n\n**Auth Flow:**\n1. User submits credentials to POST /api/auth/login\n2. Server validates against the auth-service\n3. Returns access token (JWT) + refresh token\n4. Access token expires in 15 minutes\n5. Refresh token used to obtain new access tokens\n\n**Key Files:**\n• src/services/auth.service.ts - Core authentication logic\n• Authorization header uses Bearer token format\n• jwt.verify() validates token signature\n\n**Potential Issue:** I noticed the token expiration is hardcoded in auth-service.ts. Consider moving to environment variables for different environments.`,
    timestamp: "10:33 AM",
  },
  {
    role: "user" as const,
    content: "Thanks, that helps! What about the database schema?",
    timestamp: "10:35 AM",
  },
];
