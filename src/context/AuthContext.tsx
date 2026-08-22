"use client";

import { createContext, useContext, useState } from "react";
import type { Trader } from "@/types";

interface AuthState {
  trader: Trader | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, trader: Trader) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  });

  const [trader, setTrader] = useState<Trader | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("trader");
    return stored ? (JSON.parse(stored) as Trader) : null;
  });

  const login = (token: string, trader: Trader) => {
    localStorage.setItem("token", token);
    localStorage.setItem("trader", JSON.stringify(trader));
    setToken(token);
    setTrader(trader);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("trader");
    setToken(null);
    setTrader(null);
  };

  return (
    <AuthContext.Provider
      value={{ trader, token, isAuthenticated: !!token, login, logout }}
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
