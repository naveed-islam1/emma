"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";

interface UnlockLeadModalProps {
  onConfirm: (leadId: string) => void;
  requiredTokens: number;
  lead: any;
  isLoading: boolean;
}

export function UnlockLeadModal({
  onConfirm,
  requiredTokens,
  lead,
  isLoading,
}: UnlockLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div>
        {lead?.unlock_status ? (
          <FaUnlock color="#49d991" size={15} />
        ) : (
          <FaLock
            color="#ff9871"
            size={15}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          />
        )}
      </div>

      <DialogContent className={""}>
        <DialogHeader className={""}>
          <DialogTitle className={"font-bold text-2xl"}>
            Unlock Lead
          </DialogTitle>

          <DialogDescription className="text-sm text-[#333] font-medium">
            This lead requires{" "}
            <span className="font-bold text-foreground">{requiredTokens}</span>{" "}
            to unlock.
            <br />
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-transparent text-black border px-3 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(lead?.lead_id)}
            className="bg-primary text-white px-3 py-2 rounded-md cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Unlock Lead"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
