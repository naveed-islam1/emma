"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { faqs } from "./faqs";

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div className="py-16 md:py-16 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        <div className="mb-12 grid lg:grid-cols-2 items-end gap-5 lg:gap-8 lg:mt-0">
          <div>
            <h1 className="arial text-[40px] xl:text-[50px] font-normal text-[#131313] leading-tight">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-[#4E4E4E] text-lg md:text-xl font-normal leading-relaxed">
            {`We know choosing surgery abroad is a big step. That’s why we’ve
            gathered answers to the most common questions patients ask about
            Emma, our process, and what to expect.`}
          </p>
        </div>

        {/* faq */}
        <section className="bg-[#F1F4F9] rounded-3xl p-8 lg:p-15">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="cursor-pointer"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-lg md:text-xl font-normal text-[#131313] mb-2 flex justify-between items-center">
                  {faq.id}. {faq.question}
                </h3>

                {/* Always in the DOM so crawlers see the answers; CSS toggles visibility */}
                <p
                  className={`text-[#4E4E4E] font-normal leading-relaxed ${
                    openId === faq.id ? "" : "hidden"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bg-[#351F65] py-[63px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto lg:flex justify-between items-center ">
          <p className="text-xl md:text-2xl xl:text-[30px] font-normal text-white text-center lg:text-start">
            {`You’ve got the answers, now let’s begin your transformation.`}
          </p>
          <Link href="/chat">
            <Button
              variant="default"
              className="mx-auto lg:mx-0  block w-fit py-3 px-8"
              size={undefined}
            >
              Chat with Emma
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
