"use client";
import { useGetProfileQuery } from "@/services/profileApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const { data: userData } = useGetProfileQuery({});
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "/assets/svg/icon.svg",
      path: "/dashboard",
      width: 17,
      height: 17,
    },
    {
      name: "Billing",
      icon: "/assets/svg/icon2.svg",
      path: "/billing",
      width: 14,
      height: 18,
    },
    {
      name: "Payment",
      icon: "/assets/svg/icon3.svg",
      path: "/payment",
      width: 18,
      height: 14,
    },
    // {
    //   name: "Doctors",
    //   icon: "/assets/svg/icon3.svg",
    //   path: "/doctors",
    //   width: 18,
    //   height: 14,
    // },
    {
      name: "Profile",
      icon: "/assets/svg/icon4.svg",
      path: "/profile",
      width: 18,
      height: 18,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block ">
        <Link href="/">
          <Image
            src={"/assets/svg/logo.svg"}
            alt=""
            width={100}
            height={35}
            className="mx-auto"
          />
        </Link>

        <div className="mt-10">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex gap-3 items-center cursor-pointer p-3 font-semibold text-sm rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#9F5FFE33] text-[#8A38F5]"
                          : "text-black"
                      }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                      className={`transition-all duration-200 ${
                        isActive ? "purple-filter" : ""
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        item.name === "Billing" ? "pl-1" : ""
                      }`}
                    >
                      {item.name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-4 mb-3 rounded-full border border-[#8A38F5] bg-white/80 backdrop-blur-md shadow-lg md:hidden">
        <ul className="flex items-center justify-around py-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex flex-col items-center justify-center text-xs font-medium"
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={15}
                    height={15}
                    className={`mb-1 transition-all duration-200 ${
                      isActive ? "purple-filter" : ""
                    }`}
                  />
                  <span
                    className={`${
                      isActive ? "text-[#8A38F5]" : "text-gray-600"
                    } leading-tight ${index === 2 ? "mt-1" : ""}`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
