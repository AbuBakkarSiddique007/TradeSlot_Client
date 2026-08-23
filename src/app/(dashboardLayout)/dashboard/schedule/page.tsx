"use client";

import { CalendarClock } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Travel Buffer Schedule</h1>
        <p className="mt-1 text-sm text-slate-400">
          Visual daily diary of appointments with protected 30-minute buffer periods between jobs.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-16 text-center">
        <CalendarClock className="mx-auto mb-3 h-10 w-10 text-amber-400/80" />
        <h3 className="text-base font-semibold text-white">Daily Booking Diary</h3>
        <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
          Interactive schedule timeline with 30-min travel buffer blocks will be configured in Phase 7.
        </p>
      </div>
    </div>
  );
}
