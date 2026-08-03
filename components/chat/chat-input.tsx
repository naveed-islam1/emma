"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

/** Bottom input bar: rounded text field + purple send arrow. Enter sends. */
export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    setValue("");
    onSend(text);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative w-full"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe tu mensaje…"
        aria-label="Message"
        autoComplete="off"
        className="font-normal text-base text-[#191919] placeholder:text-[#9A9A9A] bg-white border border-gray-300 rounded-[15px] pl-4 pr-14 py-3 md:py-4 w-full focus:outline-none focus:ring-2 focus:ring-[#8A38F5] focus:border-transparent"
      />
      <button
        type="submit"
        aria-label="Send message"
        disabled={disabled || !value.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer disabled:opacity-40 disabled:cursor-default"
      >
        <Image
          src={"/assets/svg/arrow.svg"}
          alt=""
          width={35}
          height={35}
          className="h-7 w-7 md:h-8 md:w-8"
        />
      </button>
    </form>
  );
}
