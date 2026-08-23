"use client";

import { WorkAreaCard } from "@/components/dashboard/WorkAreaCard";

export default function WorkAreaPage() {
  return (
    <div className="max-w-4xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">Daily Work Area</h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure where you are operating on any given day to cluster appointments and maintain tight 30-minute travel buffers.
        </p>
      </div>

      <WorkAreaCard />
    </div>
  );
}
