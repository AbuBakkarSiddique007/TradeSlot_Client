"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
} from "react";
import type { Trader } from "@/types";

interface AuthState {
  trader: Trader | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, trader: Trader) => void;
  logout: () => void;
  refreshTrader: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const token = useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem("token") : null),
    () => null
  );


  const traderRaw = useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem("trader") : null),
    () => null
  );

  let trader: Trader | null = null;
  if (traderRaw) {
    try {
      trader = JSON.parse(traderRaw) as Trader;
    } catch {
      trader = null;
    }
  }

  const login = useCallback((newToken: string, newTrader: Trader) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("trader", JSON.stringify(newTrader));

    document.cookie = `token=${newToken}; path=/; max-age=604800; SameSite=Lax`;
    window.dispatchEvent(new Event("storage"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("trader");

    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    window.dispatchEvent(new Event("storage"));
  }, []);

  const refreshTrader = useCallback(async () => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!storedToken) return;
    try {
      const { axiosSecure } = await import("@/hooks/useAxiosSecure");
      const res = await axiosSecure.get<{ success: boolean; data: Trader }>("/auth/me");
      const freshTrader = res.data.data;
      localStorage.setItem("trader", JSON.stringify(freshTrader));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Failed to refresh trader profile", err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        trader,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        refreshTrader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
