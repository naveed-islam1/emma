import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function Delete({ open, setOpen }) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[370px]">
          <DialogHeader className={undefined}>
            <DialogTitle className={"font-normal text-lg text-[#4E4E4E]"}>
              Confirmation
            </DialogTitle>
            <DialogDescription
              className={"font-normal text-sm text-black mt-5"}
            >
              Are you sure you want to delete this card?
            </DialogDescription>
          </DialogHeader>

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
                setOpen(false);
              }}
              variant={undefined}
              size={undefined}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
