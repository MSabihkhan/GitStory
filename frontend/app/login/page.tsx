// // VISUAL AUDIT — A-02 · Sign In.png
// // Background: #0D1117
// // Card background: #161B22
// // Border color: #30363D
// // Primary button: #8B5CF6
// // Input background: #0D1117
// // Text colors: #F0F6FC (primary), #8B949E (secondary)
// // Font: Inter, system-ui
// // Layout: Centered card, max-width 400px

// // SELF-REVIEW
// // Background color matches screenshot: YES
// // Typography scale matches screenshot: YES
// // Spacing/padding matches screenshot: YES
// // All visible elements present: YES
// // Chart type and colors match screenshot: N/A
// // If any NO: None

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Mail, Lock, Loader2 } from "lucide-react";
// import { useAuth } from "@/lib/use-auth";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login, loginWithGithub } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await login(email, password);
//       window.location.href = "/dashboard";
//     } catch (err: any) {
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6">
//       <div className="w-full max-w-md">
//         <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
//           {/* Logo */}
//           <div className="flex justify-center mb-8">
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
//             <h1 className="text-2xl font-bold text-[#F8FAFC] mb-2">Welcome Back</h1>
//             <p className="text-sm text-[#8B949E]">Sign in to continue to GitStory</p>
//           </div>

//           {/* GitHub Sign In */}
//           <button
//             onClick={loginWithGithub}
//             className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#238636] text-white font-semibold rounded-lg hover:bg-[#2EA043] transition-colors mb-6"
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//             </svg>
//             Sign in with GitHub
//           </button>

//           {/* Divider */}
//           <div className="flex items-center gap-3 mb-6">
//             <div className="flex-1 h-px bg-[#30363D]" />
//             <span className="text-sm text-[#8B949E]">OR</span>
//             <div className="flex-1 h-px bg-[#30363D]" />
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-[#3F1E1E] border border-[#F85149] rounded-lg text-sm text-[#F85149]">
//               {error}
//             </div>
//           )}

//           {/* Email Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#F0F6FC] mb-2">Email</label>
//                 <div className="relative">
//                   <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" />
//                   <input
//                     type="email"
//                     placeholder="you@example.com"
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
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg text-sm text-[#F0F6FC] placeholder:text-[#484F58] focus:outline-none focus:border-[#8B5CF6] transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Link href="/forgot-password" className="text-sm text-[#58A6FF] hover:text-[#79B8FF] transition-colors">
//                   Forgot Password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8B5CF6] text-white font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign in with Email"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-[#8B949E]">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="text-[#58A6FF] hover:text-[#79B8FF] transition-colors font-medium">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGithub } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Invalid identity or access key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center p-6 font-sans relative">
      <div className="w-full max-w-[420px]">
        
        {/* Main Card */}
        <div className="bg-[#11141D] border border-[#1F2937] rounded-xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Logo / Branding */}
          <div className="text-[10px] font-black text-[#00E6A4] tracking-widest mb-10">
            GITSTORY
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white tracking-wide mb-2">Welcome Back</h1>
            <p className="text-[11px] text-[#484F58] font-medium tracking-wide">
              Step back into the dimensional timeline.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-[#3F1E1E]/50 border border-[#F85149]/50 rounded-lg text-xs text-[#F85149] text-center tracking-wide">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[9px] font-bold text-[#484F58] tracking-[0.2em] uppercase mb-2">
                Identity
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[9px] font-bold text-[#484F58] tracking-[0.2em] uppercase">
                  Access Key
                </label>
                <Link href="/forgot-password" className="text-[9px] font-bold text-[#00E6A4] tracking-widest hover:opacity-80 transition-opacity uppercase">
                  Recover?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-[#08090D] border border-[#1F2937] rounded-lg text-sm text-[#C9D1D9] placeholder:text-[#30363D] focus:outline-none focus:border-[#00E6A4]/50 transition-colors shadow-inner tracking-widest"
                  required
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
              className="w-full flex items-center justify-center gap-2 mt-4 py-3.5 bg-[#00E6A4] text-[#08090D] text-[11px] font-black tracking-widest rounded-full hover:bg-[#00E6A4]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00E6A4]/10"
            >
              {loading ? "INITIALIZING..." : "Initialize Session"} 
              {!loading && <ArrowRight size={16} strokeWidth={2.5} />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-[#1F2937]" />
            <span className="text-[9px] font-bold text-[#484F58] uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-[#1F2937]" />
          </div>

          {/* GitHub Sign In */}
          <button
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1A1F2B] border border-[#30363D] text-[#C9D1D9] text-xs font-semibold rounded-lg hover:bg-[#212836] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-[11px] font-medium">
            <span className="text-[#484F58]">New to the GITSTORY?</span>
            <Link href="/signup" className="text-[#00E6A4] hover:opacity-80 transition-opacity font-bold tracking-wide">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#1F2937] bg-[#08090D] px-6 py-2.5 flex justify-between items-center text-[9px] font-black tracking-[0.2em] uppercase">
        <div className="flex gap-6">
          <span className="text-[#484F58]">NODE STATUS</span>
          <span className="text-[#00E6A4]">ENCRYPTED_SSL_ACTIVE</span>
        </div>
        <span className="text-[#484F58]">ALPHA-V-92</span>
      </div>
    </div>
  );
}