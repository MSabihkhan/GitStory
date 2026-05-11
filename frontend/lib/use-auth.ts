import { useRouter } from "next/navigation";
import { api } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface StoredAuth {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export function useAuth() {
  const router = useRouter();

  const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("gitstory_auth");
    if (stored) {
      const auth: StoredAuth = JSON.parse(stored);
      return auth.access_token;
    }
    return null;
  };

  const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("gitstory_auth");
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.detail || "Invalid credentials");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("gitstory_auth", JSON.stringify(data.data));
    }

    return data;
  };

  const loginWithGithub = async () => {
    try {
      const data = await api.getGithubAuthUrl() as any;
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (err) {
      console.error("Failed to get GitHub auth URL:", err);
      throw new Error("Failed to initiate GitHub login");
    }
  };

  const handleGithubCallback = async (code: string) => {
    const data = await api.githubCallback(code) as any;
    if (data?.access_token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("gitstory_auth", JSON.stringify(data));
      }
      return data;
    }
    throw new Error("OAuth failed");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gitstory_auth");
    }
    router.push("/login");
  };

  const register = async (email: string, password: string, name?: string) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.detail || "Registration failed");
    }

    await login(email, password);
    return data;
  };

  return {
    isLoading: false,
    isAuthenticated: isAuthenticated(),
    getAccessToken,
    login,
    loginWithGithub,
    handleGithubCallback,
    logout,
    register,
  };
}