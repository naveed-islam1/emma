"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authuser } from "@/features/authSlice";
import {
  useSignupUserMutation,
  useVerifycedulaMutation,
} from "@/services/userApi";
import { getFullName } from "@/utils/getFullName";
import useScrapDoctorStore from "@/zustand/scrapDoctorText";
import { ErrorMessage, useFormikContext } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
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

export default function StepFive({ setStep, total = 5 }: Props) {
  const [verifyCedula, { isLoading }] = useVerifycedulaMutation();
  const { searchText, values: signUpValues } = useScrapDoctorStore();
  const dispatch = useDispatch();
  const [SignupUser, { isLoading: signupLoading }] = useSignupUserMutation();

  const { values, setFieldValue, validateForm } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();
    if (errors.cedula) return;

    try {
      const verifyRes = await verifyCedula({
        cedula: values.cedula,
        speciality: values.specialty,
        searchText: searchText,
        nombre: signUpValues.firstName,
        paterno: signUpValues.paternalLastName,
        materno: signUpValues.maternalLastName,
      }).unwrap();

      toast.success(verifyRes.message);

      const fullName = getFullName(signUpValues);

      const signupRes = await SignupUser({
        email: signUpValues.email,
        password: signUpValues.password,
        name: fullName,
        first_name: signUpValues.firstName,
        middle_name: signUpValues.middle_name || null,
        paternal_last_name: signUpValues.paternalLastName,
        maternal_last_name: signUpValues.maternalLastName,
        status: "inactive",
      }).unwrap();

      dispatch(authuser(signupRes?.user));
      localStorage.setItem("user", JSON.stringify(signupRes?.user));
      localStorage.setItem("token", signupRes?.access_token);

      setStep((prev) => (prev + 1) % total);
    } catch (err) {
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
          {isLoading || signupLoading ? "Verifying..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
