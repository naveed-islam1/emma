"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreatePaymentMethodMutation } from "@/services/profileApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddCardModal = () => {
  const [createCard] = useCreatePaymentMethodMutation();
  const stripe = useStripe();
  const elements = useElements();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveCard = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    createCard({ paymentMethodId: paymentMethod!.id })
      .unwrap()
      .then(() => {
        toast.success("Card added successfully!");
      })
      .catch((err) => {
        toast.error("Failed to add card: " + err.data);
      });

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="shadow-lg bg-blue-700 text-white flex items-center p-3 rounded-md">
          <CreditCard className="mr-2 size-4" />
          Add Payment Method
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CreditCard className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Add New Card
          </DialogTitle>
          <DialogDescription className="text-center">
            Securely add your payment method. Your information is encrypted and
            protected.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <div className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "hsl(var(--foreground))",
                    fontFamily: "var(--font-sans)",
                    "::placeholder": {
                      color: "hsl(var(--muted-foreground))",
                    },
                  },
                  invalid: {
                    color: "hsl(var(--destructive))",
                  },
                },
              }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            We use industry-standard encryption to protect your card details.
          </p>
        </div>

        <div className="flex justify-end gap-5">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="border px-3 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveCard}
            disabled={!stripe || loading}
            className=" px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Card"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
