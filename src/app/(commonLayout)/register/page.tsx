"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import type { RegisterDto } from "@/types";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto & { confirmPassword: string }>();

  const onSubmit = async (data: RegisterDto & { confirmPassword: string }) => {
    setServerError("");
    try {
      const { confirmPassword, ...payload } = data;
      void confirmPassword;
      const result = await authService.register(payload);
      login(result.token, result.trader);

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Welcome to TradeSlot, ${result.trader.name}`,
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
        (err instanceof Error ? err.message : "Registration failed. Please try again.");

      setServerError(msg);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 backdrop-blur">
        <h1 className="mb-1 text-2xl font-bold text-white">Create your account</h1>
        <p className="mb-7 text-sm text-slate-400">Get started with TradeSlot today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="John Smith"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-slate-300">
              Business name <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="businessName"
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Smith Electrical Ltd"
              {...register("businessName")}
            />
          </div>

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
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Min. 6 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-300">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-amber-500 hover:text-amber-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
