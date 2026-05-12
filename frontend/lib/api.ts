const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8005";

interface FetchOptions extends RequestInit {
  token?: string;
  onTokenExpired?: () => void;
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, onTokenExpired, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401) {
    if (onTokenExpired) {
      onTokenExpired();
    }
    throw new Error("Token has expired. Please log in again.");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || error.message || "Request failed");
  }

  const data = await response.json();
  return data.data || data;
}

export const api = {
  // Auth
  register: (email: string, password: string, name?: string) =>
    fetchApi("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    fetchApi("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  refreshToken: (refreshToken: string) =>
    fetchApi("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),

  // GitHub OAuth
  getGithubAuthUrl: () =>
    fetchApi("/api/auth/github/login"),

  githubCallback: (code: string) =>
    fetchApi("/api/auth/github/callback", {
      method: "POST",
      body: JSON.stringify({ code }),
    }),

  getProfile: (token: string) =>
    fetchApi("/api/auth/me", { token }),

  updateGithubToken: (token: string, githubToken: string) =>
    fetchApi("/api/auth/github-token", {
      method: "POST",
      token,
      body: JSON.stringify({ token: githubToken }),
    }),

  // Repositories
  getRepositories: (token: string) =>
    fetchApi("/api/repositories", { token }),

  getGithubRepositories: (token: string) =>
    fetchApi("/api/repositories/github", { token }),

  saveRepository: (token: string, repoData: object) =>
    fetchApi("/api/repositories", {
      method: "POST",
      token,
      body: JSON.stringify(repoData),
    }),

  // Analysis
  analyzeRepo: (token: string, repoTarget: string, isPrivate: boolean = false, githubToken?: string) =>
    fetchApi("/api/analyze", {
      method: "POST",
      token,
      body: JSON.stringify({
        repo_target: repoTarget,
        is_private: isPrivate,
        token: githubToken,
      }),
    }),

  indexRepo: (token: string, repoUrl: string, isPrivate: boolean = false, githubToken?: string) =>
    fetchApi<{ job_id: string; repo_name: string; message: string }>("/api/index-repo", {
      method: "POST",
      token,
      body: JSON.stringify({
        repo_url: repoUrl,
        is_private: isPrivate,
        token: githubToken,
      }),
    }),

  getIndexStatus: (token: string, jobId: string) =>
    fetchApi<{ status: string; repo_name?: string; error?: string }>(`/api/index-repo/status/${jobId}`, { token }),

  // Chat (returns SSE stream — caller should read response.body)
  chat: (token: string, message: string, repoName: string): Promise<Response> => {
    return fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, repo_name: repoName }),
    }).then((res) => {
      if (!res.ok) throw new Error("Chat request failed");
      return res;
    });
  },

  resetChat: (token: string, repoName: string) =>
    fetchApi("/api/chat/reset", {
      method: "POST",
      token,
      body: JSON.stringify({ repo_name: repoName }),
    }),

  // Timeline
  getTimeline: (token: string, repoUrl: string, options?: { onTokenExpired?: () => void }) =>
    fetchApi(`/api/timeline?repo_url=${encodeURIComponent(repoUrl)}`, { token, ...options }),

  // Hotzone
  getHotzone: (token: string, repoUrl: string, options?: { onTokenExpired?: () => void }) =>
    fetchApi(`/api/hotzone?repo_url=${encodeURIComponent(repoUrl)}`, { token, ...options }),

  // Stats
  getStats: (token: string, repoUrl: string, options?: { onTokenExpired?: () => void }) =>
    fetchApi(`/api/stats?repo_url=${encodeURIComponent(repoUrl)}`, { token, ...options }),

  // Collaborators
  getCollaborators: (token: string, repoUrl: string, options?: { onTokenExpired?: () => void }) =>
    fetchApi(`/api/collaborators?repo_url=${encodeURIComponent(repoUrl)}`, { token, ...options }),

  // Code Review
  codeReview: (token: string, repoUrl: string, githubToken: string, commitCount: number = 1) =>
    fetchApi("/api/review", {
      method: "POST",
      token,
      body: JSON.stringify({
        repo_url: repoUrl,
        github_token: githubToken,
        commit_count: commitCount,
      }),
    }),
};