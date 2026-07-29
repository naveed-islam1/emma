"use client";

import React, { useEffect } from "react";
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

const cityOptions: Record<string, string[]> = {
  MX: ["Mexico City", "Guadalajara", "Monterrey", "Cancún", "Tijuana"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  UK: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  IN: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
  PK: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
  FR: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  DE: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
  JP: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Fukuoka"],
  CN: ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Chengdu"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  IT: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
  RU: ["Moscow", "Saint Petersburg", "Kazan", "Novosibirsk", "Sochi"],
  KR: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
  AR: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
  NG: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
};

type FormValues = {
  country_code: string;
  city: string;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

export default function StepTwo({ setStep, total }: Props) {
  const { values, setFieldValue, validateForm, setTouched } =
    useFormikContext<FormValues>();

  const cities = cityOptions[values.country_code] || [];

  // // Reset city when country changes
  // useEffect(() => {
  //   setFieldValue("city", "");
  // }, [values.country, setFieldValue]);

  const handleNext = async () => {
    const errors = await validateForm();

    setTouched({ city: true });

    if (errors.city) return;

    setStep((prev) => (prev + 1) % total);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="space-y-6 relative h-[60vh]">
      <h2 className="text-3xl font-normal text-black">City</h2>

      <p className="text-[#4E4E4E] text-base">
        Enter the main city where you provide your medical services.
      </p>

      {/* City Select */}
      <div className="max-w-md">
        <Select
          value={values.city}
          onValueChange={(value) => setFieldValue("city", value)}
          disabled={!values.country_code}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                values.country_code
                  ? "Choose your city"
                  : "Select country first"
              }
            />
          </SelectTrigger>

          <SelectContent className="max-h-[200px] overflow-y-auto">
            <SelectGroup>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No cities available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ErrorMessage
          name="city"
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
