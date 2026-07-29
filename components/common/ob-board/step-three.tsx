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
import { Button } from "@/components/ui/button";
import { ErrorMessage, useFormikContext } from "formik";

const countries = [{ code: "MX", name: "Mexico" }];

type FormValues = {
  country_code: string;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

export default function StepThree({ setStep, total }: Props) {
  const { values, setFieldValue, validateForm, setTouched } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();

    setTouched({ country_code: true });

    if (errors.country_code) return;

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="space-y-6 relative h-[60vh]">
      <div>
        <h2 className="text-3xl font-normal text-black">Country</h2>
        <p className="text-[#4E4E4E] text-base mt-2">
          Select the country where you provide your medical services.
        </p>
        <p className="text-[#4E4E4E] text-xs mt-1">
          (Emma is currently available exclusively for doctors practicing in
          Mexico)
        </p>
      </div>

      {/* Country Select */}
      <div className="max-w-md">
        <Select
          value={values.country_code}
          onValueChange={(value) => setFieldValue("country_code", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose your country" />
          </SelectTrigger>

          <SelectContent className="max-h-[200px] overflow-y-auto">
            <SelectGroup>
              {countries.map((c) => (
                <SelectItem
                  key={c.code}
                  value={c.code}
                  disabled={c.code !== "MX"}
                  className={
                    c.code !== "MX" ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ErrorMessage
          name="country"
          component="p"
          className="text-red-500 text-xs mt-1"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between absolute bottom-0 w-full">
        <Button
          variant="outline"
          type="button"
          size={undefined}
          onClick={handleBack}
          className="px-8 py-3 rounded-xl"
        >
          Back
        </Button>

        <Button
          type="button"
          size={undefined}
          variant={undefined}
          onClick={handleNext}
          className="px-8 py-3 rounded-xl"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
