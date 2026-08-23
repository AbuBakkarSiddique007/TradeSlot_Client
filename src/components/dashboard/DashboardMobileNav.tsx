"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CalendarClock,
  LayoutDashboard,
  MapPin,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Schedule", href: "/dashboard/schedule", icon: CalendarClock },
  { label: "Work Area", href: "/dashboard/work-area", icon: MapPin },
  { label: "Stripe Payouts", href: "/dashboard/stripe", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { trader, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950">
            <CalendarClock className="h-4.5 w-4.5 stroke-[2.2]" />
          </div>
          <span className="text-base font-bold text-white">
            Trade<span className="text-amber-400">Slot</span>
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Drawer */}
      {open && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 py-4 md:hidden">
          {trader && (
            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <p className="text-sm font-semibold text-white">{trader.name}</p>
              <p className="text-xs text-slate-400">{trader.businessName}</p>
            </div>
          )}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
