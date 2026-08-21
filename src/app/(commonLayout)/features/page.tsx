import React from "react";
import Link from "next/link";
import {
  Clock,
  MessageSquare,
  CreditCard,
  MapPin,
  ShieldCheck,
  Zap,
  Bot,
  Smartphone,
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-16 py-12 md:py-20 bg-grid-pattern">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Core Platform Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Travel Buffers and Split Payments
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Every feature in TradeSlot is purposefully designed around the physical realities of mobile tradespeople operating in busy UK zones.
        </p>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
              <Clock className="h-4 w-4" />
              <span>CORE PILLAR 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Automated 30-Minute Travel Buffer Scheduling
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard calendar tools book jobs back-to-back. When an appointment runs over or traffic hits, the entire day collapses into delayed arrivals. TradeSlot injects a mandatory 30-minute travel buffer after every single booking.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                <span>Automatic check within trader working hours (e.g. 08:00 - 18:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                <span>Conflict-free time window check: <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300">T_start ≥ E_i + Buffer</code></span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-amber-400" />
                <span>Modular engine ready for live routing upgrades without touching booking models</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Buffer Mathematical Model</div>
            <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
              <div className="text-slate-500">Booking Slot Calculation</div>
              <div>Duration = 60 mins</div>
              <div>Buffer = 30 mins</div>
              <div className="text-amber-400">Buffered Window = [T_start, T_end + 30m]</div>
              <div className="text-emerald-400 pt-1">No Overlap Check Enforced</div>
            </div>
          </div>
        </div>
      </section>

      <section id="channels" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="lg:col-span-5 order-2 lg:order-1 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unified Intake Pipeline</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs text-emerald-300">
                <Smartphone className="h-4 w-4 text-emerald-400" />
                <span>Inbound WhatsApp Webhook</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 p-3 text-xs text-cyan-300">
                <Bot className="h-4 w-4 text-cyan-400" />
                <span>Inbound Web Chatbot API</span>
              </div>
              <div className="flex items-center justify-center p-2 text-slate-500 font-mono text-xs">
                Normalized into Channel Adapter
              </div>
              <div className="rounded-lg bg-amber-950/40 border border-amber-500/30 p-3 text-xs text-amber-300 font-semibold text-center">
                Unified Booking Engine and Buffer Math
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <MessageSquare className="h-4 w-4" />
              <span>CORE PILLAR 02</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Two Channels, One Shared Booking Engine
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Customers expect to message trades via WhatsApp while browsing on mobile or use an instant chat widget on the website. TradeSlot normalises both streams into a single booking engine so your calendar never fragments.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Handles interactive slot offers and payment checkout link generation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Session state machine: INITIAL to OFFERED to PAYMENT to CONFIRMED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="payouts" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400">
              <CreditCard className="h-4 w-4" />
              <span>CORE PILLAR 03</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Stripe Connect Express Split Payouts
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              No invoicing headaches or chasing unpaid bank transfers. When a customer confirms a slot, payment is captured via Stripe. The flat £15 platform application fee is retained, and the remainder is routed instantly to the trader.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-cyan-400" />
                <span>One-click onboarding via Stripe Express Connect</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-cyan-400" />
                <span>Destination charges with automated application fee capture</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-cyan-400" />
                <span>Webhook-driven status synchronisation for instant booking confirmation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example Split Breakdown</div>
            <div className="space-y-2.5">
              <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-xs flex justify-between">
                <span className="text-slate-400">Total Customer Charge:</span>
                <span className="font-mono font-bold text-white">£150.00</span>
              </div>
              <div className="rounded-lg bg-amber-950/30 border border-amber-500/20 p-3 text-xs flex justify-between text-amber-300">
                <span>Platform Application Fee:</span>
                <span className="font-mono font-bold">£15.00</span>
              </div>
              <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs flex justify-between text-emerald-300 font-bold">
                <span>Trader Net Direct Payout:</span>
                <span className="font-mono">£135.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="lg:col-span-5 order-2 lg:order-1 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Daily Work Area</div>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Today&apos;s Date:</span>
                <span className="font-mono text-amber-400">2026-08-22</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Declared Zone:</span>
                <span className="font-semibold text-white">South West London (SW1-SW19)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Geofence filter active for inbound requests</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-purple-400">
              <MapPin className="h-4 w-4" />
              <span>CORE PILLAR 04</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Daily Operating Zone and Geofencing
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traders don&apos;t want to spend 3 hours driving across counties for a 45-minute job. Each morning, a trader sets their active daily work area or postcode cluster. Inbound bookings outside the zone can be filtered or flagged.
            </p>
          </div>
        </div>
      </section>

      <div className="text-center pt-8">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-300 transition shadow-lg shadow-amber-500/20"
        >
          View Pricing Breakdown <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
