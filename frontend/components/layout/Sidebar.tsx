// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   BarChart3,
//   GitCommit,
//   Home,
//   MessageSquare,
//   Settings,
//   Users,
//   Zap,
// } from "lucide-react";

// const navigation = [
//   { name: "Home", href: "/dashboard", icon: Home },
//   { name: "Timeline", href: "/dashboard/timeline", icon: GitCommit },
//   { name: "Analytics", href: "/dashboard/stats", icon: BarChart3 },
//   { name: "Collaborators", href: "/dashboard/collaborators", icon: Users },
//   { name: "Code Review", href: "/dashboard/review", icon: MessageSquare },
//   { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
// ];

// const bottomNav = [
//   { name: "Hotzones", href: "/dashboard/hotzones", icon: Zap },
//   { name: "Settings", href: "/settings", icon: Settings },
// ];

// export function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 min-h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col">
//       <div className="p-6">
//         <Link href="/dashboard" className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-white"
//             >
//               <path
//                 d="M12 2L2 7L12 12L22 7L12 2Z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 17L12 22L22 17"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2 12L12 17L22 12"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <span className="text-xl font-semibold text-text-heading">GitStory</span>
//         </Link>
//       </div>

//       <nav className="flex-1 px-3">
//         <div className="mb-6">
//           <p className="px-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wider">
//             Navigation
//           </p>
//           <ul className="space-y-1">
//             {navigation.map((item) => {
//               const isActive = pathname === item.href;
//               const Icon = item.icon;
//               return (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                       isActive
//                         ? "bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary"
//                         : "text-text-secondary hover:text-text-primary hover:bg-card-hover"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     {item.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <div className="mb-6">
//           <p className="px-3 mb-2 text-xs font-medium text-text-muted uppercase tracking-wider">
//             Workspace
//           </p>
//           <ul className="space-y-1">
//             {bottomNav.map((item) => {
//               const isActive = pathname === item.href;
//               const Icon = item.icon;
//               return (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                       isActive
//                         ? "bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary"
//                         : "text-text-secondary hover:text-text-primary hover:bg-card-hover"
//                     }`}
//                   >
//                     <Icon size={18} />
//                     {item.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </nav>

//       <div className="p-4 border-t border-sidebar-border">
//         <div className="bg-page-bg rounded-lg p-3">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs font-medium text-text-muted">PRO PLAN</span>
//             <span className="text-xs text-accent-success">Active</span>
//           </div>
//           <div className="w-full h-2 bg-page-bg-secondary rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-accent-primary to-accent-blue rounded-full"
//               style={{ width: "68%" }}
//             />
//           </div>
//           <p className="text-xs text-text-muted mt-1">6.8 GB / 10 GB</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Gauge,
  Network,
  GitBranch,
  Flame,
  MessageSquare
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Stats", href: "/dashboard/stats", icon: Gauge },
  { name: "Timeline", href: "/dashboard/timeline", icon: GitBranch },
  { name: "Hotzones", href: "/dashboard/hotzones", icon: Flame },
  { name: "Collaborators", href: "/dashboard/collaborators", icon: Network },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[80px] min-h-screen bg-[#08090D] border-r border-[#1F2937] flex flex-col items-center py-8 gap-5">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
        const Icon = item.icon;

        return (
          <div key={item.name} className="relative w-full flex justify-center group">
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00E6A4] rounded-r" />
            )}
            
            <Link
              href={item.href}
              title={item.name}
              className={`flex items-center justify-center w-[46px] h-[46px] rounded-2xl transition-all duration-200 ${
                isActive
                  ? "bg-[#00E6A4] text-[#08090D] shadow-[0_0_20px_rgba(0,230,164,0.2)]"
                  : "bg-[#11141D] border border-[#1F2937] text-[#C9D1D9] hover:border-[#30363D] hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          </div>
        );
      })}
    </aside>
  );
}