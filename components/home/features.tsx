import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <>
      <div className="py-16 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        <div>
          <ul className="text-lg md:text-xl text-[#131313] font-normal list-disc pl-5">
            <li>Features</li>
          </ul>
        </div>
        {/* Header */}
        <div className="mb-6 grid lg:grid-cols-2 items-end gap-6 mt-2 lg:mt-0">
          <div>
            <h2 className="text-[45px] xl:text-[50px] font-normal text-[#131313] leading-tight">
              Why thousands trust Emma
            </h2>
          </div>
          <p className="text-[#4E4E4E] text-xl font-normal leading-relaxed">
            Finding the right surgeon shouldn’t be complicated. Emma makes it
            simple, safe, and crystal clear.
          </p>
        </div>

        {/* Grid Section */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-4 
            gap-4
            auto-rows-[200px]
            md:auto-rows-[250px]
          "
        >
          {/* Top Left Image */}
          <div className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden">
            <Image
              src="/assets/jpg/smilingWomen.jpg"
              alt="Smiling woman"
              width={1200}
              height={500}
              className="object-cover h-[200px] md:h-[300px] w-full"
            />
          </div>

          {/* 24/7 Card */}
          <div className="bg-[#351F65] text-white rounded-2xl p-6 flex flex-col justify-center">
            <h3 className="text-[35px] lg:text-[50px] font-normal mb-3">
              24/7
            </h3>
            <p className="text-sm lg:text-base font-normal text-white leading-tight">
              Friendly AI support, with a safe, private, and no-pressure
              approach to guide your decisions.
            </p>
          </div>

          {/* Top Right Image - span full height of grid on md+ */}
          <div className="rounded-2xl overflow-hidden md:row-span-2 md:col-span-1">
            <Image
              src="/assets/jpg/laptopUser.jpg"
              alt="Laptop user"
              width={1200}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>

          {/* 400+ Card */}
          <div className="bg-[#8d3cf7] text-white rounded-2xl p-6 flex flex-col justify-center md:col-span-2">
            <h3 className="text-[35px] lg:text-[50px] font-normal mb-3">
              400+
            </h3>
            <p className="text-sm lg:text-base text-white leading-tight">
              Trusted board-certified surgeons who meet the highest standards of
              care. Your matches are tailored to your goals, with both local and
              international options so you can explore what feels right for you.
            </p>
          </div>

          {/* Bottom Image */}
          <div className="rounded-2xl overflow-hidden md:col-span-1">
            <Image
              src="/assets/jpg/happyWomen.jpg"
              alt="Happy woman"
              width={500}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
