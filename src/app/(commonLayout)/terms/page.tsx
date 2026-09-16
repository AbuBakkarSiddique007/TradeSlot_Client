import React from "react";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-slate-300 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400">
          <FileText className="h-4 w-4" />
          <span>Platform Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using TradeSlot (&quot;the Platform&quot;), whether as an independent tradesperson (&quot;Trader&quot;) or a service requester (&quot;Customer&quot;), you agree to be bound by these Terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Flat Fee & Payout Structure</h2>
          <p>
            TradeSlot operates on a transparent flat-fee basis. Each completed and confirmed booking carries an immutable flat application fee of £15.00 retained by the platform. The balance of the customer payment is transferred directly to the Trader&apos;s connected Stripe account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Buffer Scheduling & Attendance</h2>
          <p>
            TradeSlot enforces a standard 30-minute travel buffer between bookings to minimize delays. Traders are responsible for honoring confirmed appointments within their declared daily work zone.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Cancellations and Disputes</h2>
          <p>
            Bookings may be cancelled according to the Trader&apos;s cancellation policy. If a booking is cancelled prior to execution, the time slot will be reopened to new requests.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of England and Wales.
          </p>
        </section>
      </div>
    </div>
  );
}
