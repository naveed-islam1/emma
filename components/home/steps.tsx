import React from "react";

export default function Steps() {
  const steps = [
    {
      number: "01",
      title: "Tell Emma Your Surgery Goals",
      description:
        "Start by sharing what procedure you're considering, your ideal timeline, and any preferences you have. Emma is here to guide you every step of the way.",
    },
    {
      number: "02",
      title: "Get Matched with Certified Surgeons",
      description:
        "Emma carefully selects the best surgeons for you based on your needs, preferences, and medical profile—only board-certified professionals.",
    },
    {
      number: "03",
      title: "Choose Who You'd Like to Connect With",
      description:
        "You can select one doctor or ask Emma to send your info to all three at once. It's completely up to you.",
    },
    {
      number: "04",
      title: "Surgeons Are Notified & Reach Out to You",
      description:
        "Once selected, the surgeon’s team receives your information. If they have available slots, they’ll reach out within 24 hours via your preferred contact method.",
    },
  ];
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto py-10 lg:py-16  flex flex-col justify-center items-center">
        <ul className="text-xl text-[#131313] font-normal list-disc pl-5">
          <li>Steps</li>
        </ul>
        <h1 className="font-normal  text-[40px] md:text-[45px] xl:text-[50px] mb-10 leading-tight text-center">
          This is how Emma works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative pt-16 md:pt-40 pb-16 text-center bg-[#F1F4F9] px-5 lg:px-13 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h2
                style={{ textShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)" }}
                className=" text-7xl md:text-8xl font-normal text-white select-none"
              >
                {step.number}
              </h2>
              <div className="relative">
                <h3 className="mb-17 text-xl lg:text-2xl font-medium text-[#131313]">
                  {step.title}
                </h3>
                <p className="text-[#4E4E4E] text-lg lg:text-xl font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
