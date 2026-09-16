"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Home, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl space-y-6">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 stroke-[2]" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Payment Succeeded
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Your appointment has been scheduled and locked in with guaranteed 30-minute travel buffer protection.
          </p>
        </div>

        {bookingId && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left space-y-1">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Booking Reference
            </span>
            <p className="text-xs font-mono font-semibold text-amber-400 break-all">
              {bookingId}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-white">Smart Buffer Guarantee</p>
            <p className="text-slate-400">
              A 30-minute travel buffer has been added after your appointment to ensure your tradesperson arrives on schedule without overlaps.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-md shadow-amber-500/10"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/features"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-850 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            Learn How Buffer Works
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading confirmation...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
