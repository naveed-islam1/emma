"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useGetProfileQuery } from "@/services/profileApi";
import { getSignedUrl } from "@/utils/getSignedUrl";
import { IoPersonCircle } from "react-icons/io5";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function DashboardLayout({ children }) {
  const { data: userProfileData } = useGetProfileQuery({});
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const user = auth.user as User;
  const [profilePitcure, setProfilePiture] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchUserProfilePicture() {
      if (userProfileData?.picture) {
        const signedUrl = await getSignedUrl(userProfileData?.picture);
        setProfilePiture(signedUrl);
      }
    }

    fetchUserProfilePicture();
  }, [userProfileData]);

  return (
    <>
      <div className="grid  md:grid-cols-12 ">
        <div className=" md:col-span-3 xl:col-span-2 md:bg-white md:px-4 md:border-r md:border-[#F2F4F7] md:min-h-screen md:py-7">
          <Sidebar />
        </div>
        <div className=" md:col-span-9 xl:col-span-10 bg-gray-100 md:h-screen md:overflow-y-auto">
          <div className=" bg-white p-4 md:pr-8 flex justify-end border-b border-[#F2F4F7] sticky top-0 z-10">
            <Image
              src={
                profilePitcure ? profilePitcure : "/assets/png/profile_icon.png"
              }
              alt="Description"
              width={35}
              height={35}
              className="cursor-pointer rounded-full size-10"
              onClick={() => setOpen((prev) => !prev)}
            />

            {open && (
              <div
                ref={popupRef}
                className="bg-gray-200 rounded-2xl p-5 absolute top-16 right-7 shadow-lg w-[300px] transition-all"
              >
                <p className="font-semibold text-base text-black text-center">
                  {user?.email}
                </p>
                <Button
                  className="py-3 mx-auto block mt-4 rounded-2xl"
                  variant={undefined}
                  size={undefined}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      localStorage.clear();
                    }
                    dispatch(logout(""));
                    router.push("/signin");
                  }}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
          <Elements stripe={stripePromise}>
            <div className="px-4 py-8 md:p-8 mb-16 md:mb-5">{children}</div>
          </Elements>
        </div>
      </div>
    </>
  );
}
