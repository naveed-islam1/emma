"use client";
import Navbar from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Support() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl pt-16 md:pt-20 pb-16 mx-5 md:mx-8 lg:mx-auto md:min-h-screen grid grid-cols-12">
        {/* Left Section - Image */}
        <div className="hidden p-6 lg:col-span-6 lg:flex items-center justify-center">
          <Image
            src="/assets/jpg/young-women-in-glasses.jpg"
            alt="young women in glasses"
            width={1200}
            height={400}
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="col-span-12 lg:col-span-6 flex items-center text-center">
          <div className="w-full lg:px-6 flex flex-col items-center justify-center">
            <h2 className="arial font-normal text-[40px] lg:text-[50px] text-black mb-8  text-center leading-tight">
              Help Center
            </h2>

            <form className="space-y-8 md:space-y-12 w-full text-start">
              {/* Email Field */}
              <div>
                <label className="block text-sm md:text-xl font-normal text-[#424242] mb-1">
                  Email address:
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#F1F4F9] rounded-xl md:py-full"
                />
              </div>
              <div>
                <label className="block text-sm md:text-xl font-normal text-[#424242] mb-1">
                  Message:
                </label>
                <Textarea
                  placeholder="What can we help you with..."
                  className={
                    "w-full bg-[#F1F4F9] rounded-xl md:py-full h-33 md:h-55"
                  }
                />
              </div>
              {/* Sign In Button */}
              <div className="flex justify-center">
                <Button
                  type=""
                  className="w-fit rounded-xl py-3"
                  variant={undefined}
                  size={undefined}
                >
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* footer */}
      <div className="bg-[#351F65] py-5 md:py-[33px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto flex justify-between items-center ">
          <div>
            <Image
              src="/assets/svg/emma-logo-purple.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-20 md:w-[100px] lg:w-auto"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <div>
              <Image
                src="/assets/png/facebook-white.png"
                alt="facebook icon"
                width={300}
                height={25}
                className="w-7 h-7 "
              />
            </div>
            <div>
              <Image
                src="/assets/png/instagram-white.png"
                alt="instagram icon"
                width={300}
                height={25}
                className="w-7 h-7 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
