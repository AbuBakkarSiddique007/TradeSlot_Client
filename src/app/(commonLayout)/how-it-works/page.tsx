"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  CalendarClock,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"trader" | "customer">("trader");

  return (
    <div className="flex flex-col gap-16 py-12 md:py-20 bg-grid-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interactive Workflow</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          How TradeSlot Works End-to-End
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From first message to confirmed booking and direct bank payout — see how our travel buffer engine keeps everyone on time.
        </p>

        <div className="inline-flex rounded-xl bg-slate-900 p-1.5 border border-slate-800 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("trader")}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition ${activeTab === "trader"
                ? "bg-amber-400 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
              }`}
          >
            For Tradespeople
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("customer")}
            className={`rounded-lg px-6 py-2 text-xs font-bold transition ${activeTab === "customer"
                ? "bg-amber-400 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
              }`}
          >
            For Homeowners / Customers
          </button>
        </div>
      </div>

      {activeTab === "trader" && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black text-xl shadow-lg shadow-amber-400/20">
                  01
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Sign Up & Connect Stripe Express</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Register your business profile in 60 seconds and complete one-click Stripe Connect onboarding. All customer booking payments will route directly to your nominated bank account.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Stripe Express Connect • Instant Verification</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 font-black text-xl shadow-lg shadow-cyan-400/20">
                  02
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Set Today&apos;s Active Work Zone</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Each morning, set your working territory (e.g. &quot;North West London&quot; or postcode &quot;NW3&quot;). TradeSlot prioritises customers within your designated zone and filters out non-viable travel requests.
                </p>
                <div className="flex items-center gap-2 text-xs text-cyan-400 pt-1 font-mono">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Daily Zone Control • Zero Unwanted Driving</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 font-black text-xl shadow-lg shadow-emerald-400/20">
                  03
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Hands-Free Buffer Scheduling & Payouts</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Customers book via WhatsApp or Webchat. The TradeSlot engine calculates free slots, pads a mandatory 30-minute buffer after each job, captures the £15 platform fee, and confirms the paid appointment in your calendar.
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-400 pt-1 font-mono">
                  <CalendarClock className="h-3.5 w-3.5" />
                  <span>30m Buffer Protected • Net Payout Direct to Bank</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "customer" && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 font-black text-xl">
                  01
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Send Message via WhatsApp or Webchat</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Describe what you need (e.g., &quot;Gas boiler safety certificate in Fulham&quot;). No phone queues or waiting for callbacks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black text-xl">
                  02
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Select an Available Protected Slot</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The chatbot presents realistic available time slots calculated with live travel buffers, ensuring the tradesperson actually turns up on time.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
              <div className="md:col-span-2 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 font-black text-xl">
                  03
                </div>
              </div>
              <div className="md:col-span-10 space-y-2">
                <h3 className="text-xl font-bold text-white">Secure Checkout & Confirmation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pay securely with Apple Pay, Google Pay, or Card via Stripe. You immediately receive a confirmed booking receipt and WhatsApp reminders.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="text-center pt-8">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-300 transition shadow-lg shadow-amber-500/20"
        >
          Check Transparent Pricing <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
