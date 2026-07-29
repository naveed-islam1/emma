import React from "react";

export default function Loading({ text }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-5 md:px-8">
        <p className="text-gray-700 mb-16 text-sm md:text-3xl">{text}</p>

        <div className="relative w-12 h-12 md:w-22 md:h-22">
          <div className="absolute inset-0 rounded-full border-8 border-t-purple-100 border-r-purple-400 border-b-purple-300 border-l-purple-200 animate-spin"></div>
        </div>
      </div>
    </>
  );
}
