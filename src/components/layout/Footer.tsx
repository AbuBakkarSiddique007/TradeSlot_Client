import React from "react";
import Link from "next/link";
import { 
  CalendarClock, 
  ShieldCheck, 
  MessageSquare, 
  CreditCard, 
  Clock3, 
  MapPin, 
  ArrowUpRight,
  Sparkles,
  Heart
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-400/10 p-2 text-amber-400 border border-amber-400/20">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">30-Min Buffer Math</h4>
                <p className="text-xs text-slate-400">Zero overlap, zero late arrivals</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-400/10 p-2 text-emerald-400 border border-emerald-400/20">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">2-Channel Intake</h4>
                <p className="text-xs text-slate-400">WhatsApp & Web Chatbot synced</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-400/10 p-2 text-cyan-400 border border-cyan-400/20">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Stripe Connect</h4>
                <p className="text-xs text-slate-400">Automated split fee & direct payouts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-400/10 p-2 text-purple-400 border border-purple-400/20">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Zone Geofencing</h4>
                <p className="text-xs text-slate-400">Daily trader work area setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-bold">
                <CalendarClock className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Trade<span className="text-amber-400">Slot</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The purpose-built booking and buffer scheduling engine for UK tradespeople. Automatically managing travel buffers, intake chats, and instant Stripe payouts with zero subscription lock-in.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Buffer Engine Online</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Buffer Engine
                </Link>
              </li>
              <li>
                <Link href="/features#channels" className="hover:text-amber-300 transition-colors">
                  WhatsApp Intake
                </Link>
              </li>
              <li>
                <Link href="/features#webchat" className="hover:text-amber-300 transition-colors">
                  Web Chatbot Widget
                </Link>
              </li>
              <li>
                <Link href="/features#payouts" className="hover:text-amber-300 transition-colors">
                  Stripe Connect Split
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-amber-300 transition-colors">
                  Flat Fee (£15) Model
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About TradeSlot
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  Developer Docs <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs block pt-2">
                  TradeSlot processes payments securely via Stripe Connect Express. Flat £15 platform application fee.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TradeSlot Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms</Link>
            <Link href="/contact" className="hover:text-slate-400">Support</Link>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              Engineered for UK Tradespeople <Sparkles className="h-3 w-3 text-amber-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
