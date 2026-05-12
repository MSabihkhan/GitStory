// // VISUAL AUDIT — S4 · Engineers.png
// // Background: #0D1117
// // Sidebar: #161B22, width 256px
// // Card background: #161B22
// // Border color: #30363D
// // Role colors: The Feature Lead=#22D2D2, Documentation Guru=#A855F7, DevOps Wizard=#22C55E, Performance Pro=#F59E0B
// // Font: Inter, system-ui
// // Layout: Sidebar + main content with tabs and 3-column card grid

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: N/A
// // If any NO: None

// "use client";

// import { useState } from "react";
// import { DashboardShell } from "@/components/layout/DashboardShell";
// import { contributors } from "@/lib/mock-data";
// import { Plus, Filter, MoreVertical } from "lucide-react";

// const tabs = ["All Contributors", "Core Team", "External Maintainers", "Bots"];

// export default function CollaboratorsPage() {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <DashboardShell>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-text-heading">Collaborators</h1>
//             <p className="text-text-secondary mt-1">Meet the team behind the code</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-card-border text-text-secondary text-sm font-medium rounded-lg hover:bg-card-hover transition-colors">
//               <Filter size={16} />
//               Filter
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors">
//               <Plus size={16} />
//               Invite Developer
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-sidebar-border mb-6">
//           <div className="flex gap-6">
//             {tabs.map((tab, index) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(index)}
//                 className={`pb-4 text-sm font-medium transition-colors relative ${
//                   activeTab === index
//                     ? "text-accent-primary"
//                     : "text-text-secondary hover:text-text-primary"
//                 }`}
//               >
//                 {tab}
//                 {activeTab === index && (
//                   <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Contributors Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {contributors.map((contributor, index) => (
//             <div
//               key={index}
//               className="bg-card-bg border border-card-border rounded-xl p-6 hover:bg-card-hover transition-colors"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
//                     style={{ backgroundColor: contributor.avatarBg }}
//                   >
//                     {contributor.initials}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm font-medium text-text-primary">{contributor.name}</span>
//                       <button className="p-1 text-text-muted hover:text-text-secondary">
//                         <MoreVertical size={14} />
//                       </button>
//                     </div>
//                     <p
//                       className="text-sm font-medium mt-1"
//                       style={{ color: contributor.roleColor }}
//                     >
//                       {contributor.role}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 divide-x divide-sidebar-border">
//                 <div className="text-center px-2">
//                   <p className="text-lg font-bold text-text-heading">{contributor.commits}</p>
//                   <p className="text-xs text-text-muted">COMMITS</p>
//                 </div>
//                 <div className="text-center px-2">
//                   <p className="text-lg font-bold text-text-heading">{contributor.prs}</p>
//                   <p className="text-xs text-text-muted">PRs</p>
//                 </div>
//                 <div className="text-center px-2">
//                   <p className="text-lg font-bold text-text-heading">{contributor.reviews}</p>
//                   <p className="text-xs text-text-muted">REVIEWS</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DashboardShell>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface Contributor {
  name: string;
  role: string;
  avatar_bg: string;
  role_color: string;
  role_border_color: string;
  card_top_color: string;
  commits: string;
  prs: string;
  impact: string;
  impact_color: string;
}

// ─── Mock Data (matching screenshot exactly) ──────────────────────────────────
const contributors: Contributor[] = [
  {
    name: "Alex Mercer",
    role: "LEAD ARCHITECT",
    avatar_bg: "#22D2C8",
    role_color: "#22D2C8",
    role_border_color: "#22D2C8",
    card_top_color: "#22D2C8",
    commits: "2.4k",
    prs: "182",
    impact: "98%",
    impact_color: "#22C55E",
  },
  {
    name: "Jordan Dax",
    role: "SECURITY OPS",
    avatar_bg: "#EF4444",
    role_color: "#EF4444",
    role_border_color: "#EF4444",
    card_top_color: "#EF4444",
    commits: "1.1k",
    prs: "94",
    impact: "84%",
    impact_color: "#F59E0B",
  },
  {
    name: "Sam Liao",
    role: "BACKEND DEV",
    avatar_bg: "#22C55E",
    role_color: "#22C55E",
    role_border_color: "#22C55E",
    card_top_color: "#22C55E",
    commits: "3.8k",
    prs: "420",
    impact: "99%",
    impact_color: "#22C55E",
  },
  {
    name: "Elena Kostic",
    role: "STAFF ENGINEER",
    avatar_bg: "#94A3B8",
    role_color: "#94A3B8",
    role_border_color: "#94A3B8",
    card_top_color: "#6366F1",
    commits: "842",
    prs: "56",
    impact: "92%",
    impact_color: "#22C55E",
  },
  {
    name: "Rohan Varma",
    role: "DEVOPS",
    avatar_bg: "#A855F7",
    role_color: "#A855F7",
    role_border_color: "#A855F7",
    card_top_color: "#A855F7",
    commits: "1.2k",
    prs: "210",
    impact: "89%",
    impact_color: "#F59E0B",
  },
  {
    name: "Ingrid S.",
    role: "FRONTEND LEAD",
    avatar_bg: "#F59E0B",
    role_color: "#F59E0B",
    role_border_color: "#F59E0B",
    card_top_color: "#F59E0B",
    commits: "4.5k",
    prs: "512",
    impact: "96%",
    impact_color: "#22C55E",
  },
];

