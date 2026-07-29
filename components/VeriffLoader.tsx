"use client";
import React from "react"; 
import Script from "next/script";

export default function VeriffLoader() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.veriff.me/sdk/css/1.7/veriff.min.css"
      />
      <Script
        src="https://cdn.veriff.me/sdk/js/1.7/veriff.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}