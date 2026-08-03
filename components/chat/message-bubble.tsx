"use client";

import React from "react";

export type ChatRole = "user" | "assistant";

interface MessageBubbleProps {
  role: ChatRole;
  text: string;
  isError?: boolean;
}

/** Single chat bubble. User = purple/right, Emma = gray/left. */
export default function MessageBubble({ role, text, isError }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] md:max-w-[70%] bg-[#8A38F5] text-white rounded-[16px] rounded-br-[4px] px-4 py-3 text-base font-normal whitespace-pre-wrap break-words"
            : isError
              ? "max-w-[85%] md:max-w-[70%] bg-[#FFF6F6] text-[#7A3B3B] border border-[#F3D6D6] rounded-[16px] rounded-bl-[4px] px-4 py-3 text-base font-normal whitespace-pre-wrap break-words"
              : "max-w-[85%] md:max-w-[70%] bg-[#F1F4F9] text-[#191919] rounded-[16px] rounded-bl-[4px] px-4 py-3 text-base font-normal whitespace-pre-wrap break-words"
        }
      >
        {text}
      </div>
    </div>
  );
}
