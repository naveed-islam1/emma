"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Logo from "../../public/assets/svg/logo.svg";
import Image from "next/image";
import { setChatSeed } from "@/lib/attribution";

export default function Hero() {
  const placeholders = [
    "I need to get a nose job",
    "I’m interested in a tummy tuck",
    "I need to get a nose job",
    "I’m interested in a tummy tuck",
  ];

  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const currentPhrase = placeholders[index];
    const typingSpeed = isDeleting ? 50 : 100;

    const typing = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typing);
  }, [charIndex, isDeleting, index]);

  // Seed travels via sessionStorage only — NEVER as a query param.
  const handleSubmit = () => {
    const seed = value.trim();
    if (!seed) return;
    setChatSeed(seed);
    router.push("/chat");
  };

  return (
    <div className="text-center mt-16 md:mt-0 mx-5 md:flex md:flex-col md:items-center md:justify-center md:h-screen">
      <h1 className="flex justify-center gap-2 md:gap-4 font-normal text-[30px] md:text-[50px] text-[#191919]">
        {`Hi! I’m`}{" "}
        <Image
          src={Logo}
          alt="Logo"
          className="self-center w-[100px] md:w-[150px]"
        />{" "}
        👋
      </h1>
      <p className="font-normal text-sm md:text-xl text-[#191919]">
        {`I’ll guide you to the results you want with a surgeon you can trust.`}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mx-auto mt-12 md:mt-20 relative w-full md:max-w-md"
      >
        <Input
          type="text"
          placeholder={currentText}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="transition-all duration-300"
        />
        <button type="submit" aria-label="Start chat">
          <Image
            src={"/assets/svg/arrow.svg"}
            alt="Arrow Icon"
            width={35}
            height={35}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer h-6 w-6 md:h-auto md:w-auto"
          />
        </button>
      </form>

      <Link href="/chat" className="mx-auto mt-6 block w-fit">
        <Button variant="outline" className="py-3 px-8" size={undefined}>
          Chat with Emma
        </Button>
      </Link>
    </div>
  );
}
