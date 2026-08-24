"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Home, MessageSquare, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function BookingCancelledContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl space-y-6">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <AlertCircle className="h-10 w-10 stroke-[2]" />
        </div>


        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Checkout Incomplete
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Your booking was not confirmed because payment was cancelled. Your slot is still open for a limited time.
          </p>
        </div>

        {bookingId && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left space-y-1">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Reference
            </span>
            <p className="text-xs font-mono font-semibold text-slate-300 break-all">
              {bookingId}
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-md shadow-amber-500/10"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-850 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <MessageSquare className="h-4 w-4 text-slate-400" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingCancelledPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading...</div>}>
      <BookingCancelledContent />
    </Suspense>
  );
}
