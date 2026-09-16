"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  MessageSquare,
  CreditCard,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Check,
  X as XIcon,
  Navigation
} from "lucide-react";

export default function HomePage() {
  const [selectedSlot, setSelectedSlot] = useState("09:00 - 10:00");
  const [jobType] = useState("Boiler Servicing (60 mins)");

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden bg-grid-pattern">
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Smart Booking Engine for UK Trades</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Never Run Late Again. <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400 bg-clip-text text-transparent">
                  Smart Travel-Buffer
                </span>{" "}
                Booking.
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                TradeSlot automates job intake via <strong>WhatsApp & Webchat</strong>, enforces mandatory <strong>30-minute travel buffers</strong> between appointments, and captures flat £15 platform fees directly via <strong>Stripe Connect</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:brightness-110 hover:shadow-amber-500/40 active:scale-98"
                >
                  <MessageSquare className="h-4 w-4" />
                  Book a Trade
                </Link>
                <Link
                  href="/how-it-works"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-500 hover:text-white"
                >
                  How It Works
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>30-min Auto Travel Buffer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Stripe Connect Split</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>WhatsApp & Web Chat</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl glow-amber">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Live Scheduling Simulation
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    Auto-Allocated
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1.5">
                      Customer Request (WhatsApp / Webchat)
                    </label>
                    <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-200 flex items-center justify-between">
                      <span>{jobType}</span>
                      <span className="font-semibold text-amber-400">£120.00</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1.5">
                      Select Customer Slot:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["09:00 - 10:00", "11:30 - 12:30", "14:00 - 15:00", "16:30 - 17:30"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg px-3 py-2 text-xs font-semibold text-center transition ${selectedSlot === slot
                            ? "bg-amber-400 text-slate-950 shadow"
                            : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Primary Job Window:</span>
                      <span className="font-mono font-bold text-white">{selectedSlot} (60m)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs rounded-lg bg-cyan-950/40 border border-cyan-500/30 p-2 text-cyan-300">
                      <div className="flex items-center gap-1.5">
                        <Navigation className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="font-semibold">Automated Travel Buffer:</span>
                      </div>
                      <span className="font-mono font-bold">+30 Minutes</span>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-slate-800/60 pt-2 text-slate-400">
                      <span>Next Available Booking:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {selectedSlot === "09:00 - 10:00" ? "10:30 AM" :
                          selectedSlot === "11:30 - 12:30" ? "01:00 PM" :
                            selectedSlot === "14:00 - 15:00" ? "03:30 PM" : "06:00 PM"}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/20 p-3 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Customer Pays:</span>
                      <span className="font-mono font-bold text-white">£120.00</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Platform Flat Fee:</span>
                      <span className="font-mono text-amber-400">- £15.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-400 border-t border-emerald-500/20 pt-1">
                      <span>Trader Direct Net Payout:</span>
                      <span className="font-mono">£105.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">Platform Architecture</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built Specifically For How Tradespeople Operate
          </p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Eliminate double-bookings, back-and-forth phone tags, and manual invoice tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">30-Min Buffer Math</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Every booked job automatically creates a mandatory 30-minute travel window (T_end + 30m buffer). Zero overlap and zero stress between appointments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-amber-300">Algorithm: bufferEngine.ts</span>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2-Channel Normalized Intake</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Customers can book via <strong>WhatsApp Webhook</strong> or our on-site <strong>Web Chatbot</strong>. Both feed into the single unified state engine.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-emerald-300">Adapter: IChannelAdapter</span>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Stripe Connect Split Payouts</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Instant destination charges. The customer pays in full, the platform captures the flat £15 application fee, and the trader gets paid directly into their bank account.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-cyan-300">Express Connected Account</span>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400 border border-purple-400/20">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Trader Daily Work Area</h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Traders declare their active operating zone or postcode for the day. Protects from driving across town for low-margin call-outs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-purple-300">Model: WorkArea</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                <span>The Problem With Standard Booking Apps</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Why Standard Calendars Fail for On-the-Road Trades
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional booking tools schedule back-to-back appointments (e.g. 10:00 AM, 11:00 AM, 12:00 PM). For an on-site plumber or electrician, 15 minutes of traffic cascades into being 2 hours late by afternoon.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-950/20 p-3.5">
                  <div className="rounded-full bg-red-500/20 p-1 text-red-400">
                    <XIcon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Back-to-back zero buffer booking</h4>
                    <p className="text-xs text-slate-400">Creates guaranteed delays and frustrated homeowners.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
                  <div className="rounded-full bg-emerald-500/20 p-1 text-emerald-400">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-300">TradeSlot 30m Auto-Pad Protection</h4>
                    <p className="text-xs text-slate-400">Every job window is automatically extended in the schedule with travel time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">TradeSlot Protected Day</span>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[11px] font-mono text-slate-400">09:00 - 10:00</div>
                    <div className="flex-1 rounded-lg bg-amber-500/20 border border-amber-500/40 p-2 text-xs font-semibold text-amber-200">
                      Job #1: Consumer Unit Upgrade (£180)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[11px] font-mono text-cyan-400">10:00 - 10:30</div>
                    <div className="flex-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 p-1.5 text-[11px] text-cyan-300 flex items-center justify-between">
                      <span>Travel Buffer (Protected Window)</span>
                      <span className="font-mono font-bold">30 mins</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[11px] font-mono text-slate-400">10:30 - 11:30</div>
                    <div className="flex-1 rounded-lg bg-amber-500/20 border border-amber-500/40 p-2 text-xs font-semibold text-amber-200">
                      Job #2: EV Charger Inspection (£120)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-[11px] font-mono text-cyan-400">11:30 - 12:00</div>
                    <div className="flex-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 p-1.5 text-[11px] text-cyan-300 flex items-center justify-between">
                      <span>Travel Buffer (Protected Window)</span>
                      <span className="font-mono font-bold">30 mins</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-xs text-slate-400 flex items-center justify-between">
                <span>Result:</span>
                <span className="text-emerald-300 font-semibold">100% on-time arrival rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">Fair Pricing Guarantee</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flat £15 Fee. No Monthly Retainers. No Lead Bidding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-8 space-y-5">
            <h3 className="text-lg font-bold text-slate-300">Traditional Lead Aggregators</h3>
            <p className="text-xs text-slate-400">Checkatrade, Bark, Rated People models</p>
            <div className="text-3xl font-bold text-red-400">£150 - £400+ <span className="text-xs text-slate-500 font-normal">/ month</span></div>

            <ul className="space-y-3 text-xs text-slate-400 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-2 text-slate-400">
                <XIcon className="h-3.5 w-3.5 text-red-400" /> Pay for unqualified leads you might not win
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XIcon className="h-3.5 w-3.5 text-red-400" /> Zero schedule or travel buffer intelligence
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XIcon className="h-3.5 w-3.5 text-red-400" /> Manual customer chasing & payment follow-up
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-amber-400/80 bg-slate-900/90 p-8 space-y-5 glow-amber relative">
            <div className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold text-slate-950">
              FLAT FEE MODEL
            </div>
            <h3 className="text-lg font-bold text-white">TradeSlot Intelligent Booking</h3>
            <p className="text-xs text-slate-400">Pay only when you get a confirmed, paid booking</p>
            <div className="text-3xl font-bold text-amber-400">£15.00 <span className="text-xs text-slate-400 font-normal">flat fee per job</span></div>

            <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> WhatsApp & Web Chatbot automated intake
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Mandatory 30-min travel buffer protection
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Direct Stripe Connect express bank payout
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> £0 subscription lock-in or hidden lead costs
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 p-8 sm:p-14 text-center text-slate-950 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to automate your diary and payouts?
            </h2>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              Join the future of trade scheduling. Set your zone for the day, connect your WhatsApp & Stripe, and let TradeSlot handle the buffer math.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/how-it-works"
                className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-900 active:scale-98"
              >
                How TradeSlot Works
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border-2 border-slate-950 bg-transparent px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-950/10"
              >
                Trader Inquiries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
