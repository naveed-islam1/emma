import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function StepSix({ setStep, total = 6, isLoading }) {
  const handleBack = (e) => {
    e.preventDefault();
    setStep((prev) => (prev - 1 + total) % total);
  };

  return (
    <>
      <div className="space-y-6 relative h-[60vh]">
        {/* Step Title */}
        <h2 className="text-3xl font-normal text-black">
          Verify Your Identity
        </h2>
        <p className="text-[#4E4E4E] font-normal text-base">
          To keep our network safe and trusted, we need to verify your identity
          before activating your account.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-25 absolute bottom-0 w-full">
          <Button
            variant="outline"
            type="button"
            onClick={handleBack}
            className="px-8 py-3 rounded-xl"
            size={undefined}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="px-8 py-3 rounded-xl"
            variant={undefined}
            size={undefined}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Start Verification"}
          </Button>
        </div>
      </div>
    </>
  );
}
