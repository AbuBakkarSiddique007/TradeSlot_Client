import React from "react";
import { CalendarClock } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 animate-pulse">
        <CalendarClock className="h-8 w-8 animate-spin" />
      </div>
      <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
        Loading TradeSlot Engine...
      </div>
    </div>
  );
}
