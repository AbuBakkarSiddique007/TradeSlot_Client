"use client";

import { StripeConnectCard } from "@/components/dashboard/StripeConnectCard";

export default function StripePage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Stripe Express Payouts</h1>
        <p className="mt-1 text-sm text-slate-400">
          Connect your bank account via Stripe Connect Express for automatic £15 flat fee deduction and direct payouts.
        </p>
      </div>

      <StripeConnectCard />
    </div>
  );
}
