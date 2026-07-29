"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function DoctorHero() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 py-16 xl:mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left Section */}
        <div className="md:col-span-5">
          <h1 className="text-[45px] xl:text-5xl font-normal text-[#131313] mb-4">
            {`Hi Doctor! I’m`} <br /> Emma
          </h1>
          <p className="text-[#4E4E4E] font-normal text-xl mb-6">
            {`Let’s connect you with patients who need your expertise.`}
          </p>

          <Link href={"/steps"}>
            <Button variant="default" className={undefined} size={undefined}>
              Join Emma
            </Button>
          </Link>

          {/* Doctors Joined */}
          <div className="gap-3 mt-8">
            {/* Small stacked images */}
            <div className="flex -space-x-5">
              <Image
                src="/assets/jpg/doctor-hospital-team.jpg"
                alt="doctor"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/assets/jpg/doctor-hospital-team.jpg"
                alt="doctor"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <Image
                src="/assets/jpg/pharmacist-smile.jpg"
                alt="doctor"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />

              <span className="flex justify-center items-center bg-[#A259FF] text-white text-sm font-normal px-2 py-0.5 rounded-full">
                1K+
              </span>
            </div>
            <p className="text-[#4E4E4E] text-xl font-normal mt-1">
              1,000+ doctors already joined Emma
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-1"></div>
        <div className="relative flex justify-center md:col-span-6">
          {/* Doctor image */}
          <Image
            src="/assets/jpg/doctor-main.jpg"
            alt="Doctor"
            width={1200}
            height={450}
            className="object-contain w-full"
          />

          {/* Floating Card */}
          <div className="absolute w-50 sm:w-55 xl:w-60 bottom-7 left-7 sm:bottom-6 sm:left-6 xl:bottom-9 xl:left-9 bg-white shadow-md rounded-3xl p-4 lg:p-5 flex flex-col items-start gap-3">
            <h3 className="text-base font-normal text-black lg:mb-1">
              Total patients booked
            </h3>
            <div className="flex justify-between items-center w-full gap-2">
              <p className=" text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900">
                34
              </p>
              <Image
                src="/assets/svg/arrow-up-right.svg"
                alt="arrow up right"
                width={17}
                height={17}
                className="w-4 sm:w-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* bottom Bar */}
      {showDisclaimer && (
        <div className="relative rounded-2xl text-base font-normal max-w-5xl z-10 mx-5 lg:mx-8 xl:mx-auto -mt-12 lg:-mt-25 bg-[#2A1849] text-white flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-3">
          <p className="text-sm text-center md:text-left">
            Emma is currently available exclusively for doctors practicing in
            Mexico.
          </p>
          <Button
            variant="default"
            className={undefined}
            size={undefined}
            onClick={() => setShowDisclaimer(false)}
          >
            Got it
          </Button>
        </div>
      )}
    </>
  );
}
