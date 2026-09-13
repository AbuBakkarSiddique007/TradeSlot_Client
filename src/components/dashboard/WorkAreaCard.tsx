"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { workAreaService } from "@/services/workArea.service";
import type { WorkArea } from "@/types";
import { getTodayDateStr, addDays } from "@/utils/date";
import { MapPin, Calendar, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface FormValues {
  date: string;
  zoneName: string;
  postalCodesStr: string;
}

export function WorkAreaCard({ onUpdated }: { onUpdated?: (wa: WorkArea) => void }) {
  const today = getTodayDateStr();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentWorkArea, setCurrentWorkArea] = useState<WorkArea | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      date: today,
      zoneName: "",
      postalCodesStr: "",
    },
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadWorkArea() {
      try {
        const data = await workAreaService.getWorkArea(selectedDate);
        if (!isCancelled) {
          setCurrentWorkArea(data);
          if (data) {
            setValue("zoneName", data.zoneName);
            setValue("postalCodesStr", data.postalCodes ? data.postalCodes.join(", ") : "");
          } else {
            setValue("zoneName", "");
            setValue("postalCodesStr", "");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch work area", err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadWorkArea();

    return () => {
      isCancelled = true;
    };
  }, [selectedDate, setValue]);

  const handleDateChange = (newDate: string) => {
    setIsLoading(true);
    setSelectedDate(newDate);
    setValue("date", newDate);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const postalCodes = values.postalCodesStr
        ? values.postalCodesStr
            .split(",")
            .map((s) => s.trim().toUpperCase())
            .filter(Boolean)
        : [];

      const result = await workAreaService.setWorkArea({
        date: values.date,
        zoneName: values.zoneName.trim(),
        postalCodes,
      });

      setCurrentWorkArea(result);
      if (onUpdated) onUpdated(result);

      Swal.fire({
        icon: "success",
        title: "Work Area Saved",
        text: `Zone for ${values.date} set to: ${result.zoneName}`,
        timer: 2000,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
      });
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = err as any;
      const msg =
        axiosError?.response?.data?.message ||
        (err instanceof Error ? err.message : "Failed to set work area.");

      Swal.fire({
        icon: "error",
        title: "Error",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#f59e0b",
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <MapPin className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white">Daily Operating Zone</h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Define your geographic cluster to focus bookings and minimize travel time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDateChange(today)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedDate === today
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-750"
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => {
              handleDateChange(addDays(new Date(), 1));
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              selectedDate !== today
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-750"
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            Status for <span className="text-white font-semibold">{selectedDate}</span>
          </span>
          {isLoading ? (
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading...
            </span>
          ) : currentWorkArea ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Zone Active
            </span>
          ) : (
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
              No Zone Set
            </span>
          )}
        </div>

        <div className="mt-2">
          {currentWorkArea ? (
            <div>
              <p className="text-base font-bold text-white">{currentWorkArea.zoneName}</p>
              {currentWorkArea.postalCodes && currentWorkArea.postalCodes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {currentWorkArea.postalCodes.map((code) => (
                    <span
                      key={code}
                      className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Set a zone below so customers and AI dispatch know where you operate on this day.
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Target Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              {...register("date", {
                required: "Date is required",
                onChange: (e) => handleDateChange(e.target.value),
              })}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="zoneName" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Zone Name / Neighborhood
            </label>
            <input
              id="zoneName"
              type="text"
              placeholder="e.g. South West London (SW1-SW19)"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              {...register("zoneName", {
                required: "Zone name is required",
              })}
            />
            {errors.zoneName && (
              <p className="mt-1 text-xs text-red-400">{errors.zoneName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="postalCodesStr" className="mb-1.5 block text-xs font-medium text-slate-300">
            Postcode Prefixes <span className="text-slate-500">(comma-separated, optional)</span>
          </label>
          <input
            id="postalCodesStr"
            type="text"
            placeholder="e.g. SW1, SW2, SW4, SW11, SW12"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            {...register("postalCodesStr")}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Work Area...
              </>
            ) : (
              "Save Daily Work Area"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
