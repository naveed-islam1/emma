"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { TokenPurchaseModal } from "../add-card/buy-tokens";

export default function PayLead({ refetchPayments, refetchUserPayments }) {
  const [tokens, setTokens] = useState(15);
  const [usd, setUsd] = useState(15);

  const discountedUsd = (usd * 0.9).toFixed(2);
  const savings = (usd * 0.1).toFixed(2);

  const handleTokenChange = (e) => {
    const value = Number(e.target.value);
    setTokens(value);
    if (!isNaN(value)) setUsd(value);
  };

  const handleUsdChange = (e) => {
    const value = Number(e.target.value.replace("$", ""));
    if (!isNaN(value)) setUsd(value);
  };

  return (
    <div className="bg-white rounded-2xl p-4 h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Pay per lead</h2>
        <Image
          src={"/assets/svg/info.svg"}
          alt=""
          width={18}
          height={18}
          className="cursor-pointer"
        />
      </div>

      <div className="mt-4 md:flex gap-4 justify-between items-center">
        <div className="rounded-[5px] bg-[#9F5FFE33] p-5 w-full text-center">
          <p className="font-normal text-xs text-[#202224]">Tokens</p>
          <input
            type="number"
            value={tokens}
            onChange={handleTokenChange}
            className="font-medium text-4xl w-full outline-none mx-auto block mt-1 text-center bg-transparent"
          />
          <p className="font-normal text-[10px] text-[#202224] mt-2">Value:</p>
          <input
            type="text"
            value={`$${usd}`}
            onChange={handleUsdChange}
            className="font-medium text-2xl w-full outline-none mx-auto block mt-1 text-center bg-transparent"
          />
        </div>

        <Image
          src={"/assets/svg/swap.svg"}
          alt=""
          width={24}
          height={24}
          className="mx-auto py-5 md:my-0"
        />

        <div className="rounded-[5px] bg-[#9F5FFE33] p-5 w-full text-center">
          <p className="font-normal text-xs text-[#202224]">Your Price</p>
          <input
            type="text"
            value={`$${discountedUsd}`}
            readOnly
            className="font-medium text-4xl w-full outline-none mx-auto block mt-1 text-center bg-transparent"
          />
          <p className="font-semibold text-xs text-green-500 mt-2 pb-8">
            (Save ${savings})
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div>
        <div className="mt-5">
          <p className="font-normal text-sm text-[#4E4E4E]">
            Price per token : <span>USD $0.90</span>
          </p>
        </div>

        <div className="mt-2">
          <p className="font-normal text-sm text-[#4E4E4E]">
            You save 10% every time
          </p>
        </div>

        <TokenPurchaseModal
          refetchUserPayments={refetchUserPayments}
          refetchPayments={refetchPayments}
          tokens={tokens}
          discountedUsd={discountedUsd}
        />
      </div>
    </div>
  );
}
