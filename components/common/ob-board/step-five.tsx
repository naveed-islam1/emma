/**
 * STEP 5 — Professional ID (Cédula verification)
 *
 * STATUS: Temporarily skipped in signup/onboarding flow.
 * Current flow: Specialty (step 4) → Verification (step 5) — no cedula step.
 *
 * TO RE-ENABLE STEP 5, edit app/on-boarding/page.tsx:
 * 1. Uncomment: import StepFive from "@/components/common/ob-board/step-five"
 * 2. Change totalSteps from 5 back to 6
 * 3. Uncomment handleNextFromStepFive
 * 4. Uncomment loading state + loading overlay JSX
 * 5. Uncomment the "Professional ID" entry in the steps array
 * 6. Change cedula validation back to: Yup.string().required("Professional ID is required")
 *
 * This file stays active — no changes needed here when re-enabling.
 */

"use client";

// --- Imports: cedula API, name helpers, Supabase session, form state ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifycedulaMutation } from "@/services/userApi";
import { getFullName, getNamePartsFromUser } from "@/utils/getFullName";
import { createClient } from "@/utils/supabaseClient";
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
  // Called after successful cedula verify — parent shows loading then goes to Verification
  handleNext: () => void;
};

export default function StepFive({
  setStep,
  total = 5,
  handleNext: goToVerification,
}: Props) {
  // RTK mutation → POST https://backend.emmamatch.com/cedula/verify
  const [verifyCedula, { isLoading }] = useVerifycedulaMutation();
  const user = useSelector((state: any) => state.auth.user);

  const { values, setFieldValue, validateForm } =
    useFormikContext<FormValues>();

  const handleNext = async () => {
    const errors = await validateForm();
    if (errors.cedula) return;

    try {
      // Names from Supabase session (survives page refresh; not Zustand)
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const sessionUser = data?.user;

      const { nombre, paterno, materno } = getNamePartsFromUser(
        sessionUser || user,
      );

      if (!nombre || !paterno || !materno) {
        toast.error(
          "Name details not found on this account. Please sign in again.",
        );
        return;
      }

      // Cedula verify API call
      const verifyRes = await verifyCedula({
        cedula: values.cedula,
        speciality: values.specialty,
        searchText: getFullName({
          firstName: nombre,
          paternalLastName: paterno,
          maternalLastName: materno,
        }),
        nombre,
        paterno,
        materno,
      }).unwrap();

      toast.success(verifyRes.message);
      // Parent on-boarding page runs loading overlay then setStep to Verification
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
      <h2 className="text-3xl font-normal text-black">Professional ID</h2>
      <p className="text-[#4E4E4E] text-base">
        Please provide your professional license number (Cédula Profesional) for
        verification purposes.
      </p>

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
