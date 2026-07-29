import Image from "next/image";
import React from "react";

export default function AboutHero() {
  return (
    <>
      <div className="py-16 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        <div className="mb-12 grid lg:grid-cols-2 items-end gap-6 lg:mt-0">
          <div>
            <h2 className=" arial text-[40px] xl:text-[50px] font-normal text-[#131313] leading-tight">
              Affordable, personalized surgery abroad
            </h2>
          </div>
          <p className="text-[#4E4E4E] text-lg md:text-xl font-normal leading-relaxed">
            We guide you to the surgeon who matches your needs, with safer,
            cheaper, and more complete surgery abroad than in the U.S.
          </p>
        </div>
        <Image
          src="/assets/jpg/happy-smiliy-redhead-curly.jpg"
          alt="Hero Image"
          width={1200}
          height={900}
          className="w-full object-cover h-[200px] md:h-[500px] rounded-3xl"
        />
      </div>
    </>
  );
}
