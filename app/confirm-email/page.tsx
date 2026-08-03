"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <section className="min-h-screen pt-4 bg-linear-gradient(to bottom, #ffffff, #EDE0FF)">
      <div className="max-w-7xl mx-5 md:mx-8 lg:mx-auto">
        <Image
          src="/assets/svg/Emma-logo.svg"
          alt="Emma Logo"
          width={100}
          height={50}
        />

        <div className="my-14 w-full max-w-lg flex flex-col items-center justify-center text-center space-y-6 mx-auto">
          <h1 className="text-3xl md:text-4xl font-normal text-black">
            Confirm your email
          </h1>

          <p className="text-[#424242] text-base md:text-lg">
            We sent a confirmation link
            {email ? (
              <>
                {" "}
                to{" "}
                <span className="font-semibold text-black break-all">
                  {email}
                </span>
              </>
            ) : null}
            . Open your inbox and click the link to continue onboarding.
          </p>

          <p className="text-[#4E4E4E] text-sm">
            Didn&apos;t get it? Check your spam folder, or try signing up again
            with the same email.
          </p>

          <Link
            href="/signin"
            className="text-[#5A8CFF] text-base hover:underline"
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-[#424242]">Loading...</p>
        </section>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}
