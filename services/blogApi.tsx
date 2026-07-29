"use client";
import { getToken } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log("token", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("ngrok-skip-browser-warning", "1");

      return headers;
    },
  }),
  tagTypes: ["Blog"],

  endpoints: (build) => ({
    getBlog: build.query({
      query: () => {
        return {
          url: `/blogs/`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data,
      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogQuery } = blogApi;
