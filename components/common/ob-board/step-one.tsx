"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, useFormikContext } from "formik";

const countries = [
  { code: "US", dial: "+1" },
  { code: "CA", dial: "+1" },
  { code: "MX", dial: "+52" },
  { code: "GB", dial: "+44" },
  { code: "IN", dial: "+91" },
  { code: "AU", dial: "+61" },
  { code: "DE", dial: "+49" },
  { code: "FR", dial: "+33" },
  { code: "IT", dial: "+39" },
  { code: "ES", dial: "+34" },
  { code: "BR", dial: "+55" },
  { code: "CN", dial: "+86" },
  { code: "JP", dial: "+81" },
  { code: "PK", dial: "+92" },
  { code: "SA", dial: "+966" },
  { code: "AE", dial: "+971" },
  { code: "ZA", dial: "+27" },
  { code: "TR", dial: "+90" },
  { code: "SG", dial: "+65" },
  { code: "BD", dial: "+880" },
  { code: "ID", dial: "+62" },
  { code: "MY", dial: "+60" },
  { code: "TH", dial: "+66" },
  { code: "PH", dial: "+63" },
  { code: "VN", dial: "+84" },
  { code: "NG", dial: "+234" },
  { code: "EG", dial: "+20" },
  { code: "AR", dial: "+54" },
  { code: "NZ", dial: "+64" },
  { code: "KR", dial: "+82" },
];

type FormValues = {
  countryDial: string;
  phone: string;
  whatsapp: string;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
};

export default function StepOne({ setStep, total = 2 }: Props) {
  const { values, setFieldValue, validateForm, setTouched, errors } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();
    setTouched({
      countryDial: true,
      phone: true,
    });

    if (errors.countryDial || errors.phone) return;

    const fullNumber = `${values.countryDial} ${values.phone}`.trim();
    setFieldValue("whatsapp", fullNumber);

    setStep((prev) => (prev + 1) % total);
  };

  return (
    <div className="space-y-6 relative h-[60vh]">
      <h2 className="text-3xl font-normal text-black">WhatsApp Number</h2>

      <p className="text-[#4E4E4E] text-base">
        Please provide your WhatsApp number so Emma can connect you with
        patients in real time.
      </p>

      <div className="flex gap-3 items-start">
        {/* Country Dial Code */}
        <div className="flex flex-col w-40">
          <Select
            value={values.countryDial}
            onValueChange={(dial) => setFieldValue("countryDial", dial)}
          >
            <SelectTrigger className="w-40">
              {" "}
              <SelectValue placeholder="Country" />
            </SelectTrigger>

            <SelectContent className="max-h-64 overflow-y-auto">
              <SelectGroup>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.dial}>
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                        alt=""
                        width={20}
                        height={15}
                        className="rounded-sm"
                      />
                      <span>{country.dial}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <ErrorMessage
            name="countryDial"
            component="p"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        {/* Phone Input */}
        <div className="flex-1">
          <Input
            type="tel"
            inputMode="tel"
            placeholder="3012345678"
            value={values.phone}
            onChange={(e) => setFieldValue("phone", e.target.value)}
            className="w-full py-2! rounded-xl md:py-full"
          />

          <ErrorMessage
            name="phone"
            component="p"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end absolute bottom-0 right-0">
        <Button
          type="button"
          variant={undefined}
          size={undefined}
          className="py-3 px-8 rounded-xl"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
