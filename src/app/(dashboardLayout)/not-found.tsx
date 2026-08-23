import Link from "next/link";
import { Clock, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
          <Clock className="h-10 w-10 stroke-[1.8]" />
          <span className="absolute -bottom-1 -right-1 rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[10px] font-bold text-red-300">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Section Not Found</h2>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            This dashboard module does not exist or has been relocated.
          </p>
        </div>

        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-md"
          >
            <LayoutDashboard className="h-4 w-4" />
            Back to Dashboard Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
