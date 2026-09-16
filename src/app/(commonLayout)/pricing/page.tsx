"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator
} from "lucide-react";

export default function PricingPage() {
  const [jobPrice, setJobPrice] = useState(120);
  const [monthlyJobs, setMonthlyJobs] = useState(25);

  const totalMonthlyRevenue = jobPrice * monthlyJobs;
  const tradeSlotFees = 15 * monthlyJobs;
  const netEarnings = totalMonthlyRevenue - tradeSlotFees;
  const competitorFee = totalMonthlyRevenue * 0.20;
  const savings = competitorFee - tradeSlotFees;

  return (
    <div className="flex flex-col gap-16 py-12 md:py-20 bg-grid-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Simple, Honest, Transparent</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flat £15 Per Booking. That&apos;s It.
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No £300/month directory retainers. No bidding against 5 other plumbers for worthless cold leads. You only pay when you have a confirmed, paid booking.
        </p>
      </div>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-amber-400/80 bg-slate-900/90 p-8 sm:p-12 shadow-2xl glow-amber relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/20 mb-2">
                PAY-PER-BOOKING PLAN
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The TradeSlot Engine</h2>
              <p className="text-xs text-slate-400 mt-1">Full access to 30-min buffer scheduling, WhatsApp intake, and Stripe payouts.</p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-4xl sm:text-5xl font-black text-amber-400">
                £15.00
              </div>
              <span className="text-xs text-slate-400">flat platform fee per confirmed job</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>30-minute automatic travel buffer protection</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Dual WhatsApp & Web Chatbot intake pipeline</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Direct bank payouts via Stripe Connect Express</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Daily active operating zone geofencing</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>£0 monthly subscription or lock-in contract</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Automated customer booking confirmation & receipts</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>No credit card needed to register your profile</span>
            </div>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-300 transition"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Calculator className="h-5 w-5" />
            <h3 className="text-lg font-bold text-white">Earnings & Savings Calculator</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Average Job Charge (£):</span>
                  <span className="font-bold text-amber-400 font-mono">£{jobPrice}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="500"
                  step="10"
                  value={jobPrice}
                  onChange={(e) => setJobPrice(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Completed Jobs Per Month:</span>
                  <span className="font-bold text-amber-400 font-mono">{monthlyJobs}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={monthlyJobs}
                  onChange={(e) => setMonthlyJobs(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Monthly Revenue:</span>
                <span className="font-mono font-bold text-white">£{totalMonthlyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>TradeSlot Flat Platform Fees (£15 × {monthlyJobs}):</span>
                <span className="font-mono font-bold">£{tradeSlotFees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-2 text-sm">
                <span>Your Net Payout:</span>
                <span className="font-mono">£{netEarnings.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2 text-emerald-300 text-[11px] flex justify-between items-center">
                  <span>Savings vs 20% platform cut:</span>
                  <span className="font-bold font-mono">+£{savings.toLocaleString()} / mo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-xl font-bold text-white text-center">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <h4 className="text-sm font-bold text-slate-200">How does the £15 fee get captured?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a customer completes Stripe Checkout, TradeSlot specifies an <code className="text-amber-300">application_fee_amount</code> of £15.00. The remainder of the payment transfers directly into your connected bank account automatically.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <h4 className="text-sm font-bold text-slate-200">What if a customer cancels?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              If a booking is cancelled before the buffer window or job starts, the slot opens back up automatically on both WhatsApp and Webchat.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <h4 className="text-sm font-bold text-slate-200">Can I change my working hours?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yes, default working hours are 08:00 to 18:00, but can be tailored per trader profile in your dashboard.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
            <h4 className="text-sm font-bold text-slate-200">Are there any hidden subscription costs?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              None. You pay zero monthly fees. You only pay £15 when a real customer books and pays for a job.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
