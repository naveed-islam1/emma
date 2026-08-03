import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TrustedSurgeons() {
  return (
    <>
      <div className="text-center bg-[#F1F4F9] py-10 md:py-20 px-5 md:px-8 lg:px-0 mt-16 md:mt-0">
        <h2 className="font-normal text-[30px] md:text-[50px] text-[#131313] leading-tight">
          Become part of a trusted <br /> community of surgeons
        </h2>
        <Image
          src={"/assets/jpg/smile-female-physician.jpg"}
          alt="image"
          width={1200}
          height={500}
          className="mx-auto mt-10 rounded-3xl h-[400px] md:h-auto object-cover"
        />
      </div>
      <div className="bg-[#351F65] py-[63px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto lg:flex justify-between items-center ">
          <p className="text-xl md:text-2xl xl:text-[30px] font-normal text-white text-center lg:text-start">
            Connect with more patients today
          </p>
          <Link href="/steps">
            <Button
              variant="default"
              className={"mx-auto lg:mx-0 block mt-5 lg:mt-0"}
              size={undefined}
            >
              Join Emma
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
