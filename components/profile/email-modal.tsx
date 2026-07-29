"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUpdateProfileMutation } from "@/services/profileApi";
import { toast } from "sonner";

export default function EmailModal({ open, setOpen, formik }) {
  const [updateProfile] = useUpdateProfileMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    updateProfile({ profileId: formik.values.id, email })
      .unwrap()
      .then(() => {
        formik.setFieldValue("email", email);
        setOpen(false);
        toast.success("Email updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update email:", error);
      });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[370px]">
          <div className="">
            <p className="font-medium text-sm text-[#98A2B3]">Email</p>
            <Input
              type="email"
              placeholder="email@example.com"
              className={"mt-2 py-3! rounded-xl"}
              value={email || formik.values.email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-3 mt-5">
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
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
