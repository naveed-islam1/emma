"use client";

import { useUpdateProfileMutation } from "@/services/profileApi";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";

export default function IdealPatientDescription({ open, setOpen, formik }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    updateProfile({
      profileId: formik.values.id,
      bio: description,
    })
      .unwrap()
      .then(() => {
        formik.setFieldValue("description", description);
        setOpen(false);
        toast.success("Description updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update description:", error);
      });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[700px]">
          <div className="">
            <p className="font-medium text-sm text-[#98A2B3]">
              Tell us about yourself
            </p>
            <div className="mt-5">
              <Textarea
                className={"border-[#A6A6A6]! "}
                placeholder="Type your message here."
                value={description || formik.values.bio}
                onChange={(e) => setDescription(e.target.value)}
                name="bio"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className={"py-2.5"}
              size={undefined}
            >
              Cancel
            </Button>
            <Button
              className={"py-2.5"}
              onClick={() => {
                handleSubmit();
              }}
              variant={undefined}
              size={undefined}
            >
              {isLoading ? <Loader className="animate-spin" /> : "Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
