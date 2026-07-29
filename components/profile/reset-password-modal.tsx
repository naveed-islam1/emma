"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useResetPasswordMutation } from "@/services/profileApi";

export default function ResetPasswordModal() {
  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    resetPassword({ oldPassword, newPassword })
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setIsOpen(false);
      })
      .catch((error) => {
        toast.error(`Failed to update password: ${error.data}`);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="py-2 mt-5"
          size={undefined}
          onClick={() => setIsOpen(true)}
        >
          Reset Password
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[420px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-normal text-[#98A2B3]">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-[#202224]">Old Password</p>
            <Input
              type="password"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#202224]">New Password</p>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            size={undefined}
            className="px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            size={undefined}
            variant={undefined}
            className="px-4 py-2"
          >
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
