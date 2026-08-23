"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { stripeService } from "@/services/stripe.service";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  ShieldCheck,
  BadgePoundSterling,
  RefreshCw,
} from "lucide-react";

export function StripeConnectCard() {
  const { trader, refreshTrader } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshTrader();
  }, [refreshTrader]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTrader();
    setIsRefreshing(false);
  };

  const isOnboarded = Boolean(trader?.stripeOnboarded);
  const accountId = trader?.stripeAccountId;

  const handleConnectStripe = async () => {
    setIsLoading(true);
    try {
      const res = await stripeService.startOnboarding();

      if (res.alreadyOnboarded) {
        Swal.fire({
          icon: "info",
          title: "Already Connected",
          text: "Your Stripe Express payout account is already active and verified.",
          background: "#0f172a",
          color: "#f8fafc",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      if (res.url) {
        window.location.href = res.url;
      } else {
        throw new Error(res.message || "Failed to generate Stripe onboarding link.");
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = err as any;
      const msg =
        axiosError?.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to connect to Stripe.");

      Swal.fire({
        icon: "warning",
        title: "Stripe Connection",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Stripe Express Account</h2>
            <p className="text-xs text-slate-400">
              Direct bank payouts with automatic £15 flat booking fee deduction.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh Stripe status"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-400 transition hover:border-slate-500 hover:text-white disabled:opacity-60"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Checking..." : "Refresh Status"}
          </button>
          {isOnboarded ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Active & Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
              <AlertCircle className="h-3.5 w-3.5" /> Action Required
            </span>
          )}
        </div>
      </div>

      {isOnboarded ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Your payout account is connected and ready
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  When customers confirm slots via WhatsApp or Webchat, payments are processed with Stripe and transferred directly to your bank.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Connected Stripe Account
              </span>
              <p className="text-sm font-mono font-semibold text-white">
                {accountId || "Active"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Platform Processing Fee
              </span>
              <p className="text-sm font-semibold text-amber-400 flex items-center gap-1">
                <BadgePoundSterling className="h-4 w-4" /> £15.00 Flat per Confirmed Booking
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">How Payouts Work</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                Customers pay upfront to secure their buffer-protected booking slot.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                TradeSlot automatically retains the £15 platform booking fee.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                Remaining service fees are deposited directly to your bank account via Stripe Express.
              </li>
            </ul>
          </div>

          <div>
            <button
              type="button"
              onClick={handleConnectStripe}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Onboarding Link...
                </>
              ) : (
                <>
                  Connect with Stripe Express
                  <ExternalLink className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
