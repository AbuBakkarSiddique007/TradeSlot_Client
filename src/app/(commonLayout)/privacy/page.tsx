import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-slate-300 space-y-8">
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>GDPR & UK Data Protection Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Overview</h2>
          <p>
            TradeSlot (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides a smart travel-buffer booking engine for tradespeople. We respect your privacy and are committed to protecting personal data collected via our website, WhatsApp webhook intake, and Web Chatbot widgets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Data We Collect</h2>
          <p>
            When using TradeSlot as a customer or trader, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>Contact details (Name, WhatsApp Phone Number, Email, Postcode/Location).</li>
            <li>Booking details (Requested service description, chosen time slots, vehicle travel window).</li>
            <li>Payment data (Processed securely by Stripe Connect; TradeSlot does not store full credit card numbers).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. How We Use Data</h2>
          <p>
            We use collected data solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
            <li>Calculate travel buffers and schedule appointments without conflict.</li>
            <li>Send instant booking confirmations and receipts via WhatsApp or Webchat.</li>
            <li>Process payments and split disbursements via Stripe Connect Express.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Third-Party Services</h2>
          <p>
            We integrate with trusted service providers including <strong>Stripe</strong> (payment processing & payouts) and <strong>Meta / Twilio</strong> (WhatsApp messaging).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contact Us</h2>
          <p>
            If you have questions regarding data privacy or wish to request data erasure under GDPR, email us at <a href="mailto:privacy@tradeslot.co.uk" className="text-amber-400 underline">privacy@tradeslot.co.uk</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
