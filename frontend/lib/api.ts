// frontend/lib/api.ts
import type { User } from "./authTypes";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Error GET ${path}: ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Error POST ${path}: ${res.status}`);
  }
  return res.json();
}

export async function upgradeUserToPremium(userId: number): Promise<{ user: User }> {
  return apiPost("/auth/upgrade", { userId });
}
