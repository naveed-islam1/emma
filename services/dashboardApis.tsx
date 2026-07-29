"use client";
import { getToken } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("ngrok-skip-browser-warning", "1");

      return headers;
    },
  }),
  tagTypes: ["Dashboard"],

  endpoints: (build) => ({
    getLeads: build.query({
      query: ({ page, limit, doctorId }) => ({
        url: `/dashboard/leads`,
        method: "GET",
        params: { page, limit, doctorId },
      }),
      providesTags: ["Dashboard"],
    }),
    unlockLead: build.mutation<any, any>({
      query: (credentials) => ({
        url: `/dashboard/unlock/lead`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getDoctorLeadsStats: build.query({
      query: ({ doctorId }) => ({
        url: `/doctors/${doctorId}`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getProcedureStats: build.query({
      query: ({ doctorId }) => ({
        url: `/doctors/${doctorId}/procedures`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useUnlockLeadMutation,
  useGetDoctorLeadsStatsQuery,
  useGetProcedureStatsQuery,
} = dashboardApi;
