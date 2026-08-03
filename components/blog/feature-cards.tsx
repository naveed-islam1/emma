import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/blog";

export default function FeatureCards() {
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        <div className="py-12 md:py-16">
          <h2 className="arial text-[30px] md:text-[45px] xl:text-[50px] font-normal text-[#131313] leading-tight mb-8">
            Featured
          </h2>

          {/* grid */}
          <div className="grid md:grid-cols-12 gap-10 xl:gap-25">
            {posts.map((post) => (
              <Link
                key={post.slug}
                className="md:col-span-6 lg:col-span-4 bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                href={`/blog/${post.slug}`}
              >
                {/* Image Section */}
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={300}
                    className="w-full h-56 object-cover"
                  />
                  {post.tag && (
                    <span className="absolute top-3 left-3 font-normal bg-[#8A38F5] text-white text-xs px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-[#F1F4F9]">
                  <h3 className="text-[#4E4E4E] font-medium text-xl underline cursor-pointer">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#351F65] py-[63px]">
        <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto lg:flex justify-between items-center ">
          <p className="text-xl md:text-2xl xl:text-[30px] font-normal text-white text-center lg:text-start">
            Your Journey. Your Surgeon. Your Results.
          </p>
          <Link href="/chat">
            <Button
              variant="default"
              className="mx-auto lg:mx-0  block w-fit py-3 px-8"
              size={undefined}
            >
              Chat with Emma
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
