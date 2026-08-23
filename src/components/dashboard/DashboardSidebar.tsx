"use client";

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
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Schedule", href: "/dashboard/schedule", icon: CalendarClock },
  { label: "Work Area", href: "/dashboard/work-area", icon: MapPin },
  { label: "Stripe Payouts", href: "/dashboard/stripe", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { trader, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6">
      {/* Brand */}
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20">
          <CalendarClock className="h-5 w-5 stroke-[2.2]" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          Trade<span className="text-amber-400">Slot</span>
        </span>
      </Link>

      {/* Trader info */}
      {trader && (
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
          <p className="text-sm font-semibold text-white truncate">{trader.name}</p>
          <p className="text-xs text-slate-400 truncate">{trader.businessName}</p>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4 flex-shrink-0" />
        Log out
      </button>
    </aside>
  );
}
