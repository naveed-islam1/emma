import type { Metadata } from "next";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Certified from "@/components/home/certified";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import MedicalTourismJourney from "@/components/home/medical-tourism-journey";
import MeetWithEmma from "@/components/home/meet-with-emma";
import Steps from "@/components/home/steps";
import Travel from "@/components/home/travel";
import React from "react";

export const metadata: Metadata = {
  title: { absolute: "Emma — Safe, Affordable Surgery in Mexico" },
  description:
    "Emma matches you with verified, board-certified surgeons in Mexico for safe, affordable surgery abroad — with personalized guidance from first chat to recovery.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MeetWithEmma />
      <Certified />
      <Features />
      <Travel />
      <Steps />
      <MedicalTourismJourney />
      {/* <Footer /> */}
      <Footer />
    </>
  );
}
