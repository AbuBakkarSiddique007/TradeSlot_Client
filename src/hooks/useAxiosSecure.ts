"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
});

axiosSecure.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const useAxiosSecure = () => {
  const router = useRouter();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("trader");
            document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
          }
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  return axiosSecure;
};

export default useAxiosSecure;
