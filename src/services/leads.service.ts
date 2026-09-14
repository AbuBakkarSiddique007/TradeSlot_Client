import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { Lead } from "@/types";

export const leadsService = {
  getLeads: async (): Promise<Lead[]> => {
    const res = await axiosSecure.get<{ success: boolean; data: Lead[] }>(
      "/trader/leads"
    );
    return res.data.data ?? [];
  },
};