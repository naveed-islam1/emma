"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";

export default function EditType({ open, setOpen, formik }) {
  const [resultType, setResultType] = useState("");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = () => {
    updateProfile({
      profileId: formik.values.id,
      result_type: resultType,
    })
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("Profile updated successfully");
        formik.setFieldValue("result_type", resultType);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  useEffect(() => {
    setResultType(formik.values.result_type);
  }, [formik.values.result_type]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="text-start font-normal text-lg text-[#98A2B3]">
            Result Type Preferences
          </DialogTitle>
        </DialogHeader>

        <div>
          <div>
            <Textarea
              className={"border-[#A6A6A6]! "}
              placeholder="Type your message here."
              value={resultType}
              onChange={(e) => setResultType(e.target.value)}
              name="result_type"
            />
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
