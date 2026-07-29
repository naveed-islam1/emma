import FeatureCards from "@/components/blog/feature-cards";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Image from "next/image";
import React from "react";


export default function Blog() {
  return (
    <>
      <Navbar />

      <div className="pt-16 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        <div>
          <Image
            src="/assets/jpg/smiling-female-patient.jpg"
            alt="Hero Image"
            width={1200}
            height={900}
            className={
              "w-full h-[250px] object-cover md:h-[500px] rounded-2xl md:rounded-3xl"
            }
          />
        </div>
      </div>
      <FeatureCards />
      <Footer />
    </>
  );
}
