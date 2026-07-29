import Navbar from "@/components/common/navbar";
import Image from "next/image";
import React from "react";

const sections = [
  {
    id: 1,
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly to us and information we collect automatically when you use our Services.",
      "Information You Provide: When you create an account, make a booking, or otherwise communicate with us, you may provide us with personal information, such as your name, email address, phone number, and payment details.",
      "Information We Collect Automatically: We may automatically collect information about your device, browsing actions, and usage patterns. This may include information like your IP address, browser type, access times, pages viewed, and location data.",
    ],
  },
  {
    id: 2,
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to:",
      "• Provide, maintain, and improve our Services",
      "• Process your transactions and manage your account",
      "• Communicate with you about products, services, and events",
      "• Monitor and analyze trends, usage, and activities in connection with our Services",
      "• Detect, investigate, and prevent fraudulent or illegal activities",
    ],
  },
  {
    id: 3,
    title: "3. Sharing of Information",
    content: [
      "We may share your personal information with third parties in the following circumstances:",
      "With Service Providers: We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.",
      "Legal Compliance: We may disclose information if we believe it is necessary to comply with applicable laws, regulations, or legal processes.",
    ],
  },
  {
    id: 4,
    title: "4. Data Security",
    content: [
      "We implement reasonable security measures designed to protect the information we collect. However, no security system is impenetrable, and we cannot guarantee the security of your information.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl py-16 mx-5 md:mx-8 lg:mx-auto">
        <div className="w-full bg-[#F1F4F9] rounded-3xl p-8 md:p-15 leading-relaxed">
          <h1 className="text-2xl bold text-black mb-2">Privacy Policy</h1>
          <p className="text-base text-black mb-8">Last Updated: [Date]</p>

          <p className="text-black mb-6">
            {`At [Your Company Name] (“we,” “us,” “our”), we respect your privacy
            and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, and disclose information about
            you when you access or use our website, mobile applications, and
            other online products and services (collectively, the “Services”) or
            when you otherwise interact with us.`}
          </p>

          {sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h2 className="text-base font-bold text-black mb-3">
                {section.title}
              </h2>
              {section.content.map((para, index) => (
                <p
                  key={index}
                  className="text-black mb-3 leading-relaxed whitespace-pre-line"
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
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
