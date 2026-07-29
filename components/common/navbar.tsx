"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/assets/svg/Emma-logo.svg";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/authSlice";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const dispatch = useDispatch();
  const router = useRouter();

  // Determine current page
  const isDoctorPage = pathname === "/doctor";
  const isSigninPage = pathname === "/signin";

  // Button configs
  const primaryButtonText = isDoctorPage ? "Sign in" : "I’m a doctor";
  const primaryButtonLink = isDoctorPage ? "/signin" : "/doctor";

  const secondaryButtonText =
    isDoctorPage || isSigninPage ? "Join Emma" : "Chat with Emma";
  const secondaryButtonLink = isDoctorPage || isSigninPage ? "/steps" : "#";

  return (
    <div className="mx-5 lg:mx-8 relative">
      <div className="mx-auto rounded-3xl shadow-black grid grid-cols-2 lg:grid-cols-12 items-center max-w-7xl px-5 py-4 lg:py-3 mt-4">
        {/* Logo */}
        <div className="lg:col-span-2">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="Logo"
              width={100}
              height={100}
              className="w-20 md:w-[100px] lg:w-auto"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="col-span-5 xl:col-span-6 hidden lg:block items-center ml-auto">
          <ul className="flex space-x-10 font-normal text-[16px]">
            <Link href="/">
              <li className="cursor-pointer text-[#717171] hover:text-black">
                Home
              </li>
            </Link>
            <Link href="/about">
              <li className="cursor-pointer text-[#717171] hover:text-black">
                About
              </li>
            </Link>
            <Link href="/faq">
              <li className="cursor-pointer text-[#717171] hover:text-black">
                FAQ
              </li>
            </Link>
            <Link href="/blog">
              <li className="cursor-pointer text-[#717171] hover:text-black">
                Blog
              </li>
            </Link>
            <Link href="/support">
              <li className="cursor-pointer text-[#717171] hover:text-black">
                Support
              </li>
            </Link>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="col-span-5 xl:col-span-4 lg:flex space-x-4 hidden ml-auto">
          {/* Only show primary button if NOT on signin page */}
          {!isSigninPage && !isLogin && (
            <Link href={primaryButtonLink}>
              <Button variant="outline" className="" size="default">
                {primaryButtonText}
              </Button>
            </Link>
          )}
          {isLogin && (
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  localStorage.clear();
                }
                dispatch(logout(""));
                router.push("/signin");
              }}
              variant="outline"
              className=""
              size="default"
            >
              SignOut
            </Button>
          )}

          {isLogin && (
            <Link href={"/dashboard"}>
              <Button variant="default" className="" size="default">
                Dashboard
              </Button>
            </Link>
          )}

          {!isLogin && (
            <Link href={secondaryButtonLink}>
              <Button variant="default" className="" size="default">
                {secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden ml-auto cursor-pointer">
          <IoMdMenu className="text-2xl" onClick={() => setDrawerOpen(true)} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 w-[75%] sm:w-[350px] h-full bg-white z-50 shadow-lg p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-end mb-6">
                <IoMdClose
                  className="text-3xl cursor-pointer"
                  onClick={() => setDrawerOpen(false)}
                />
              </div>

              <ul className="flex flex-col space-y-6 text-lg font-medium text-[#717171]">
                <Link href="/" onClick={() => setDrawerOpen(false)}>
                  <li>Home</li>
                </Link>
                <Link href="/about" onClick={() => setDrawerOpen(false)}>
                  <li>About</li>
                </Link>
                <Link href="/faq" onClick={() => setDrawerOpen(false)}>
                  <li>FAQ</li>
                </Link>
                <Link href="/blog" onClick={() => setDrawerOpen(false)}>
                  <li>Blog</li>
                </Link>
                <Link href="/support" onClick={() => setDrawerOpen(false)}>
                  <li>Support</li>
                </Link>
              </ul>

              {/* Mobile Buttons */}
              <div className="mt-auto space-y-4">
                {/* Only show primary button if NOT on signin page */}
                {!isSigninPage && (
                  <Link
                    href={primaryButtonLink}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Button variant="outline" className="w-full" size="default">
                      {primaryButtonText}
                    </Button>
                  </Link>
                )}
                <Link
                  href={secondaryButtonLink}
                  onClick={() => setDrawerOpen(false)}
                >
                  <Button
                    variant="default"
                    className="w-full mt-3"
                    size="default"
                  >
                    {secondaryButtonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
