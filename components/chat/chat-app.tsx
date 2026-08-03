"use client";

/**
 * Emma chat UI.
 *
 * NOTE: The original Claude Design handoff for this screen was unreachable
 * at build time, so this is a clean minimal implementation matching the
 * repo's design language (Tailwind, Inter, accent #8A38F5) and honoring
 * the handoff's contract: message list, typing indicator, input bar,
 * Emma greeting, and the client-side startStream() reveal animation
 * (streamSpeed 24).
 *
 * Privacy: typed text never goes into URLs; message content is never logged.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/svg/logo.svg";
import MessageBubble, { type ChatRole } from "./message-bubble";
import TypingIndicator from "./typing-indicator";
import ChatInput from "./chat-input";
import {
  consumeChatSeed,
  getOrCreateCid,
  getStoredAttribution,
  hasSentAttribution,
  markAttributionSent,
} from "@/lib/attribution";

// Doctor cards are intentionally disabled. Enabling them requires
// account_verified-gated doctor data from the backend — do NOT flip this
// flag without that gate in place.
const DOCTOR_CARDS_ENABLED = false;

/** Client-side reveal speed (ms per character), from the design handoff. */
const STREAM_SPEED = 24;

const EMMA_GREETING =
  "¡Hola! Soy Emma 👋 Estoy aquí para ayudarte a encontrar al cirujano ideal para ti. Cuéntame, ¿qué procedimiento te interesa?";

const ERROR_MESSAGE =
  "Lo siento, tuve un problema de conexión 🙈 Por favor intenta enviar tu mensaje de nuevo.";

interface ChatMessage {
  id: number;
  role: ChatRole;
  /** Full message text (history is built from this). */
  content: string;
  /** While streaming, number of characters currently revealed. */
  shown?: number;
  /** Local-only error notice; excluded from history sent to the backend. */
  isError?: boolean;
}

interface ResponsePart {
  type: string;
  text?: string;
}

let nextMessageId = 1;

export default function ChatApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const didInitRef = useRef(false);

  // Clear any in-flight reveal timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearInterval);
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  /**
   * Client-side reveal animation: appends an assistant message and reveals
   * it character-by-character at STREAM_SPEED ms/char.
   */
  const startStream = useCallback((fullText: string, isError = false) => {
    const id = nextMessageId++;
    setMessages((prev) => [
      ...prev,
      { id, role: "assistant", content: fullText, shown: 0, isError },
    ]);

    let shown = 0;
    const timer = setInterval(() => {
      shown += 1;
      const done = shown >= fullText.length;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, shown: done ? undefined : shown } : m
        )
      );
      if (done) clearInterval(timer);
    }, STREAM_SPEED);
    timersRef.current.push(timer);
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      // History = everything currently on screen except local error notices.
      const history = messagesRef.current
        .filter((m) => !m.isError)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [
        ...prev,
        { id: nextMessageId++, role: "user", content: text },
      ]);
      setIsSending(true);

      try {
        const body: Record<string, unknown> = {
          messages: [...history, { role: "user", content: text }],
          conversationId: getOrCreateCid(),
        };

        // Attribution rides along ONLY on the first send of the session.
        const attributionIncluded = !hasSentAttribution();
        if (attributionIncluded) {
          const attribution = getStoredAttribution();
          if (attribution) body.attribution = attribution;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EMMA_API_URL}/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        if (!res.ok) throw new Error(`chat request failed (${res.status})`);

        const data: { parts?: ResponsePart[] } = await res.json();

        // Only flag attribution as sent once a send actually succeeded,
        // so a failed first attempt doesn't lose it.
        if (attributionIncluded) markAttributionSent();

        const reply = (data.parts ?? [])
          .filter((p) => p.type === "text" && p.text)
          .map((p) => p.text as string)
          .join("\n\n");

        startStream(reply || "…");
      } catch {
        // No message content in logs, ever.
        startStream(ERROR_MESSAGE, true);
      } finally {
        setIsSending(false);
      }
    },
    [startStream]
  );

  // On mount: greet, then auto-send the homepage seed if one exists.
  // consumeChatSeed() removes the seed BEFORE use so refresh never replays it.
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const seed = consumeChatSeed();
    startStream(EMMA_GREETING);
    if (seed && seed.trim()) void send(seed);
  }, [send, startStream]);

  return (
    <div className="flex flex-col h-dvh bg-white">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto flex items-center gap-3 px-5 py-4">
          <Link href="/" aria-label="Back to home">
            <Image src={Logo} alt="Emma" className="w-[90px] md:w-[110px]" />
          </Link>
          <span className="ml-auto text-sm font-normal text-[#4E4E4E]">
            Tu guía de cirugía 💜
          </span>
        </div>
      </header>

      {/* Message list */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto flex flex-col gap-3 px-5 py-6">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              role={m.role}
              isError={m.isError}
              text={m.shown !== undefined ? m.content.slice(0, m.shown) : m.content}
            />
          ))}
          {isSending && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input bar */}
      <footer className="shrink-0 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-4">
          <ChatInput onSend={send} disabled={isSending} />
        </div>
      </footer>
    </div>
  );
}
