"use client";
import { getToken } from "@/utils/helper";
import { createClient } from "@/utils/supabaseClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],

  endpoints: (build) => ({
    CreateProfile: build.mutation<any, any>({
      query: (credentials) => ({
        url: "/profile",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfile: build.query({
      query: () => {
        return {
          url: `/profile/userId`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data,
      providesTags: ["Profile"],
    }),
    veriffVerify: build.mutation<any, any>({
      query: (credentials) => ({
        url: "/veriff/verifyUser",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfiles: build.query({
      query: () => {
        return {
          url: `/profile`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data,
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation<any, any>({
      query: ({ profileId, ...credentials }) => ({
        url: `/profile/${profileId}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    resetPassword: build.mutation<any, any>({
      queryFn: async (creadentials) => {
        try {
          const supabase = createClient();

          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
          if (userError || !user) throw new Error("User not logged in");

          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: creadentials.oldPassword,
          });
          if (loginError) throw loginError;

          const { data, error } = await supabase.auth.updateUser({
            password: creadentials.newPassword,
          });
          if (error) throw error;

          return { data };
        } catch (err: any) {
          return { error: err.message };
        }
      },
    }),
    createPaymentMethod: build.mutation<any, any>({
      query: (credentials) => ({
        url: "/profile/add-card",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    getUserCards: build.query({
      query: () => {
        return {
          url: `/profile/cards`,
          method: "GET",
        };
      },
      providesTags: ["Profile"],
    }),
    deleteUserCard: build.mutation<any, any>({
      query: (cardId) => ({
        url: `/profile/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    buyTokens: build.mutation<any, any>({
      query: (credentials) => ({
        url: "/profile/buy-tokens",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useVeriffVerifyMutation,
  useGetProfilesQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useCreatePaymentMethodMutation,
  useGetUserCardsQuery,
  useDeleteUserCardMutation,
  useBuyTokensMutation,
} = profileApi;
