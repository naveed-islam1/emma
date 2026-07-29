"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Logo from "../../public/assets/svg/logo.svg";
import Image from "next/image";

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

      <div className="mx-auto mt-12 md:mt-20 relative w-full md:max-w-md">
        <Input
          type="text"
          placeholder={currentText}
          className="transition-all duration-300"
        />
        <Image
          src={"/assets/svg/arrow.svg"}
          alt="Arrow Icon"
          width={35}
          height={35}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer h-6 w-6 md:h-auto md:w-auto"
        />
      </div>
    </div>
  );
}
