import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const features = [
  {
    id: 1,
    icon: "/assets/png/security.png",
    title: "Transparency",
    description: "Clear pricing and no hidden costs.",
  },
  {
    id: 2,
    icon: "/assets/png/price-down.png",
    title: "Affordability",
    description: "Savings of up to 70% compared to the U.S.",
  },
  {
    id: 3,
    icon: "/assets/png/web.png",
    title: "Certified Network",
    description: "Only vetted, board-certified surgeons.",
  },
  {
    id: 4,
    icon: "/assets/png/all-included.png",
    title: "All-Inclusive Experience",
    description: "From surgery to recovery, everything is covered.",
  },
];

export default function Discover() {
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto py-10 lg:py-12  flex flex-col justify-center items-center">
        <h2 className="arial font-normal text-[30px] md:text-[45px] xl:text-[60px] mb-6 leading-tight text-center">
          Discover what sets Emma apart
        </h2>
        <p className="text-[#4E4E4E] max-w-xl text-lg md:text-xl text-center font-normal leading-relaxed">
          Patients trust Emma for one reason: we put their goals first with
          expert guidance, verified surgeons, and a complete experience abroad.
        </p>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-6 bg-[#F1F4F9] p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="bg-[#351F65] p-2.5 rounded-full flex items-center justify-center w-10 h-10">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={20}
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-normal text-gray-900">
                  {item.title}
                </h3>
                <p className="text-[#4E4E4E] text-lg md:text-xl font-normal mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#351F65] py-[63px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto lg:flex justify-between items-center ">
          <p className="text-xl md:text-2xl xl:text-[30px] font-normal text-white text-center lg:text-start">
            Your Journey. Your Surgeon. Your Results.
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
    </>
  );
}
