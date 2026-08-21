import React from "react";
import Link from "next/link";
import { 
  CalendarClock, 
  ArrowLeft, 
  Home, 
  Sparkles, 
  Search, 
  HelpCircle,
  Clock
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-16 text-center bg-grid-pattern">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shadow-2xl glow-amber">
          <Clock className="h-12 w-12 stroke-[1.8] animate-pulse" />
          <span className="absolute -bottom-2 -right-2 rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[10px] font-bold text-red-300">
            404
          </span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Buffer Window Missed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Slot Not Found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            The page or appointment slot you are looking for has been rescheduled, buffered out, or does not exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-md"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            Support Desk
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 block mb-3">Or navigate directly to:</span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-medium">
            <Link href="/features" className="hover:text-amber-400 transition">Features</Link>
            <span>•</span>
            <Link href="/how-it-works" className="hover:text-amber-400 transition">How It Works</Link>
            <span>•</span>
            <Link href="/pricing" className="hover:text-amber-400 transition">Pricing (£15 Flat Fee)</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-amber-400 transition">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
