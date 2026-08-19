"use client";
import { getToken } from "@/utils/helper";
import { createClient } from "@/utils/supabaseClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Session, SignInCredentials, SignUpCredentials } from "./types";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("x-auth-token", token);
      }
      headers.set("ngrok-skip-browser-warning", "1");

      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    SignupUser: build.mutation<any, SignUpCredentials>({
      queryFn: async (credentials) => {
        try {
          const supabase = createClient();
          const emailRedirectTo =
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined;

          const { data: authData, error: authError } =
            await supabase.auth.signUp({
              email: credentials.email,
              password: credentials.password,
              options: {
                emailRedirectTo,
                data: {
                  first_name: credentials.first_name,
                  middle_name: credentials.middle_name,
                  paternal_last_name: credentials.paternal_last_name,
                  maternal_last_name: credentials.maternal_last_name,
                  status: credentials.status,
                  name: credentials.name,
                },
              },
            });
          if (authError) {
            return {
              error: { status: "FETCH_ERROR", error: authError.message },
            };
          }

          return {
            data: {
              user: authData.user,
              access_token: authData.session?.access_token,
              session: authData.session,
              success: true,
              message: authData.session
                ? "Account created successfully"
                : "Account created. Please check your email to confirm your account.",
            },
          };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
    }),
    SignIn: build.mutation<Session, SignInCredentials>({
      queryFn: async (credentials) => {
        try {
          const supabase = createClient();
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            return { error: { status: "FETCH_ERROR", error: error.message } };
          }

          if (!data.session) {
            return {
              error: { status: "FETCH_ERROR", error: "No session returned" },
            };
          }

          // Map Supabase session to our Session type
          const meta = data.session.user.user_metadata || {};
          const mappedSession: Session = {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: {
              id: data.session.user.id,
              email: data.session.user.email,
              name: meta.name,
              role: meta.role,
              phone: data.session.user.phone,
              first_name: meta.first_name,
              middle_name: meta.middle_name,
              paternal_last_name: meta.paternal_last_name,
              maternal_last_name: meta.maternal_last_name,
              created_at: data.session.user.created_at,
              updated_at: data.session.user.updated_at,
            },
          };

          return { data: mappedSession };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
    }),
    Verifycedula: build.mutation({
      query: ({
        cedula,
        speciality,
        searchText,
        nombre,
        paterno,
        materno,
      }: {
        cedula: string;
        speciality: string;
        searchText: string;
        nombre: string;
        paterno: string;
        materno: string;
      }) => {
        return {
          url: "/cedula/verify",
          method: "POST",
          body: {
            cedula,
            specialty: speciality,
            searchText,
            nombre,
            paterno,
            materno,
          },
        };
      },
    }),
    updateUser: build.mutation<any, any>({
      queryFn: async (credentials) => {
        try {
          const supabase = createClient();

          const { data, error } = await supabase.auth.updateUser(credentials);
          if (error) {
            return { error: { status: "FETCH_ERROR", error: error.message } };
          }
          return { data };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
    }),
    getUser: build.query<any, void>({
      queryFn: async () => {
        try {
          const supabase = createClient();
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            return { error: { status: "FETCH_ERROR", error: error.message } };
          }
          return { data };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useSignInMutation,
  useVerifycedulaMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = userApi;
