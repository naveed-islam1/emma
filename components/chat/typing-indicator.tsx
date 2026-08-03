"use client";

import React from "react";

/** Three-dot "Emma is typing" indicator, shown while awaiting the backend. */
export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 bg-[#F1F4F9] rounded-[16px] rounded-bl-[4px] px-4 py-3.5 w-fit">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-2 w-2 rounded-full bg-[#8A38F5]/60 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
