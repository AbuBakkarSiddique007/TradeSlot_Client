"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import type { LoginDto } from "@/types";

const DEMO_EMAIL = "trader.ctg@tradeslot.com";
const DEMO_PASSWORD = "password123";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>();

  const onSubmit = async (data: LoginDto) => {
    setServerError("");
    setValue("email", data.email);
    setValue("password", data.password);

    try {
      const result = await authService.login(data);
      login(result.token, result.trader);

      await Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: `Logged in as ${result.trader.name}`,
        timer: 1500,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = err as any;
      const msg =
        axiosError?.response?.data?.message ||
        (err instanceof Error ? err.message : "Login failed. Please try again.");

      setServerError(msg);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  const demoLogin = () => {
    setValue("email", DEMO_EMAIL);
    setValue("password", DEMO_PASSWORD);
    void handleSubmit(onSubmit)();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 backdrop-blur">
        <h1 className="mb-1 text-2xl font-bold text-white">Welcome back</h1>
        <p className="mb-7 text-sm text-slate-400">Sign in to your TradeSlot account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 border border-red-500/20">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-700" />
          <span className="text-xs text-slate-500">or</span>
          <span className="h-px flex-1 bg-slate-700" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={demoLogin}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 py-2.5 text-sm font-semibold text-amber-400 transition hover:bg-amber-500/20 disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            Login with Demo Trader
          </button>
          <p className="text-center text-xs text-slate-500">
            <span className="font-medium text-slate-400">{DEMO_EMAIL}</span>
            {"  /  "}
            <span className="font-medium text-slate-400">{DEMO_PASSWORD}</span>
            <br />
            Pre-configured trading zone, schedule &amp; Stripe payouts — no setup needed.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-amber-500 hover:text-amber-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
