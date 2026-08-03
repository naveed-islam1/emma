"use client";

import { authuser, isLogin, usertoken } from "@/features/authSlice";
import { createClient } from "@/utils/supabaseClient";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const establishSession = async () => {
      try {
        const supabase = createClient();
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const errorDescription = params.get("error_description");

        if (errorDescription) {
          throw new Error(errorDescription);
        }

        let session = null;

        if (code) {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          session = data.session;
        } else {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          session = data.session;
        }

        if (!session?.access_token || !session.user) {
          throw new Error("No session returned after email confirmation");
        }

        const user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name,
          role: session.user.user_metadata?.role,
          phone: session.user.phone,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at,
        };

        localStorage.setItem("token", session.access_token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(usertoken(session.access_token));
        dispatch(authuser(user));
        dispatch(isLogin(true));

        router.replace("/on-boarding");
      } catch (error: any) {
        console.error("Auth callback error:", error);
        toast.error(
          error?.message || "Email confirmation failed. Please sign in.",
        );
        router.replace("/signin");
      }
    };

    establishSession();
  }, [dispatch, router]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-4">
        <Loader className="w-10 h-10 mx-auto text-[#8A38F5] animate-spin" />
        <p className="text-[#424242] text-base">
          Confirming your email and starting your session...
        </p>
      </div>
    </section>
  );
}
