"use client";

import { useState, useEffect } from "react";
import { scheduleService } from "@/services/schedule.service";
import type { DailyScheduleResponse, ScheduleBooking, AvailableSlot } from "@/types";
import { getTodayDateStr, addDays } from "@/utils/date";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Loader2,
  Sparkles,
  BadgePoundSterling,
} from "lucide-react";

const formatDisplayDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


const formatTimeHHmm = (isoStr: string) => {
  const d = new Date(isoStr);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};


export function ScheduleTimeline() {
  const today = getTodayDateStr();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [scheduleData, setScheduleData] = useState<DailyScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadSchedule() {
      try {
        const data = await scheduleService.getDailySchedule(selectedDate);
        if (!isCancelled) {
          setScheduleData(data);
        }

      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to load daily schedule", err);
        }

      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    const onFocus = () => {
      loadSchedule();
    };

    window.addEventListener("focus", onFocus);
    const pollTimer = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadSchedule();
      }
    }, 30_000);

    loadSchedule();

    return () => {
      isCancelled = true;
      clearInterval(pollTimer);
      window.removeEventListener("focus", onFocus);
    };

  }, [selectedDate]);

  const changeDateByDays = (days: number) => {
    setIsLoading(true);
    const [y, m, d] = selectedDate.split("-").map(Number);
    setSelectedDate(addDays(new Date(y, m - 1, d), days));
  };


  const handleDateChange = (newDateStr: string) => {
    if (!newDateStr) return;
    setIsLoading(true);
    setSelectedDate(newDateStr);
  };


  const bookings: ScheduleBooking[] = scheduleData?.bookings ?? [];
  const openSlots: AvailableSlot[] = scheduleData?.slots ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeDateByDays(-1)}
            aria-label="Previous day"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => changeDateByDays(1)}
            aria-label="Next day"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="px-2">
            <p className="text-base font-bold text-white">
              {formatDisplayDate(selectedDate)}
            </p>
            <span className="text-[11px] font-medium text-slate-400">
              {selectedDate === today ? "Today" : selectedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedDate !== today && (
            <button
              type="button"
              onClick={() => handleDateChange(today)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-slate-750"
            >
              Back to Today
            </button>
          )}

          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
            <span>Operating Window</span>
            <Clock className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <p className="text-lg font-bold text-white">
            {scheduleData ? `${scheduleData.workingHours.startHHmm} - ${scheduleData.workingHours.endHHmm}` : "08:00 - 18:00"}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">Configured working day</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
            <span>Scheduled Jobs</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-white">{bookings.length}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {bookings.length === 1 ? "1 active job" : `${bookings.length} active jobs`}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
            <span>Travel Buffer</span>
            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
          </div>
          <p className="text-lg font-bold text-amber-400">
            {scheduleData?.bufferMinutes ?? 30} Minutes
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">Auto-buffered between all jobs</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <CalendarClock className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white">Daily Timeline &amp; Buffer Schedule</h2>
          </div>

          {isLoading && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading schedule...
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-amber-400" />
            <p className="text-xs">Calculating buffer slots and bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-12 text-center">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-slate-600" />
            <h3 className="text-base font-semibold text-white">No Bookings Scheduled for this Day</h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
              Your entire operating window ({scheduleData?.workingHours.startHHmm} - {scheduleData?.workingHours.endHHmm}) is open for automated customer booking via WhatsApp and Webchat.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, idx) => {
              const startHHmm = formatTimeHHmm(booking.startTime);
              const endHHmm = formatTimeHHmm(booking.endTime);
              const bufferedEndHHmm = formatTimeHHmm(booking.bufferedEndTime);

              return (
                <div key={booking.id || idx} className="space-y-2">
                  <div className="rounded-xl border border-slate-700/80 bg-slate-850 p-4 transition hover:border-slate-600">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                            {startHHmm} – {endHHmm}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase ${booking.channelType === "whatsapp"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              }`}
                          >
                            {booking.channelType}
                          </span>
                          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700">
                            {booking.status.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white pt-1">
                          {booking.serviceDescription}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <span className="text-white font-medium">{booking.customerName}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-500" />
                            {booking.customerLocation}
                          </span>
                          {booking.totalPrice > 0 && (
                            <span className="flex items-center gap-1 font-semibold text-emerald-400">
                              <BadgePoundSterling className="h-3.5 w-3.5" />
                              £{booking.totalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-2.5 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-500/5 px-3.5 py-2 text-xs text-amber-300">
                    <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="font-semibold">
                      +30 Min Travel Buffer:
                    </span>
                    <span className="text-amber-200/90 font-mono">
                      {endHHmm} – {bufferedEndHHmm}
                    </span>
                    <span className="text-[11px] text-amber-400/70 ml-auto hidden sm:inline">
                      Protected Window (No Overlapping Intake)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {openSlots.length > 0 && (
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Available Slots for Customers ({openSlots.length} open windows)
              </h3>
              <span className="text-xs text-slate-500">Calculated after buffer deduction</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {openSlots.map((slot, sIdx) => {
                const bufferMins = slot.bufferMinutes ?? scheduleData?.bufferMinutes ?? 30;

                const endDate = new Date(slot.end);

                const bufferEnd = new Date(endDate.getTime() + bufferMins * 60_000);

                const bufferEndH = bufferEnd.getHours().toString().padStart(2, "0");

                const bufferEndM = bufferEnd.getMinutes().toString().padStart(2, "0");
                
                const bufferEndHHmm = `${bufferEndH}:${bufferEndM}`;

                return (
                  <div
                    key={sIdx}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-mono transition hover:border-amber-500/40"
                  >
                    <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Clock className="h-3 w-3 text-amber-400 shrink-0" />
                      {slot.startHHmm} – {slot.endHHmm}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400/80">
                      <ShieldCheck className="h-2.5 w-2.5 shrink-0" />
                      <span>+{bufferMins}min buffer until {bufferEndHHmm}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
