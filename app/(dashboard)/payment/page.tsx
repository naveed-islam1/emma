"use client";
import AddCardModal from "@/components/add-card";
import withAuth from "@/components/hoc/auth-guard";
import Delete from "@/components/profile/delete";
import {
  useDeleteUserCardMutation,
  useGetUserCardsQuery,
} from "@/services/profileApi";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const Payment = () => {
  const { data } = useGetUserCardsQuery("");
  const [deleteCard, { isLoading: isDeleting }] = useDeleteUserCardMutation();
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [del, setDel] = useState(false);

  const handleDelete = (cardId: string) => {
    deleteCard(cardId)
      .unwrap()
      .then(() => {
        toast.success("Card deleted successfully!");
        setShowDelete(null);
      })
      .catch((err) => {
        toast.error("Failed to delete card: " + err.data);
      });
  };

  return (
    <>
      <div className="h-screen">
        <h1 className="arial font-normal text-2xl">Payment Method</h1>
        <div className="mt-5 md:w-[450px]">
          <AddCardModal />

          {/* Card Section */}
          <div className="flex gap-3">
            {data?.data.length > 0 ? (
              data?.data.map((card: any) => (
                <div className="bg-white rounded-2xl px-8 py-5 flex justify-between items-center mt-5 relative">
                  <div className="flex gap-10 items-center">
                    <Image
                      src={"/assets/png/visa.png"}
                      alt=""
                      width={54}
                      height={28}
                    />
                    <div>
                      <p className="arial font-normal text-sm text-black min-w-[200px]">
                        {card?.brand} ending in {card?.exp_year}
                      </p>
                      <p className="arial font-normal text-xs text-[#4E4E4E]">
                        Exp. date {card?.exp_month}/
                        {card?.exp_year?.toString().slice(-2)}
                      </p>
                    </div>
                  </div>

                  {/* Option Icon */}
                  <Image
                    src={"/assets/svg/option.svg"}
                    alt="Options"
                    width={5}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setShowDelete(showDelete === card.id ? null : card.id);
                    }}
                  />

                  {/* Delete dropdown */}
                  {showDelete === card.id && (
                    <div
                      className="absolute right-5 top-[60px] bg-white rounded-2xl p-3 w-[120px] flex items-center gap-2 shadow-md cursor-pointer z-10"
                      onClick={() =>
                        handleDelete(card.stripe_payment_method_id)
                      }
                    >
                      <Image
                        src={"/assets/svg/del.svg"}
                        alt=""
                        width={18}
                        height={18}
                      />
                      <p className="font-normal text-sm text-[#F52F2F]">
                        {isDeleting ? "Deleting..." : "Delete"}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                No payment methods available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Delete open={del} setOpen={setDel} />
    </>
  );
};

export default withAuth(Payment);
