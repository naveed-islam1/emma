"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    quote:
      "“Emma has become an essential part of how new patients discover my practice—patients feel reassured knowing I’m verified and board-certified.”",
    name: "Dr. Mario Olivares",
    role: "Bariatric Surgeon",
    image: "/assets/jpg/doctor-hospital-team.jpg",
  },
  {
    id: 2,
    quote:
      "“The platform has significantly increased our patient intake. The verification process builds immediate trust with new patients.”",
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    image: "/assets/jpg/doctor-hospital-team.jpg",
  },
  {
    id: 3,
    quote:
      "“As a new practitioner, Emma helped me establish credibility and connect with patients who value certified medical professionals.”",
    name: "Dr. Michael Chen",
    role: "Orthopedic Surgeon",
    image: "/assets/jpg/doctor-hospital-team.jpg",
  },
  {
    id: 4,
    quote:
      "“The referral system through Emma has brought consistent, high-quality patients to our practice. It's been transformative.”",
    name: "Dr. Priya Sharma",
    role: "Dermatologist",
    image: "/assets/jpg/doctor-hospital-team.jpg",
  },
];

export default function TestimonialSlider() {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: false,
    cssEase: "linear",
  };

  return (
    <section className="bg-[#F1F4F9] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Slider ref={setSliderRef} {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="outline-none">
              {/* Quote Text */}
              <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-snug mb-8">
                {testimonial.quote}
              </p>

              {/* Doctor Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Arrows */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => sliderRef?.slickPrev()}
            className="p-2 hover:opacity-80 transition-opacity focus:outline-none rounded-full"
            aria-label="Previous testimonial"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/assets/svg/arrow-left.svg"
                alt="Previous"
                fill
                className="object-contain"
              />
            </div>
          </button>
          <button
            onClick={() => sliderRef?.slickNext()}
            className="p-2 hover:opacity-80 transition-opacity focus:outline-none rounded-full"
            aria-label="Next testimonial"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/assets/svg/arrow-right.svg"
                alt="Next"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
