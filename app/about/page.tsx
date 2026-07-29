import AboutEmma from "@/components/about/about-rmma";
import Discover from "@/components/about/discover";
import AboutHero from "@/components/about/hero";
import Mission from "@/components/about/mission";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutEmma />
      <Mission />
      <Discover />
      <Footer />
    </>
  );
}
