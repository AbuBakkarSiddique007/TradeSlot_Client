"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CalendarClock,
  Menu,
  X,
  Zap,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book a Trade", href: "/book" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform hover:scale-102"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20">
            <CalendarClock className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">
                Trade<span className="text-amber-400">Slot</span>
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 -mt-1 font-medium">
              Smart Buffer Engine
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isBook = link.href === "/book";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isBook
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25"
                  : isActive
                    ? "bg-amber-400/10 text-amber-300 border border-amber-400/20"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm shadow-amber-500/20 transition hover:brightness-110 active:scale-98"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-400" />
                Trader Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm shadow-amber-500/20 transition hover:brightness-110 active:scale-98"
              >
                <Zap className="h-3.5 w-3.5 fill-slate-950" />
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isBook = link.href === "/book";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition ${isBook
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    : isActive
                      ? "bg-amber-400/10 text-amber-300 font-semibold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-300"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                  >
                    <LogIn className="h-4 w-4 text-slate-400" />
                    Trader Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-amber-300"
                  >
                    <Zap className="h-4 w-4 fill-slate-950" />
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
