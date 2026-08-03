import type { Metadata } from "next";
import Navbar from "@/components/common/navbar";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/content/blog";

// Only slugs from the registry exist; anything else 404s at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Format "2025-06-22" as "June 22, 2025" without timezone pitfalls
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: [{ url: post.image }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const topics = post.sections
    .map((s) => s.subheading)
    .filter((s): s is string => Boolean(s));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle ?? post.title,
    description: post.description,
    image: `https://www.emmamatch.com${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: `https://www.emmamatch.com/blog/${post.slug}`,
    author: { "@id": "https://www.emmamatch.com/#organization" },
    publisher: { "@id": "https://www.emmamatch.com/#organization" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#4E4E4E]">
            <span>{post.readTimeMinutes} min read</span>
            <span className="w-1.5 h-1.5 bg-[#131313] rounded-full"></span>
            <span>
              Updated:{" "}
              <span className="font-semibold text-gray-900">
                {formatDate(post.updatedAt ?? post.publishedAt)}
              </span>
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
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </aside>

          {/* Main Blog Content */}
          <article className="md:col-span-9 text-black leading-relaxed">
            {post.sections.map((section, index) => (
              <div key={index} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl md:text-[40px] font-normal mb-4">
                    {section.heading}
                  </h2>
                )}

                {section.subheading && (
                  <h3 className="text-base font-bold mb-3">
                    {section.subheading}
                  </h3>
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
              alt="Emma logo"
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
