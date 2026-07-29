"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Welcome to Emma, Doctor!",
    description:
      "We’re excited to have you join our growing network of trusted, board-certified surgeons.",
    buttonText: "Next",
    footer: "Already have an account?",
    footerLink: "Sign in",
  },
  {
    id: 2,
    // title: "",
    description:
      " Together, we’re making it easier for patients to find the right care and for you to connect with those who need your expertise.",
    buttonText: "Next",
    footer: "Already have an account?",
    footerLink: "Sign in",
  },
  {
    id: 3,
    // title: "",
    description:
      "Let’s begin by getting to know your practice and your ideal patients!",
    buttonText: "Create Account",
    footer: "Already have an account?",
    footerLink: "Sign in",
  },
];

export default function Steps() {
  const [steps, setSteps] = useState(0);

  const handleNext = () => {
    setSteps((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <section
        className="min-h-screen pt-4"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #EDE0FF)",
        }}
      >
        <div className=" max-w-7xl mx-5 md:mx-8 lg:mx-auto ">
          {/* Logo */}
          <Image
            src="/assets/svg/Emma-logo.svg"
            alt="Emma Logo"
            width={100}
            height={50}
          />

          <div className="my-14 h-[calc(100vh-100px)] w-full flex flex-col items-center md:justify-center text-center max-w-md space-y-12 mx-auto">
            {/* Title */}
            <h2 className="font-normal text-[30px] md:text-[50px] text-black leading-tight">
              {slides[steps].title}
            </h2>

            {/* Description */}
            <p className="text-xl text-[#424242]">
              {slides[steps].description}
            </p>

            {/* Button */}
            {steps === slides.length - 1 ? (
              <Link href={"/signup"}>
                <Button
                  className={"py-2 px-8"}
                  variant={undefined}
                  size={undefined}
                >
                  {slides[steps].buttonText}
                </Button>
              </Link>
            ) : (
              <Button
                className={"w-fit py-2 px-8"}
                onClick={handleNext}
                variant={undefined}
                size={undefined}
              >
                {slides[steps].buttonText}
                  
              </Button>
            )}

            {/* Footer */}
            <p className=" text-[#424242] text-base">
              {slides[steps].footer}{" "}
              <Link
                href={"/signin"}
                className="text-[#5A8CFF] ml-2 hover:underline"
              >
                {slides[steps].footerLink}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
