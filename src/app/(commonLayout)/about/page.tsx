import React from "react";
import Link from "next/link";
import {
  CalendarClock,
  Target,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12 md:py-20 bg-grid-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Our Mission</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Built By People Who Respect the Trade
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We believe independent tradespeople shouldn&apos;t have to sacrifice their sanity to back-to-back traffic jams or forfeit half their profits to predatory directories.
        </p>
      </div>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">The Trade Travel Dilemma</h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Most booking software was built for barbers, nail salons, or software consultants sitting at a desk. They assume appointments happen in the same room, 1 minute apart.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            In reality, an electrician in London or Manchester is fighting red routes, parking restrictions, and congestion. Booking back-to-back jobs creates guaranteed delays, angry homeowners, and exhausting 14-hour days.
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>TradeSlot was built to fix this.</strong> By treating the 30-minute travel buffer as a first-class citizen in the scheduling engine and connecting intake directly to WhatsApp and Stripe Connect, tradespeople get their time and profitability back.
          </p>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <CalendarClock className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-white">Buffer Reality</h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              We never schedule back-to-back appointments without travel padding. Physical realism beats empty calendar optimization.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="text-base font-bold text-white">Fair Monetisation</h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              No subscription retainers or pay-for-clicks. A simple £15 flat fee when a confirmed job is secured and paid.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Frictionless Channels</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customers live on WhatsApp and instant web chat. We adapt the booking pipeline to where your customers already communicate.
            </p>
          </div>
        </div>
      </section>


      <div className="text-center pt-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-300 transition shadow-lg"
        >
          Contact the TradeSlot Team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
