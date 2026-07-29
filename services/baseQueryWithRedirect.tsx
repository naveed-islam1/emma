"use client";
import { getToken } from "@/utils/helper";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Router from "next/router"; // or use window.location.href
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("x-auth-token", token);
    }
    headers.set("ngrok-skip-browser-warning", "1");
    return headers;
  },
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Clear token if needed
    localStorage.removeItem("token");

    // Redirect to login
    if (typeof window !== "undefined") {
      Router.push("/login");
      // OR window.location.href = "/login";
    }
  }

  return result;
};

export default baseQueryWithRedirect;
