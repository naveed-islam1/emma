"use client";
// RTK Query client for the production emma-backend (Vercel) — NEXT_PUBLIC_EMMA_API_URL.
// The dashboard data itself comes from dashboardApi (NEXT_PUBLIC_BACKEND_URL);
// this client carries the outcome-tagging loop (EMM-88): doctors report what
// happened with an unlocked lead, which trains Emma's lead scoring.
import { getToken } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emmaApi = createApi({
  reducerPath: "emmaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_EMMA_API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    recordOutcome: build.mutation<
      { success: boolean; old_status: string; new_status: string },
      { lead_id?: string; assignment_id?: string; new_status: string; notes?: string }
    >({
      query: (body) => ({
        url: `/assignments/outcome`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRecordOutcomeMutation } = emmaApi;
