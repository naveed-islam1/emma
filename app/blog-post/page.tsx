import Navbar from "@/components/common/navbar";
import Image from "next/image";
import React from "react";

// Sidebar topics
const topics = [
  "Why Mexico Has Become a Global Leader in Medical Tourism",
  "Safety and Quality Standards",
];

// Blog sections data
const sections = [
  {
    heading:
      "Getting Surgery in Mexico: What You Need to Know About Plastic and Bariatric Procedures",
    paragraphs: [
      "For many patients in the United States and Canada, the idea of traveling abroad for surgery may feel overwhelming at first. Yet every year, tens of thousands of people choose Mexico as their destination for plastic surgery and bariatric surgery—and for good reason. From affordability to world-class medical professionals, Mexico has become one of the top medical tourism hubs in the world.",
      "In this post, we’ll break down the most important things you need to know if you’re considering surgery in Mexico, so you can feel confident and informed about your options.",
    ],
  },
  {
    subheading: "Why Mexico Has Become a Global Leader in Medical Tourism",
    paragraphs: [
      "Mexico is strategically located just across the border from the U.S., making it one of the most convenient destinations for patients seeking surgery abroad. Cities like Tijuana, Monterrey, Guadalajara, and Cancun are home to modern hospitals and specialized clinics that rival facilities in the United States.",
    ],
    list: [
      "Cost savings: Plastic and bariatric procedures in Mexico can cost 50–70% less than in the U.S.",
      "Certified surgeons: Many surgeons are board-certified in Mexico and internationally.",
      "All-inclusive recovery packages: Clinics often bundle the surgery, hospital stay, transportation, and recovery accommodations into one package.",
    ],
  },
  {
    subheading: "Safety and Quality Standards",
    paragraphs: [
      "Safety is often the biggest concern for patients. The good news: clinics in Mexico are accredited by international organizations, and many surgeons are certified by bodies such as the Mexican Council of Plastic Surgery or the Mexican College of Bariatric Surgery.",
    ],
    list: [
      "Check certifications: Always verify your surgeon’s credentials.",
      "Read reviews: Look for testimonials and before-and-after results.",
      "Choose accredited hospitals: Facilities with international accreditation uphold high standards of cleanliness, anesthesia safety, and emergency readiness.",
    ],
  },
];

export default function BlogPost() {
  return (
    <>
      <Navbar />

      <div className="pt-6 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        {/* Breadcrumb */}
        <div className="text-base text-gray-500 mb-8 flex items-center gap-3">
          <span>Emma</span>
          <span>{`›`}</span>
          <span className="text-gray-700">Blog</span>
        </div>

        {/* Title Box */}
        <div className="bg-[#F1F4F9] rounded-2xl p-6 space-y-4">
          <h1 className="arial font-normal text-[30px] md:text-[50px] text-[#191919]">
            Getting surgery in Mexico
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#4E4E4E]">
            <span>6 min read</span>
            <span className="w-1.5 h-1.5 bg-[#131313] rounded-full"></span>
            <span>
              Updated:{" "}
              <span className="font-semibold text-gray-900">June 22, 2025</span>
            </span>
          </div>
        </div>

        {/* text section */}

        <div className="py-8 md:p-15 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Sidebar */}
          <aside className="md:col-span-3">
            <h3 className="text-black text-base font-bold mb-6 md:mb-8">
              {`Here’s what we’ll cover`}
            </h3>
            <ul className="space-y-6 md:space-y-8 text-black text-sm">
              {topics.map((topic, index) => (
                <li key={index} className="">
                  {topic}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Blog Content */}
          <article className="md:col-span-9 text-black leading-relaxed">
            {sections.map((section, index) => (
              <div key={index} className="mb-10">
                {section.heading && (
                  <h1 className="text-2xl md:text-[40px] font-normal mb-4">
                    {section.heading}
                  </h1>
                )}

                {section.subheading && (
                  <h2 className="text-base font-bold mb-3">
                    {section.subheading}
                  </h2>
                )}

                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul className="list-disc ml-6 space-y-2 mt-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </div>

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
