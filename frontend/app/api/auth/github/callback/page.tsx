"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleGithubCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;
    
    const code = searchParams.get("code");
    console.log("OAuth callback - code:", code);
    
    if (!code) {
      setError("No authorization code received");
      return;
    }

    setProcessed(true);

    handleGithubCallback(code)
      .then((result) => {
        console.log("OAuth success:", result);
        router.push("/dashboard");
      })
      .catch((err: any) => {
        console.error("OAuth error:", err);
        setError(err.message || "Failed to complete GitHub login");
      });
  }, [searchParams, handleGithubCallback, router, processed]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#F85149] mb-4">Authentication Failed</h1>
          <p className="text-[#8B949E] mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-[#00E6A4] hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin mx-auto mb-4" />
        <p className="text-[#8B949E]">Completing GitHub authentication...</p>
      </div>
    </div>
  );
}

export default function GithubCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00E6A4] animate-spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}