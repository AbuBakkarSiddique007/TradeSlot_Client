import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { DailyScheduleResponse } from "@/types";

export const scheduleService = {
  getDailySchedule: async (
    date?: string,
    duration?: number,
    buffer?: number
  ): Promise<DailyScheduleResponse> => {

    const params = new URLSearchParams();

    if (date) params.append("date", date);

    if (duration) params.append("duration", duration.toString());

    if (buffer !== undefined) params.append("buffer", buffer.toString());

    const res = await axiosSecure.get<DailyScheduleResponse>(
      `/trader/availability?${params.toString()}`
    );

    return res.data;
  },
};
