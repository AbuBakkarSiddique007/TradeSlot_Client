"use client";

import { useAuth } from "@/context/AuthContext";
import { Mail, Building, Clock, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { trader } = useAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Trader Profile</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your business settings, working hours, and account details.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-bold text-xl shadow-md shadow-amber-500/20">
            {trader ? trader.name.charAt(0).toUpperCase() : "T"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{trader?.name || "Trader"}</h2>
            <p className="text-xs text-slate-400">{trader?.businessName || "Trade Services"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Email */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              Email Address
            </div>
            <p className="text-sm font-semibold text-white">{trader?.email || "—"}</p>
          </div>

          {/* Business Name */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Building className="h-3.5 w-3.5 text-amber-400" />
              Business Name
            </div>
            <p className="text-sm font-semibold text-white">{trader?.businessName || "—"}</p>
          </div>

          {/* Working Hours */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              Working Hours
            </div>
            <p className="text-sm font-semibold text-white">
              {trader ? `${trader.workingHoursStart} - ${trader.workingHoursEnd}` : "08:00 - 18:00"}
            </p>
          </div>

          {/* Buffer Window */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Default Travel Buffer
            </div>
            <p className="text-sm font-semibold text-white">
              {trader?.defaultBufferTime ?? 30} Minutes (Protected)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
