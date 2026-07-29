import React from "react";
import { Button } from "../ui/button";
import dayjs from "dayjs";

export default function History({ leads }) {
  return (
    <>
      <h1 className="arial font-normal text-2xl mt-14">Billing History</h1>

      {/*  Desktop View */}
      <div className="hidden md:block bg-white rounded-2xl p-4 mt-5">
        {/* Header */}
        <div className="flex justify-between px-3">
          <p className="font-normal text-sm lg:text-base text-[#4E4E4E] w-[150px] lg:w-[250px] xl:w-[300px]">
            Transaction
          </p>
          <p className="font-normal text-sm lg:text-base text-[#4E4E4E] w-[200px]">
            Date
          </p>
          <p className="font-normal text-sm lg:text-base text-[#4E4E4E] w-20">
            Status
          </p>
          <p className="font-normal text-sm lg:text-base text-[#4E4E4E] w-[100px]">
            Amount
          </p>
        </div>

        {/* Rows */}
        <div>
          {leads?.map((lead, index) => (
            <div
              key={index}
              className="flex justify-between bg-[#F2F4F7] rounded-xl py-2 px-3 mt-5 items-center"
            >
              <p className="font-normal text-sm lg:text-base text-black w-[150px] lg:w-[250px] xl:w-[300px]">
                {lead.name || "N/A"}
              </p>
              <p className="font-normal text-sm lg:text-base text-black w-[200px]">
                {dayjs(lead.created_at).format("MMM D, YYYY") || "N/A"}
              </p>
              <div className="w-20">
                <Button
                  className={`${
                    lead.status === "Paid" ? "bg-[#9F5FFE33]" : "bg-[#FFD70033]"
                  } font-normal text-sm lg:text-base text-black py-1.5 px-3 rounded-[10px]`}
                  variant={undefined}
                  size={undefined}
                >
                  {lead.status}
                </Button>
              </div>
              <p className="font-normal text-sm lg:text-base text-black w-[100px] text-left">
                {lead.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  Mobile View */}
      <div className="block md:hidden bg-white rounded-2xl p-4 mt-5">
        <div className="space-y-3">
          {leads?.map((lead, index) => (
            <div
              key={index}
              className="bg-[#F2F4F7] rounded-xl py-3 px-4 mt-2 flex flex-col space-y-1"
            >
              <div className="flex justify-between">
                <p className="font-semibold text-black">Transaction:</p>
                <p className="font-normal text-sm text-black">{lead.name}</p>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-black">Date:</p>
                <p className="font-normal text-sm text-black">{lead.date}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold text-black">Status:</p>
                <Button
                  className={`${
                    lead.status === "Paid" ? "bg-[#9F5FFE33]" : "bg-[#FFD70033]"
                  } font-normal text-sm text-black py-1 px-3 rounded-[10px]`}
                  variant={undefined}
                  size={undefined}
                >
                  {lead.status}
                </Button>
              </div>

              <div className="flex justify-between">
                <p className="font-semibold text-black">Amount:</p>
                <p className="font-normal text-sm text-black">{lead.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
