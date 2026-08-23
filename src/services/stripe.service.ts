import { axiosSecure } from "@/hooks/useAxiosSecure";

export interface StripeOnboardResult {
  success: boolean;
  url?: string;
  accountId?: string;
  alreadyOnboarded?: boolean;
  message?: string;
}

export const stripeService = {
  startOnboarding: async (): Promise<StripeOnboardResult> => {
    const res = await axiosSecure.post<StripeOnboardResult>("/trader/stripe/onboard");
    return res.data;
  },
};
