"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifycedulaMutation } from "@/services/userApi";
import { getFullName } from "@/utils/getFullName";
import useScrapDoctorStore from "@/zustand/scrapDoctorText";
import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type FormValues = {
  cedula: string;
  specialty: string;
};

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
  handleNext: () => void;
};

export default function StepFive({
  setStep,
  total = 5,
  handleNext: goToVerification,
}: Props) {
  const [verifyCedula, { isLoading }] = useVerifycedulaMutation();
  const { searchText, values: signUpValues } = useScrapDoctorStore();
  const user = useSelector((state: any) => state.auth.user);

  const { values, setFieldValue, validateForm } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();
    if (errors.cedula) return;

    try {
      const nombre =
        signUpValues?.firstName ||
        user?.first_name ||
        user?.user_metadata?.first_name ||
        "";
      const paterno =
        signUpValues?.paternalLastName ||
        user?.paternal_last_name ||
        user?.user_metadata?.paternal_last_name ||
        "";
      const materno =
        signUpValues?.maternalLastName ||
        user?.maternal_last_name ||
        user?.user_metadata?.maternal_last_name ||
        "";

      const verifyRes = await verifyCedula({
        cedula: values.cedula,
        speciality: values.specialty,
        searchText:
          searchText ||
          getFullName({
            firstName: nombre,
            paternalLastName: paterno,
            maternalLastName: materno,
          }),
        nombre,
        paterno,
        materno,
      }).unwrap();

      toast.success(verifyRes.message);
      goToVerification();
    } catch (err: any) {
      console.log("ERROR:", err);

      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="space-y-6 relative h-[60vh]">
      {/* Step Title */}
      <h2 className="text-3xl font-normal text-black">Professional ID</h2>
      <p className="text-[#4E4E4E] text-base">
        Please provide your professional license number (Cédula Profesional) for
        verification purposes.
      </p>

      {/* Input */}
      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Professional ID"
          value={values.cedula}
          onChange={(e) => setFieldValue("cedula", e.target.value)}
          className="w-full py-2! rounded-xl md:py-full"
        />
        <ErrorMessage
          name="cedula"
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
          size={undefined}
          variant={undefined}
          onClick={handleNext}
          className="px-8 py-3 rounded-xl"
        >
          {isLoading ? "Verifying..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
