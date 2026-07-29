"use client";

import Link from "next/link";

export default function DocumentFailed() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EDE0FF] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Verification Failed
        </h1>

        <p className="text-gray-600 mb-8 text-base md:text-lg">
          The name on your ID card does not match the first name you entered
          during signup. Please try again with the correct identity document, or
          update your signup details and restart verification.
        </p>

        <Link
          href="/verif-plugin"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Try Again
        </Link>
      </div>
    </section>
  );
}
