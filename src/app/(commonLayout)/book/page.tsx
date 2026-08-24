"use client";

import { WebChatWidget } from "@/components/chat/WebChatWidget";
import { Bot, ShieldCheck, Clock, MapPin, Zap } from "lucide-react";

export default function BookPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400">
          <Zap className="h-3.5 w-3.5 fill-amber-400" />
          <span>Automated 30-Minute Buffer Booking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Book an Appointment
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Describe what you need done and our smart booking assistant will match available time slots with protected travel windows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="space-y-4 md:col-span-1">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Buffer Guarantee</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every job has an automatic 30-minute buffer attached to prevent delays from travel or prior jobs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="h-4 w-4 text-sky-400" />
              <span>Instant Confirmation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick your preferred time window and secure your slot directly via Stripe with zero back-and-forth.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Local Operating Zones</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matched strictly with verified local tradespeople operating in your postcode cluster.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <WebChatWidget embedded={true} />
        </div>
      </div>
    </div>
  );
}