// ─── Contributor Card ─────────────────────────────────────────────────────────
function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div
      style={{
        backgroundColor: "#1A1F35",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #252A40",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Colored top border line */}
      <div
        style={{
          height: "3px",
          backgroundColor: contributor.card_top_color,
          width: "100%",
          flexShrink: 0,
        }}
      />

      {/* Card body */}
      <div
        style={{
          padding: "28px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: contributor.avatar_bg,
            marginBottom: "14px",
            flexShrink: 0,
          }}
        />

        {/* Name */}
        <p
          style={{
            color: "#E2E8F0",
            fontSize: "15px",
            fontWeight: 600,
            margin: 0,
            marginBottom: "10px",
            letterSpacing: "0.01em",
          }}
        >
          {contributor.name}
        </p>

        {/* Role Badge */}
        <div
          style={{
            border: `1px solid ${contributor.role_border_color}`,
            borderRadius: "20px",
            padding: "2px 12px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              color: contributor.role_color,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {contributor.role}
          </span>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "100%",
            borderTop: "1px solid #252A40",
            paddingTop: "16px",
            gap: 0,
          }}
        >
          {/* Commits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              COMMITS
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#E2E8F0",
                lineHeight: 1,
              }}
            >
              {contributor.commits}
            </span>
          </div>

          {/* PRs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              PRs
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#E2E8F0",
                lineHeight: 1,
              }}
            >
              {contributor.prs}
            </span>
          </div>

          {/* Impact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "#64748B",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              IMPACT
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: contributor.impact_color,
                lineHeight: 1,
              }}
            >
              {contributor.impact}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CollaboratorsPage() {
  const { getAccessToken, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collaboratorsData, setCollaboratorsData] = useState<Contributor[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

async function fetchData() {
      // Only use cached data - don't fetch automatically
      const cachedData = localStorage.getItem("gitstory_cached_data");
      console.log("COLLAB: cachedData exists:", !!cachedData);
      
      if (!cachedData) {
        setLoading(false);
        return;
      }

      const cached = JSON.parse(cachedData);
      console.log("COLLAB: cached keys:", Object.keys(cached));
      console.log("COLLAB: cached.collaborators:", cached.collaborators);
      
      // Handle both array and object with contributors property
      if (cached.collaborators) {
        if (Array.isArray(cached.collaborators)) {
          setCollaboratorsData(cached.collaborators);
        } else if (cached.collaborators.contributors && Array.isArray(cached.collaborators.contributors)) {
          setCollaboratorsData(cached.collaborators.contributors);
        }
      }
      
      setLoading(false);
    }

    fetchData();
  }, [mounted]);

  if (loading) {
    return (
      <DashboardShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0D1117" }}>
          <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
        </div>
      </DashboardShell>
    );
  }

  const contributorsToUse = collaboratorsData.length > 0 ? collaboratorsData : contributors;

  return (
    <DashboardShell>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0D1117",
          padding: "32px 40px",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* ── Page Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              color: "#F1F5F9",
              fontSize: "28px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Collaborators
          </h1>

          {/* Invite Button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#00C9A7",
              color: "#0D1117",
              fontSize: "13px",
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
            }
          >
            <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
            Invite Contributor
          </button>
        </div>

        {/* ── Contributors Grid ── */}
        {/* Row 1: 4 cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {contributorsToUse.slice(0, 4).map((contributor: Contributor, index: number) => (
            <ContributorCard key={index} contributor={contributor} />
          ))}
        </div>

        {/* Row 2: 2 cards (left-aligned, same width as above) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {contributorsToUse.slice(4).map((contributor: Contributor, index: number) => (
            <ContributorCard key={index} contributor={contributor} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
