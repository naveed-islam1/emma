import Image from "next/image";
import React from "react";
import Logo from "../../public/assets/svg/logo.svg";

export default function MeetWithEmma() {
  return (
    <>
      <div className="text-center bg-[#F1F4F9] py-10 md:py-20 px-5 md:px-8 lg:px-0 mt-16 md:mt-0">
        <h1 className="flex justify-center gap-2 md:gap-4 items-center font-normal text-[30px] md:text-[50px] text-[#191919]">
          Meet{" "}
          <Image
            src={Logo}
            className="self-center w-[100px] md:w-[150px] "
            alt={""}
          />
        </h1>
        <Image
          src={"/assets/jpg/meetEmma.jpg"}
          alt="image"
          width={900}
          height={500}
          className="mx-auto mt-10 rounded-3xl h-[400px] md:h-auto object-cover"
        />
      </div>
    </>
  );
}
