import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BringPatients() {
  return (
    <>
      <div className="bg-[#351F65] py-10 lg:pb-0 lg:pt-16">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 items-center">
          <div className="lg:col-span-5 hidden lg:block">
            <Image
              src="/assets/png/emma.png"
              alt="Doctor"
              width={500}
              height={450}
              className="object-contain w-full"
            />
          </div>
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="font-normal text-[30px] sm:text-[40px] md:text-[30px] lg:text-[50px] text-white mb-6 leading-tight">
              Let Emma bring the right patients to you
            </h1>
            <Link href="/steps">
              <Button variant="default" className={undefined} size={undefined}>
                Join Emma
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
