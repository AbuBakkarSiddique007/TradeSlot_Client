import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { WorkArea, SetWorkAreaDto, ApiResponse } from "@/types";

export const workAreaService = {
  getWorkArea: async (date?: string): Promise<WorkArea | null> => {
    const url = date ? `/trader/work-area?date=${date}` : "/trader/work-area";
    const res = await axiosSecure.get<ApiResponse<WorkArea | null>>(url);
    return res.data.data ?? null;
  },

  setWorkArea: async (payload: SetWorkAreaDto): Promise<WorkArea> => {
    const res = await axiosSecure.post<ApiResponse<WorkArea>>("/trader/work-area", payload);
    return res.data.data!;
  },
};
