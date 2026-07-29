import Image from "next/image";
import React from "react";

export default function Travel() {
  const BenefitsList = () => {
    const benefits = [
      "Save 40–70% compared to U.S. prices, with all-inclusive packages.",
      "Get treated by certified, internationally trained surgeons vetted by Emma.",
      "Benefit from complete packages that include surgery, lodging, transportation, and post-op care.",
      "Recover in beautiful destinations while enjoying privacy and comfort.",
      "Receive personalized assistance for surgeon matching, travel planning, and aftercare.",
    ];

    return (
      <>
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto py-10 lg:py-16 ">
          <ul className="text-xl text-[#131313] font-normal list-disc pl-5">
            <li>Travel</li>
          </ul>
          <h1 className="arial font-normal text-[40px] md:text-[45px] xl:text-[50px] mb-10">
            Why get surgery abroad?
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <div className="space-y-6">
              {benefits.map((text, index) => (
                <div key={index} className="flex gap-3 lg:space-y-13">
                  <Image
                    src="/assets/svg/checkIcon.svg"
                    alt="check icon"
                    width={24}
                    height={24}
                    className="mt-1"
                  />
                  <p className="text-[#4E4E4E] text-lg md:text-xl font-normal leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <Image
                src="/assets/jpg/surgeryAbroad.jpg"
                alt="Surgery abroad"
                width={1200}
                height={250}
                className="object-cover w-full h-[500px] rounded-3xl"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return <BenefitsList />;
}
