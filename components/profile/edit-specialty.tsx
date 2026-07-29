import { useUpdateProfileMutation } from "@/services/profileApi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Loader } from "lucide-react";

export default function EditSpecialty({ open, setOpen, formik }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const emphasisOptions = [
    "Weight Loss Surgery",
    "Gastric Sleeve Surgery",
    "Gallbladder Removal",
    "Hiatal Hernia",
    "Gastric bypass",
    "Adjustable Gastric Band",
    "BPD/DS",
    "Intragastric Balloon",
  ];

  const handleSubmit = () => {
    updateProfile({
      profileId: formik.values.id,
      emphasis: formik.values.emphasis,
    })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("Specialty updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update specialty");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="text-start font-normal text-lg text-[#98A2B3]">
            Emphasis
          </DialogTitle>
        </DialogHeader>

        <div className="py-5 md:py-10">
          <div className="flex flex-wrap justify-center gap-4">
            {emphasisOptions.map((option) => {
              const selected = formik.values.emphasis === option;
              return (
                <Button
                  key={option}
                  className="rounded-xl py-2.5 px-3"
                  variant={selected ? undefined : "secondary"}
                  size={undefined}
                  onClick={() => formik.setFieldValue("emphasis", option)}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="outline"
            size={undefined}
            onClick={() => setOpen(false)}
            className="py-2.5"
          >
            Cancel
          </Button>
          <Button
            className="py-2.5"
            onClick={handleSubmit}
            size={undefined}
            variant={undefined}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
