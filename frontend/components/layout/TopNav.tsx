// "use client";

// import { Bell, ChevronDown, GitBranch, Search, Settings } from "lucide-react";
// import { useState } from "react";

// export function TopNav() {
//   const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);

//   return (
//     <header className="h-16 bg-page-bg-secondary border-b border-sidebar-border flex items-center px-6">
//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <button
//             onClick={() => setRepoDropdownOpen(!repoDropdownOpen)}
//             className="flex items-center gap-2 px-3 py-2 rounded-lg bg-page-bg border border-sidebar-border hover:border-sidebar-border/80 transition-colors"
//           >
//             <GitBranch size={16} className="text-text-secondary" />
//             <span className="text-sm font-medium text-text-primary">GitStory</span>
//             <span className="text-xs text-text-muted">/</span>
//             <span className="text-sm text-text-secondary">frontend</span>
//             <ChevronDown size={14} className="text-text-muted" />
//           </button>
//           {repoDropdownOpen && (
//             <div className="absolute top-full left-0 mt-2 w-64 bg-card-bg border border-sidebar-border rounded-lg shadow-lg z-50">
//               <div className="p-2">
//                 <p className="px-3 py-2 text-xs text-text-muted">Recent Repositories</p>
//                 <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-card-hover rounded-lg">
//                   <GitBranch size={14} className="text-text-secondary" />
//                   frontend
//                 </button>
//                 <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-card-hover rounded-lg">
//                   <GitBranch size={14} className="text-text-secondary" />
//                   backend
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-1 max-w-xl mx-8">
//         <div className="relative">
//           <Search
//             size={16}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
//           />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-10 pr-4 py-2 bg-page-bg border border-sidebar-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
//           />
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
//           <Bell size={18} />
//           <span className="absolute top-1 right-1 w-2 h-2 bg-accent-critical rounded-full" />
//         </button>
//         <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-card-hover rounded-lg transition-colors">
//           <Settings size={18} />
//         </button>
//         <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center">
//           <span className="text-sm font-medium text-white">AK</span>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  const currentRoute = pathname;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Timeline", href: "/dashboard/timeline" },
    { name: "Stats", href: "/dashboard/stats" },
    { name: "Hotzones", href: "/dashboard/hotzones" },
    { name: "Collaborators", href: "/dashboard/collaborators" },
    { name: "Chat", href: "/dashboard/chat" },
  ];

  return (
    <header className="h-[72px] bg-[#08090D] border-b border-[#1F2937] flex items-center justify-between px-8 select-none">
      
      <div className="flex items-center gap-12">
        <div className="text-[14px] font-black text-white tracking-[0.15em] uppercase">
          GITSTORY
        </div>

        <nav className="flex items-center gap-8 text-[13px] font-medium pt-1">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.href || currentRoute.startsWith(link.href + "/");
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`transition-colors pb-1 ${
                  isActive 
                    ? "text-[#00E6A4] border-b-2 border-[#00E6A4]" 
                    : "text-[#484F58] hover:text-[#C9D1D9]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#00E6A4] hover:opacity-80 transition-opacity">
          <Settings size={20} strokeWidth={2.5} />
        </button>
        
        <button className="w-9 h-9 rounded-full bg-[#1F2937] flex items-center justify-center text-[11px] font-bold text-[#00E6A4] border border-[#30363D] hover:border-[#00E6A4]/50 transition-colors shadow-inner">
          AM
        </button>
      </div>
      
    </header>
  );
}