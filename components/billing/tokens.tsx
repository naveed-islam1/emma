"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Tokens() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl h-[400px]">
        <Image
          src={"/assets/jpg/blog.jpg"}
          alt=""
          width={480}
          height={160}
          className="w-full overflow-hidden rounded-t-2xl"
        />
        <div className="p-5">
          <p className="font-medium text-lg">What are tokens?</p>
          <p className="font-medium text-sm text-[#4E4E4E] mt-2">
            Tokens are your digital balance inside Emma, each always worth $1
            USD. You use them to unlock patient leads directly from WhatsApp
            when a new match is sent to you.
          </p>
          <Button
            onClick={() => setOpen(true)}
            className="py-2 px-5  block ml-auto rounded-[15px]"
            variant={undefined}
            size={undefined}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl! max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          showCloseButton={true}
        >
          <DialogHeader className={undefined}>
            <DialogTitle className="text-xl font-semibold">
              What are tokens?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p>
              Tokens are your digital balance inside Emma, each always worth $1
              USD. You use them to unlock patient leads directly from WhatsApp
              when a new match is sent to you.
            </p>

            <h3 className="font-semibold text-base mt-4">
              Here’s how it works:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                When a new lead arrives on WhatsApp, you’ll see their basic info
                (procedure, city, and interest).
              </li>
              <li>
                To access full contact info, simply unlock the lead using tokens
                or pay in USD.
              </li>
              <li>
                The number of tokens per lead varies depending on the lead’s
                quality and readiness. Higher-quality, ready-to-book patients
                require more tokens.
              </li>
            </ul>

            <h3 className="font-semibold text-base mt-4">Why use tokens:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                💰 <strong>Always discounted:</strong> Tokens are always sold
                below $1 USD each, and sometimes even more discounted during
                special promotions.
              </li>
              <li>
                🔓 <strong>Direct access:</strong> Unlock patient information
                instantly through WhatsApp.
              </li>
              <li>
                🚀 <strong>Flexible and transparent:</strong> You only use
                tokens when you choose to unlock a lead — no subscriptions or
                hidden fees.
              </li>
              <li>
                💡 <strong>Smarter investment:</strong> Higher-quality leads may
                cost more tokens, but they also bring higher conversion
                potential.
              </li>
            </ul>

            <h3 className="font-semibold text-base mt-4">Pro tip:</h3>
            <p>
              Keep tokens in your balance. That way, when new patients reach
              out, you can unlock them instantly and never miss a valuable lead.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
