"use client";

import React, { useState } from "react";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  Send, 
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    trade: "Electrical & EV",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-16 py-12 md:py-20 bg-grid-pattern">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>We&apos;re Here to Help</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch with TradeSlot
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Have questions about the 30-minute buffer scheduling engine, WhatsApp channel webhook setup, or Stripe Connect payouts?
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Support Channels</h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="rounded-lg bg-amber-400/10 p-2.5 text-amber-400 border border-amber-400/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">Email Us</div>
                    <div className="font-mono text-slate-200">support@tradeslot.co.uk</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="rounded-lg bg-emerald-400/10 p-2.5 text-emerald-400 border border-emerald-400/20">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">WhatsApp Desk</div>
                    <div className="font-mono text-slate-200">+44 (0) 20 7946 0192</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="rounded-lg bg-cyan-400/10 p-2.5 text-cyan-400 border border-cyan-400/20">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">Operations Base</div>
                    <div className="text-slate-200">London, United Kingdom</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>UK Trades Partner Program</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you an independent plumber, electrician, locksmith, or gas engineer? Reach out to get your WhatsApp booking number configured and integrated with TradeSlot.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. A TradeSlot scheduling specialist will respond to {formData.email || "your email"} within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Send an Inquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dave Miller"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="dave@millerelectrical.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Trade Sector</label>
                      <select
                        value={formData.trade}
                        onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option>Electrical & EV</option>
                        <option>Plumbing & Heating</option>
                        <option>Gas & Boiler Engineering</option>
                        <option>Locksmith & Security</option>
                        <option>Carpentry & Joinery</option>
                        <option>HVAC / Air Conditioning</option>
                        <option>Other Trade</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+44 7700 900077"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">How Can We Help?</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your current booking workflow, coverage postcodes, or questions about TradeSlot..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 text-xs font-bold text-slate-950 shadow-md transition hover:brightness-110"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
