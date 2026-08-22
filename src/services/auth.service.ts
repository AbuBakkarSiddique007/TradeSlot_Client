import { axiosPublic } from "@/hooks/useAxiosPublic";
import type { LoginDto, RegisterDto, AuthResponse, ApiResponse } from "@/types";

export const authService = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const res = await axiosPublic.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return res.data.data!;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const res = await axiosPublic.post<ApiResponse<AuthResponse>>("/auth/register", data);
    return res.data.data!;
  },
};
