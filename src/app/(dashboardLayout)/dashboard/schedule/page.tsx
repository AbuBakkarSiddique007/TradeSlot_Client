"use client";

import { ScheduleTimeline } from "@/components/dashboard/ScheduleTimeline";

export default function SchedulePage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Travel Buffer Schedule</h1>
        <p className="mt-1 text-sm text-slate-400">
          Visual daily diary of appointments with guaranteed 30-minute travel buffers automatically scheduled between all jobs.
        </p>
      </div>

      <ScheduleTimeline />
    </div>
  );
}
