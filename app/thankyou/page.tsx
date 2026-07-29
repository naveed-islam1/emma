"use client";

import Link from "next/link";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getToken } from "@/utils/helper";
import { createClient } from "@/utils/supabaseClient";

const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 20;

type PageState = "checking" | "approved" | "error" | "session-required";

export default function ThankYou() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("checking");

  const checkVerificationStatus = useCallback(async () => {
    let token = getToken();

    if (!token) {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      token = session?.access_token ?? null;
    }

    if (!token) {
      setPageState("session-required");
      return;
    }

    setPageState("checking");

    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/veriff/status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "1",
            },
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (result.code === "VERIFICATION_APPROVED") {
          setPageState("approved");
          return;
        }

        if (
          result.code === "NAME_MISMATCH" ||
          result.code === "VERIFICATION_DECLINED" ||
          result.code === "NO_VERIFICATION"
        ) {
          router.replace("/document-failed");
          return;
        }

        if (response.status === 401) {
          setPageState("session-required");
          return;
        }

        if (result.code !== "VERIFICATION_PENDING") {
          setPageState("error");
          return;
        }
      } catch (error) {
        console.error("[veriff][status] request failed:", error);

        if (attempt === MAX_POLL_ATTEMPTS - 1) {
          setPageState("error");
          return;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    // Do not show a false success when the webhook is still delayed.
    setPageState("error");
  }, [router]);

  useEffect(() => {
    checkVerificationStatus();
  }, [checkVerificationStatus]);

  if (pageState === "checking") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EDE0FF] px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
          <Loader className="w-10 h-10 mx-auto mb-6 text-purple-600 animate-spin" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Confirming verification...
          </h1>
          <p className="text-gray-600">
            Please wait while we confirm your verification status.
          </p>
        </div>
      </section>
    );
  }

  if (pageState === "error") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EDE0FF] px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Verification is taking longer than expected
          </h1>
          <p className="text-gray-600 mb-8">
            We could not confirm your status yet. Please try again.
          </p>
          <button
            type="button"
            onClick={checkVerificationStatus}
            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Check Again
          </button>
        </div>
      </section>
    );
  }

  if (pageState === "session-required") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EDE0FF] px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Sign in required
          </h1>
          <p className="text-gray-600 mb-8">
            Your login session was not found on this domain. Sign in again to
            check your verification result.
          </p>
          <Link
            href="/signin"
            className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EDE0FF] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-base md:text-lg">
          Your submission has been received successfully. Please check your
          email to confirm that your documents have been verified.
        </p>

        {/* Button */}
        <Link
          href="/on-boarding"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Continue
        </Link>
      </div>
    </section>
  );
}
