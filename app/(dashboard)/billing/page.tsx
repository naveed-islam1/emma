"use client";
import History from "@/components/billing/history";
import PayLead from "@/components/billing/pay-lead";
import Tokens from "@/components/billing/tokens";
import withAuth from "@/components/hoc/auth-guard";
import {
  useGetAllPaymentsQuery,
  useGetUserPaymentsQuery,
} from "@/services/payment";
import { useSelector } from "react-redux";

const Billing = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { data: allpayments, refetch: refetchPayments } =
    useGetAllPaymentsQuery("");
  const { data: userpayments, refetch: refetchUserPayments } =
    useGetUserPaymentsQuery("");

  const payments =
    user?.role === "admin" ? allpayments?.data : userpayments?.data;

  return (
    <>
      <h1 className="arial font-normal text-2xl">Plans & Billing</h1>
      <p className="font-normal text-base text-[#202224] mt-3">
        Manage plan and billing history here{" "}
      </p>
      <div className="grid xl:grid-cols-2 mt-5 gap-10">
        <div className="h-[400px]">
          <PayLead
            refetchPayments={refetchPayments}
            refetchUserPayments={refetchUserPayments}
          />
        </div>
        <div>
          <Tokens />
        </div>
      </div>
      <History leads={payments} />
    </>
  );
};

export default withAuth(Billing);
