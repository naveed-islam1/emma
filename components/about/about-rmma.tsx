import React from "react";

const stats = [
  {
    id: 1,
    title: "70%",
    description: "More affordable than in the U.S.",
  },
  {
    id: 2,
    title: "100%",
    description: "Certified surgeons verified for safety and results",
  },
  {
    id: 3,
    title: "All-Inclusive",
    description: "Recovery stays and support services included abroad",
  },
];

export default function AboutEmma() {
  return (
    <>
      <div className="bg-[#F1F4F9]">
        <div className="max-w-7xl bg-[#F1F4F9] mx-5 lg:mx-8 xl:mx-auto py-10 lg:py-12  flex flex-col justify-center items-center">
          <ul className="text-lg md:text-xl text-[#131313] font-normal list-disc pl-5 mb-4">
            <li>About Emma</li>
          </ul>

          <h1 className="arial font-normal  text-[30px] md:text-[45px] xl:text-[60px] mb-10 leading-tight text-center">
            Emma uses our expertise in medical tourism and surgery to make your
            journey safe, simple, and personalized.
          </h1>

          {/* grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-center w-full">
            {stats.map((item) => (
              <div
                key={item.id}
                className="col-span-12 md:col-span-4 flex flex-col items-center"
              >
                <h3 className="text-2xl lg:text-3xl font-normal text-black">
                  {item.title}
                </h3>
                <p className="font-normal text-lg lg:text-xl text-gray-600 mt-2 lg:w-[80%] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
