"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Is surgery abroad really safe?",
    answer:
      "Yes. At Emma, we only work with certified and verified surgeons who meet strict standards. Every doctor in our network is highly trained and experienced, ensuring your procedure is safe and professional.",
  },
  {
    id: 2,
    question: "How much can I save by getting surgery abroad?",
    answer:
      "On average, patients save up to 70% compared to U.S. prices. And unlike in the U.S., many packages abroad include recovery houses, meals, and support services, making it a more complete experience.",
  },
  {
    id: 3,
    question: "How does Emma help me choose the right surgeon?",
    answer:
      "We guide you step by step. Based on your medical profile and the results you want, Emma matches you with surgeons who specialize in your specific needs. You'll be able to review their profiles before making your decision.",
  },
  {
    id: 4,
    question: "What does ‘all-inclusive experience’ mean?",
    answer:
      "Most of our partner surgeons offer packages that include not only the procedure, but also recovery houses, nursing care, transportation, and follow-up, things that usually cost extra in the U.S.",
  },
  {
    id: 5,
    question: "Will I still have direct contact with my surgeon?",
    answer:
      "Absolutely. Once connected, you'll be in direct communication with your surgeon and their team. Emma simply helps you find the right fit; your medical relationship is always between you and your doctor.",
  },
  {
    id: 6,
    question: "What happens if I have complications after surgery?",
    answer:
      "Your surgeon will provide clear instructions and follow-up care. Many packages include extended recovery support. We also guide you on what’s covered so you feel supported every step of the way.",
  },
  {
    id: 7,
    question: "Do I need to speak Spanish?",
    answer: "Not at all. Most of our surgeons and their staff speak English.",
  },
  {
    id: 8,
    question: "How do I get started?",
    answer:
      "It’s simple: complete a short intake with Emma, review your matched surgeons, and choose the one that best fits your needs. From there, your journey is personalized, safe, and stress-free.",
  },
];

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
            <h2 className="arial text-[40px] xl:text-[50px] font-normal text-[#131313] leading-tight">
              Frequently Asked Questions
            </h2>
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

                {openId === faq.id && (
                  <p className="text-[#4E4E4E] font-normal leading-relaxed">
                    {faq.answer}
                  </p>
                )}
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
          <Link
            href={"https://www.chatbase.co/CxhlAExpUPBoBhFZgoC-H/help"}
            target="_blank"
          >
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
