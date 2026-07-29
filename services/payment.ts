"use client";
import { getToken } from "@/utils/helper";
import { createClient } from "@/utils/supabaseClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
  tagTypes: ["Payment"],

  endpoints: (build) => ({
    getAllPayments: build.query({
      query: () => ({
        url: `/payments`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    getUserPayments: build.query({
      query: () => ({
        url: `/payments/user/`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
  }),
});

export const { useGetAllPaymentsQuery, useGetUserPaymentsQuery } = paymentApi;
