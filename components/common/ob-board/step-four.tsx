"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage, useFormikContext } from "formik";
import React from "react";

type FormValues = {
  specialty: string;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
};

const surgeries = ["Plastic Surgery", "Bariatric Surgery"];

export default function StepFour({ setStep, total = 4 }: Props) {
  const { values, setFieldValue, validateForm, setTouched } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();

    setTouched({ specialty: true });

    if (errors.specialty) return;

    setStep((prev) => (prev + 1) % total);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="space-y-6 relative h-[60vh]">
      {/* Step Title */}
      <h2 className="text-3xl font-normal text-black">Specialty</h2>

      <p className="text-[#4E4E4E] text-base">
        Indicate your medical specialty (e.g., Plastic Surgery, Bariatric
        Surgery).
      </p>

      {/* Specialty Select */}
      {/* <div className="max-w-md">
        <Input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={values.specialty}
          onChange={(e) => setFieldValue("specialty", e.target.value)}
          className="py-2!"
        />

        <ErrorMessage
          name="specialty"
          component="p"
          className="text-red-500 text-xs mt-1"
        />
      </div> */}

      <div className="max-w-md">
        <Select
          value={values.specialty}
          onValueChange={(value) => setFieldValue("specialty", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Select your specialty"} />
          </SelectTrigger>

          <SelectContent className="max-h-[200px] overflow-y-auto">
            <SelectGroup>
              {surgeries.map((sur) => (
                <SelectItem key={sur} value={sur}>
                  {sur}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ErrorMessage
          name="city"
          component="p"
          className="text-red-500 text-xs mt-1"
        />
      </div>

      {/* Navigation Buttons */}
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
          variant={undefined}
          size={undefined}
          onClick={handleNext}
          className="px-8 py-3 rounded-xl"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
