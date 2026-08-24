"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { workAreaService } from "@/services/workArea.service";
import { scheduleService } from "@/services/schedule.service";
import type { WorkArea, DailyScheduleResponse } from "@/types";
import {
  CalendarClock,
  BadgePoundSterling,
  MapPin,
  CreditCard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage() {
  const { trader } = useAuth();
  const [todayWorkArea, setTodayWorkArea] = useState<WorkArea | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<DailyScheduleResponse | null>(null);

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadDashboardData() {
      try {
        const todayStr = new Date().toISOString().split("T")[0];
        const [areaData, scheduleData] = await Promise.all([
          workAreaService.getWorkArea(todayStr).catch(() => null),
          scheduleService.getDailySchedule(todayStr).catch(() => null),
        ]);

        if (!isCancelled) {
          setTodayWorkArea(areaData);
          setTodaySchedule(scheduleData);
        }

      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load dashboard overview data", err);
        }
      }
    }

    loadDashboardData();

    return () => {
      isCancelled = true;
    };
    
  }, []);

  const bookings = todaySchedule?.bookings ?? [];
  const bookingsCount = bookings.length;
  const netEarnings = bookings.reduce((sum, b) => {
    const net = b.totalPrice > 15 ? b.totalPrice - 15 : b.totalPrice;
    return sum + net;
  }, 0);

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

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/schedule"
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 shadow-sm"
          >
            <CalendarClock className="h-3.5 w-3.5" />
            View Today&apos;s Schedule
          </Link>
          <Link
            href="/dashboard/work-area"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-850 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-500/50 hover:bg-slate-800"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            Manage Work Area
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Today&apos;s Bookings</span>
            <div className="rounded-lg p-2 bg-amber-500/10 border border-amber-500/20">
              <CalendarClock className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{bookingsCount}</p>
          <p className="mt-1 text-xs text-slate-500">
            {bookingsCount === 0 ? "No appointments today" : `${bookingsCount} confirmed jobs`}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Projected Net Earnings</span>
            <div className="rounded-lg p-2 bg-emerald-500/10 border border-emerald-500/20">
              <BadgePoundSterling className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {bookingsCount > 0 ? `£${netEarnings.toFixed(2)}` : "£0.00"}
          </p>
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

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Today&apos;s Travel Buffer Schedule</h2>
          </div>
          <Link
            href="/dashboard/schedule"
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            Open Interactive Timeline
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            <ShieldCheck className="mx-auto mb-2 h-7 w-7 text-slate-600" />
            <p className="text-sm font-medium text-slate-400">No appointments booked for today yet</p>
            <p className="text-xs text-slate-600 mt-0.5">
              Available slots are open for automated intake with 30-minute buffers.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 font-bold text-amber-400 border border-amber-500/20">
                    {new Date(b.startTime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{b.serviceDescription}</p>
                    <p className="text-slate-400 text-[11px]">{b.customerName} • {b.customerLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400/80 font-mono text-[11px] hidden sm:inline">
                    +30m buffer protected
                  </span>
                  <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[11px] font-semibold border border-emerald-500/20">
                    {b.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
