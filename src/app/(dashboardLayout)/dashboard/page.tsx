"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { workAreaService } from "@/services/workArea.service";
import type { WorkArea } from "@/types";
import {
  CalendarClock,
  BadgePoundSterling,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { trader } = useAuth();
  const [todayWorkArea, setTodayWorkArea] = useState<WorkArea | null>(null);

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchTodayWorkArea = async () => {
      try {
        const todayStr = new Date().toISOString().split("T")[0];
        const data = await workAreaService.getWorkArea(todayStr);
        setTodayWorkArea(data);
      } catch (err) {
        console.error("Failed to load today's work area", err);
      }
    };

    fetchTodayWorkArea();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {trader ? `Welcome back, ${trader.name.split(" ")[0]}` : "Dashboard"}
          </h1>
          <p suppressHydrationWarning className="mt-1 text-sm text-slate-400">
            {formattedDate}
          </p>
        </div>

        <Link
          href="/dashboard/work-area"
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-850 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-500/50 hover:bg-slate-800"
        >
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          Manage Work Area
          <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Today&apos;s Bookings</span>
            <div className="rounded-lg p-2 bg-amber-500/10 border border-amber-500/20">
              <CalendarClock className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">--</p>
          <p className="mt-1 text-xs text-slate-500">No appointments scheduled</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Projected Net Earnings</span>
            <div className="rounded-lg p-2 bg-emerald-500/10 border border-emerald-500/20">
              <BadgePoundSterling className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">--</p>
          <p className="mt-1 text-xs text-slate-500">After platform fee</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Active Work Zone</span>
            <div className="rounded-lg p-2 bg-sky-500/10 border border-sky-500/20">
              <MapPin className="h-4 w-4 text-sky-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white truncate">
            {todayWorkArea ? todayWorkArea.zoneName : "Not Set"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {todayWorkArea ? "Operating zone active today" : "Set today's focus zone"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Stripe Status</span>
            <div className="rounded-lg p-2 bg-violet-500/10 border border-violet-500/20">
              <CreditCard className="h-4 w-4 text-violet-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white">
            {trader?.stripeOnboarded ? "Connected" : "Not Connected"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {trader?.stripeOnboarded ? "Ready for direct payouts" : "Connect Stripe Express"}
          </p>
        </div>
      </div>

      {!todayWorkArea && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">No operating zone set for today</h3>
                <p className="text-xs text-slate-400">
                  Set your daily zone so booking channels can offer slots within your intended travel radius.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/work-area"
              className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Set Operating Zone
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-12 text-center">
        <CalendarClock className="mx-auto mb-3 h-8 w-8 text-slate-600" />
        <p className="text-sm font-medium text-slate-500">
          Visual Travel Buffer Schedule will appear here
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Protecting 30-minute buffers between all customer jobs
        </p>
      </div>
    </div>
  );
}
