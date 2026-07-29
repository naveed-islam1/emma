import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Mission() {
  return (
    <>
      <div className="max-w-7xl mx-5 lg:mx-8 xl:mx-auto py-10 lg:py-16 ">
        <ul className="text-lg md:text-xl text-[#131313] font-normal list-disc pl-5 mb-2">
          <li>Mission</li>
        </ul>
        <h1 className="arial max-w-4xl font-normal text-[30px] md:text-[45px] xl:text-[60px] mb-5 md:mb-10 leading-tight">
          Making surgery abroad safer, smarter, and more complete
        </h1>

        {/* grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  ">
          <div className="font-normal text-xl">
            <p className="mb-3">
              Our mission is to transform medical tourism by giving patients:
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                {` Confidence – Knowing they’re guided to the right surgeon for
                their unique goals.`}
              </li>
              <li>
                {`Affordability – Access to top-tier care at a fraction of U.S.
                prices.`}
              </li>
              <li>
                {`Experience – All-inclusive packages that cover more than just
                surgery, from recovery houses to post-op care.`}
              </li>
            </ul>

            <p className="my-6 md:my-12">
              {`Emma isn’t just about saving money, it’s about getting the
              complete experience you deserve.`}
            </p>
            <Link
              href={"https://www.chatbase.co/CxhlAExpUPBoBhFZgoC-H/help"}
              target="_blank"
            >
              <Button
                variant="default"
                className="mx-auto lg:mx-0  block w-fit py-3 px-8"
                size={undefined}
              >
                Chat with Emma
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src="/assets/jpg/young-japanese-women.jpg"
              alt="Surgery abroad"
              width={1200}
              height={250}
              className="object-cover w-full h-[450px] rounded-3xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
