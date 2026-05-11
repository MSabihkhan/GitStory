// // VISUAL AUDIT — A-01 Create Account.png
// // Background: #0D1117 with animated particle network
// // Card background: #161B22 at 80% opacity with backdrop blur
// // Border color: #30363D
// // Primary button: #8B5CF6
// // Input background: #0D1117
// // Text colors: #F8FAFC (headings), #F0F6FC (body), #8B949E (secondary)
// // Font: Inter, system-ui
// // Layout: Centered card, max-width 400px
// // Unique elements: Animated particle background, "ENTERPRISE GRADE ENCRYPTION" badge

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: N/A
// // If any NO: None

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { Mail, Lock, User, Shield, Loader2 } from "lucide-react";
// import { useAuth } from "@/lib/use-auth";

// export default function SignupPage() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationId: number;
//     const particles: { x: number; y: number; vx: number; vy: number }[] = [];
//     const particleCount = 80;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//       });
//     }

//     const draw = () => {
//       ctx.fillStyle = "#0D1117";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = "#8B5CF644";
//         ctx.fill();
//       });

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 120) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
//             ctx.stroke();
//           }
//         }
//       }

//       animationId = requestAnimationFrame(draw);
//     };
//     draw();

//     return () => {
//       window.removeEventListener("resize", resize);
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await register(email, password, name);
//       window.location.href = "/dashboard";
//     } catch (err: any) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0D1117] relative overflow-hidden flex items-center justify-center p-6">
//       <canvas ref={canvasRef} className="absolute inset-0" />

//       <div className="relative w-full max-w-md">
//         <div className="bg-[#161B22]/80 backdrop-blur-xl border border-[#30363D] rounded-xl p-8">
//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
//                   <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Heading */}
//           <div className="text-center mb-6">
//             <h1 className="text-2xl font-bold text-[#F8FAFC] mb-2">Create your account</h1>
//             <p className="text-sm text-[#8B949E]">Start exploring repositories today</p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-[#3F1E1E] border border-[#F85149] rounded-lg text-sm text-[#F85149]">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#F0F6FC] mb-2">Full Name</label>
//                 <div className="relative">
//                   <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" />
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#F0F6FC] placeholder:text-[#484F58] focus:outline-none focus:border-[#8B5CF6] transition-colors"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#F0F6FC] mb-2">Work Email</label>
//                 <div className="relative">
//                   <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" />
//                   <input
//                     type="email"
//                     placeholder="you@company.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#F0F6FC] placeholder:text-[#484F58] focus:outline-none focus:border-[#8B5CF6] transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#F0F6FC] mb-2">Password</label>
//                 <div className="relative">
//                   <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" />
//                   <input
//                     type="password"
//                     placeholder="Create a strong password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#F0F6FC] placeholder:text-[#484F58] focus:outline-none focus:border-[#8B5CF6] transition-colors"
//                     required
//                     minLength={8}
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     Creating account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Footer Links */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-[#8B949E]">
//               Already have an account?{" "}
//               <Link href="/login" className="text-[#58A6FF] hover:text-[#79B8FF] transition-colors font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>

//           {/* Footer Links & Badge */}
//           <div className="mt-6 pt-6 border-t border-[#30363D]">
//             <div className="flex items-center justify-center gap-4 text-xs text-[#484F58]">
//               <Link href="#" className="hover:text-[#8B949E] transition-colors">Privacy Policy</Link>
//               <Link href="#" className="hover:text-[#8B949E] transition-colors">Terms of Service</Link>
//               <Link href="#" className="hover:text-[#8B949E] transition-colors">Security</Link>
//             </div>
//             <div className="flex items-center justify-center gap-2 mt-4">
//               <Shield size={12} className="text-[#22C55E]" />
//               <span className="text-xs font-medium text-[#22C55E]">ENTERPRISE GRADE ENCRYPTION</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password, name);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[420px]">
        
        {/* Main Card */}
        <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Logo / Branding */}
          <div className="text-[10px] font-black text-[#00E6A4] tracking-widest mb-10">
            GITSTORY
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-xl font-bold text-white tracking-wide mb-2">CREATE ACCOUNT</h1>
            <p className="text-[11px] text-[#484F58] font-medium max-w-[260px] mx-auto leading-relaxed">
              Define your presence within the temporal repository.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-[#3F1E1E]/50 border border-[#F85149]/50 rounded-lg text-xs text-[#F85149] text-center tracking-wide">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-bold text-[#484F58] tracking-[0.2em] uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="dev_gitstory.io"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#08090D] border border-[#1F2937] rounded-lg text-sm text-[#C9D1D9] placeholder:text-[#30363D] focus:outline-none focus:border-[#00E6A4]/50 transition-colors shadow-inner"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-[#484F58] tracking-[0.2em] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="dev@gitstory.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#08090D] border border-[#1F2937] rounded-lg text-sm text-[#C9D1D9] placeholder:text-[#30363D] focus:outline-none focus:border-[#00E6A4]/50 transition-colors shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-[#484F58] tracking-[0.2em] uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-[#08090D] border border-[#1F2937] rounded-lg text-sm text-[#C9D1D9] placeholder:text-[#30363D] focus:outline-none focus:border-[#00E6A4]/50 transition-colors shadow-inner tracking-widest"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#484F58] hover:text-[#8B949E] transition-colors"
                >
                  <Eye size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-8 py-3.5 bg-[#00E6A4] text-[#08090D] text-[10px] font-black tracking-[0.15em] uppercase rounded-full hover:bg-[#00E6A4]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00E6A4]/10"
            >
              {loading ? "INITIALIZING..." : "INITIALIZE TIMELINE"} 
              {!loading && <ArrowRight size={14} strokeWidth={3} />}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-[11px] font-medium">
            <span className="text-[#484F58]">Existing authorized user?</span>
            <Link href="/login" className="text-[#00E6A4] hover:opacity-80 transition-opacity flex items-center gap-1">
              Sign In <ArrowRight size={10} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}