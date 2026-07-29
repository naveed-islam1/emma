"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { paymentApi } from "@/services/payment";
import {
  useBuyTokensMutation,
  useGetUserCardsQuery,
} from "@/services/profileApi";
import { Check, CreditCard } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

interface TokenOption {
  tokens: number;
  value: number;
  price: number;
  savings: number;
}

export function TokenPurchaseModal({
  tokens,
  discountedUsd,
  refetchUserPayments,
  refetchPayments,
}) {
  const [buyTokens, { isLoading }] = useBuyTokensMutation();
  const { data: cards } = useGetUserCardsQuery("");
  const [open, setOpen] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<any>("");

  React.useEffect(() => {
    if (cards?.data) {
      setPaymentMethod(cards?.data[0]);
    }
  }, [tokens]);

  const handleBuyTokens = () => {
    buyTokens({
      tokens: tokens,
      amount: discountedUsd,
      paymentMethodId: paymentMethod.stripe_payment_method_id,
      customer_id: paymentMethod.customer_id,
    })
      .unwrap()
      .then((response) => {
        refetchUserPayments();
        refetchPayments();
        setOpen(false);
        toast.success("Tokens purchased successfully!");
      })
      .catch((error) => {
        toast.error("Failed to purchase tokens. Please try again.");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="py-2 px-5 mt-12 block ml-auto rounded-[15px]"
          variant={undefined}
          size={undefined}
          onClick={() => setOpen(true)}
        >
          Purchase {tokens || 0} Tokens for ${discountedUsd} dlls
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-xl p-0 overflow-hidden rounded-[2rem] overflow-y-auto"
        showCloseButton={true}
      >
        <div className="p-8">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 mb-6">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Pay per lead
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-1 mb-10">
            <p className="text-muted-foreground">
              Price per token : USD ${(discountedUsd / tokens)?.toFixed(2)}
            </p>
            <p className="text-muted-foreground">
              You save {Math.round((1 - discountedUsd / tokens) * 100)}% every
              time
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {cards?.data?.length > 0 ? (
              cards?.data?.map((card: any) => (
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Select Payment Method
                  </h3>
                  <label
                    htmlFor="visa"
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer",
                      paymentMethod?.stripe_payment_method_id ===
                        card.stripe_payment_method_id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted",
                    )}
                    key={card.id}
                    onClick={() => setPaymentMethod(card)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <CreditCard className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {card?.brand} ending in {card?.exp_year}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires {card?.exp_month}/
                          {card?.exp_year?.toString().slice(-2)}
                        </p>
                      </div>
                    </div>
                    {paymentMethod?.stripe_payment_method_id ===
                      card?.stripe_payment_method_id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </label>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-2">
                <h1>No payment method found. Please add one</h1>
                <Link
                  href={"/payment"}
                  className="bg-[#8A38F5] px-3 py-2 rounded-md text-white w-max"
                >
                  Add Payment Method
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              size={undefined}
              variant={undefined}
              onClick={handleBuyTokens}
              className="w-full sm:w-auto px-4 py-2 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              {isLoading
                ? "Purchasing..."
                : `Purchase ${tokens} Tokens for $
              ${discountedUsd} dlls`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
