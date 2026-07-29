import Image from "next/image";
import React from "react";

export default function Growth() {
  return (
    <>
      <div className="py-16 max-w-7xl mx-5 lg:mx-8 xl:mx-auto">
        {/* Header */}
        <div className="mb-6 grid lg:grid-cols-2 items-start gap-6 mt-2 lg:mt-0">
          <div>
            <div>
              <ul className="text-lg md:text-xl text-[#131313] font-normal list-disc pl-5">
                <li>Growth</li>
              </ul>
            </div>
            <h2 className="text-[45px] xl:text-[50px] font-normal text-[#131313] leading-tight">
              {`Grow your practice with Emma’s help`}
            </h2>
          </div>
          <p className="text-[#4E4E4E] text-xl font-normal leading-relaxed">
            Emma connects you directly with patients actively seeking
            board-certified surgeons. By joining, you gain visibility among the
            right audience, build trust through accreditation highlights, and
            benefit from AI-driven patient-matching that ensures your expertise
            reaches those who need it most.
          </p>
        </div>

        {/* grid */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          {/* Card 1 - Doctor Image */}
          <div className="md:col-span-5 rounded-2xl overflow-hidden">
            <Image
              src="/assets/jpg/race-male-doctor.jpg"
              alt="Doctor"
              width={1000}
              height={200}
              className="w-full h-70 md:h-full object-cover rounded-2xl"
            />
          </div>

          {/* Card 2 - Purple Box with Link Icon */}
          <div className="bg-[#8A38F5] md:col-span-7 text-white rounded-2xl p-12 flex flex-col gap-4 items-start">
            <Image
              src="/assets/svg/link.svg"
              alt="Link Icon"
              width={36}
              height={36}
            />
            <p className="text-sm md:text-base font-normal leading-relaxed">
              Emma connects you with patients who are ready to move forward,
              filtering casual inquiries and answering questions instantly so
              your leads are informed and prepared for consultation.
            </p>
          </div>

          {/* Card 4 - Doctor Image */}
          <div className="md:col-span-5 rounded-2xl overflow-hidden block md:hidden">
            <Image
              src="/assets/jpg/confident-doctor-work.jpg"
              alt="Doctor"
              width={1000}
              height={200}
              className="w-full h-70 md:h-full object-cover rounded-2xl"
            />
          </div>

          {/* Card 3 - Dark Purple Box with Eye Icon */}
          <div className="bg-[#351F65] md:col-span-7 text-white rounded-2xl p-12 flex flex-col gap-4 items-start">
            <Image
              src="/assets/svg/eye.svg"
              alt="Eye Icon"
              width={40}
              height={40}
            />
            <p className="text-sm md:text-base font-normal leading-relaxed">
              Emma boosts your visibility, helping you stand out to the right
              audience. While Emma handles inquiries in the background, you can
              focus on what matters most, delivering exceptional care.
            </p>
          </div>

          {/* Card 4 - Doctor Image */}
          <div className="md:col-span-5 rounded-2xl overflow-hidden hidden md:block">
            <Image
              src="/assets/jpg/confident-doctor-work.jpg"
              alt="Doctor"
              width={1000}
              height={200}
              className="w-full h-70 md:h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
