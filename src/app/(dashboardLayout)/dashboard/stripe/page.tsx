"use client";

import { CreditCard } from "lucide-react";

export default function StripePage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Stripe Express Payouts</h1>
        <p className="mt-1 text-sm text-slate-400">
          Connect your bank account via Stripe Connect Express for automatic £15 flat fee deduction and direct payouts.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-16 text-center">
        <CreditCard className="mx-auto mb-3 h-10 w-10 text-amber-400/80" />
        <h3 className="text-base font-semibold text-white">Stripe Connect Onboarding</h3>
        <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
          Stripe Connect Express onboarding button and payout status will be configured in Phase 6.
        </p>
      </div>
    </div>
  );
}
