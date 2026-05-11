import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const getAccessToken = () => (session?.user as any)?.accessToken;

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const loginWithGithub = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const register = async (email: string, password: string, name?: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Registration failed");
    }

    // Auto-login after registration
    await login(email, password);

    return data;
  };

  return {
    session,
    isLoading,
    isAuthenticated,
    getAccessToken,
    login,
    loginWithGithub,
    logout,
    register,
  };
}