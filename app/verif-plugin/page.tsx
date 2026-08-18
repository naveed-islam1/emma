"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVeriffVerifyMutation } from "@/services/profileApi";
import { useSelector } from "react-redux";
import { User } from "@/services/types";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

function Verifplugin() {
  const [step, setStep] = useState(1);
  const [veriffVerify, { isLoading }] = useVeriffVerifyMutation();
  const user = useSelector((state: any) => state.auth.user as User);

  // Step2
  const searchParams = useSearchParams();
  const step2 = searchParams?.get("step2");

  // setStep
  useEffect(() => {
    if (step2) {
      setStep(2);
    }
  }, [step2]);

  const handleNext = () => {
    const storedUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;
    const userId = user?.id || storedUser?.id;

    if (!userId) {
      toast.error("User session not found. Please sign in again.");
      return;
    }

    veriffVerify({
      userId,
    })
      .unwrap()
      .then((res) => {
        localStorage.setItem("sessionId", res.sessionId);
        localStorage.setItem("vendorData", res.vendorData);
        const verificationUrl = res.verify_url;

        window.location.href = verificationUrl;
      })
      .catch((error) => {
        toast.error(
          error?.data?.error ||
            error?.data?.message ||
            error?.message ||
            "Error verifying user",
        );
      });
  };

  return (
    <div
      className=" min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #EDE0FF)",
      }}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <h2 className="text-black mb-16 text-xl md:text-3xl">
              Veriff Plugin
            </h2>
            <Button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 rounded-xl"
              variant={undefined}
              size={undefined}
            >
              {isLoading ? <Loader /> : "Verify"}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <Image
                src="/assets/svg/Emma-logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-20 md:w-[100px] lg:w-auto mt-8 ml-5 md:ml-8"
              />
            </div>

            <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
              <div className="max-w-md text-center space-y-5 md:space-y-8 px-5 md:px-0">
                <h2 className="text-black text-xl md:text-2xl">
                  Identity Verified Successfully
                </h2>
                <p className="text-sm md:text-base text-[#4E4E4E]">
                  Your identity has been successfully verified! To start
                  receiving patient leads, please complete your profile by
                  uploading all information in your profile section. The more
                  complete your profile, the easier it is for patients to find
                  and choose you.
                </p>
                <Link href="/">
                  <Button
                    type="button"
                    className="px-8 py-3 rounded-[15px]"
                    variant={undefined}
                    size={undefined}
                  >
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// useSearchParams() requires a Suspense boundary during prerendering
export default function VerifpluginPage() {
  return (
    <Suspense fallback={null}>
      <Verifplugin />
    </Suspense>
  );
}
