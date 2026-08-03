import Image from "next/image";
import { Button } from "../ui/button";
import React from "react";
import Link from "next/link";

export default function Certified() {
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto grid grid-cols-1 lg:grid-cols-12 items-start py-10 lg:py-14">
        <div className="lg:col-span-2">
          <ul className="text-lg md:text-xl text-[#131313] font-normal list-disc pl-5">
            <li>Certified</li>
          </ul>
        </div>
        {/* Top Row */}
        <div className="lg:col-span-10 flex flex-col items-start gap-3 mb-6">
          <div>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-[#131313] mt-4 lg:mt-1 leading-snug">
              Our network is made up solely of accredited, board-certified
              surgeons, carefully verified for excellence.
            </p>
          </div>

          {/* Logos Row */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mt-6 items-center w-full">
            <div>
              <Image
                src="/assets/png/colegio.png"
                alt="Colegio logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <Image
                src="/assets/jpg/am.jpg"
                alt="ASBMS logo"
                width={180}
                height={50}
                className="object-contain w-56"
              />
            </div>
            <div>
              <Image
                src="/assets/png/cm.webp"
                alt="AAAHC logo"
                width={200}
                height={50}
                className="object-contain w-50 h-auto"
              />
            </div>
            <div>
              <Image
                src="/assets/png/consejo.png"
                alt="Consejo logo"
                width={300}
                height={50}
                className="h-full w-40"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#351F65] py-[63px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto lg:flex justify-between items-center ">
          <p className="text-xl md:text-2xl xl:text-[30px] font-normal text-white text-center lg:text-start">
            Get matched with the right certified surgeon in minutes
          </p>
          <Link href="/chat">
            <Button
              variant="default"
              className={"mx-auto lg:mx-0 block mt-5 lg:mt-0"}
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
