import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MedicalTourismJourney() {
  const images = [
    {
      src: "/assets/jpg/young-africans.jpg",
      className: "top-8 left-66 w-[164px] h-[109px]",
    },
    {
      src: "/assets/jpg/surgery-doctor.jpg",
      className: "top-16 right-20 w-[200px] h-[133px]",
    },
    {
      src: "/assets/jpg/smile-doctor.jpg",
      className: "bottom-16 left-62 w-[125px] h-[83px]",
    },
    {
      src: "/assets/jpg/a-beautiful-young-asian.jpg",
      className: "bottom-8 right-56 w-[154px] h-[102px]",
    },
    {
      src: "/assets/jpg/smile-african.jpg",
      className: "top-1/2 left-10 w-[200px] h-[133px] -translate-y-1/2",
    },
    {
      src: "/assets/jpg/young-asian-pragnent.jpg",
      className: "top-1/2 right-10 w-[125px] h-[83px] -translate-y-1/2",
    },
  ];
  return (
    <>
      <section className="relative flex items-center justify-center text-center h-[250px] sm:h-[400px] md:h-[600px] bg-[#351F65] overflow-hidden">
        {/* Floating Images */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Floating person ${index + 1}`}
            className={`hidden md:block absolute rounded-3xl object-cover ${img.className}`}
          />
        ))}

        {/* Center Content */}
        <div className="relative z-10">
          <h1 className="font-normal text-[30px] sm:text-[40px] md:text-[30px] lg:text-[50px] text-white mb-6 leading-tight">
            Your medical tourism <br />
            journey starts here
          </h1>
          <Link
            href="https://chatbase.co/CxhlAExpUPBoBhFZgoC-H/help"
            target="_blank"
          >
            <Button variant="default" className={undefined} size={undefined}>
              Chat with Emma
            </Button>
          </Link>
        </div>

        {/* Optional subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
      </section>
    </>
  );
}
