import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import DoctorHero from "@/components/doctor/hero";
import TrustedSurgeons from "@/components/doctor/trusted-surgeons";
import Growth from "@/components/doctor/growth";
import TestimonialSlider from "@/components/doctor/testimonial-slider";
import BringPatients from "@/components/doctor/bring-patients";

export const metadata: Metadata = {
  title: "For Surgeons — Get Qualified Patient Leads",
  description:
    "Join Emma's trusted network of verified surgeons in Mexico. Receive qualified, fraud-screened patient leads and grow your practice.",
  alternates: { canonical: "/doctor" },
};

export default function Doctor() {
  return (
    <>
      <Navbar />
      <DoctorHero />
      <TrustedSurgeons />
      <Growth />
      <TestimonialSlider />
      <BringPatients />
      <Footer />
    </>
  );
}
