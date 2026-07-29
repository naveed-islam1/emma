"use client";

import Link from "next/link";

export default function ThankYou() {
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
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
