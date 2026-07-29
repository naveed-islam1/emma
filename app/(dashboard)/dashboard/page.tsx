"use client";
import { Button } from "@/components/ui/button";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import LeadCountry from "@/components/dashboard/lead-country";
import List from "@/components/dashboard/list";
import TopProcedures from "@/components/dashboard/top-procedures";
import withAuth from "@/components/hoc/auth-guard";
import {
  useGetDoctorLeadsStatsQuery,
  useGetProcedureStatsQuery,
} from "@/services/dashboardApis";
import { useGetProfileQuery } from "@/services/profileApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/services/userApi";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { createClient } from "@/utils/supabaseClient";

const data = [
  {
    id: "00001",
    price: "5 tokens",
    iconBg: "#FFDDD1",
    icon: <FaLock color="#ff9871" size={15} />,
    buttonText: "New",
    buttonColor: "#FFA756",
    buttonBg: "#ffeddd",
  },
  {
    id: "00002",
    price: "5 tokens",
    iconBg: "#FFDDD1",
    icon: <FaLock color="#ff9871" size={15} />,
    buttonText: "New",
    buttonColor: "#FFA756",
    buttonBg: "#ffeddd",
  },
  {
    id: "00003",
    price: "5 tokens",
    iconBg: "#D9F7E7",
    icon: <FaUnlock color="#49d991" size={15} />,
    buttonText: "Scheduled",
    buttonColor: "#6226EF",
    buttonBg: "#e0d4fc",
  },
  {
    id: "00004",
    price: "USD $5",
    iconBg: "#D9F7E7",
    icon: <FaUnlock color="#49d991" size={15} />,
    buttonText: "Contacted",
    buttonColor: "#BA29FF",
    buttonBg: "#f1d4ff",
  },
  {
    id: "00005",
    price: "USD $5",
    iconBg: "#D9F7E7",
    icon: <FaUnlock color="#49d991" size={15} />,
    buttonText: "Completed",
    buttonColor: "#00B69B",
    buttonBg: "#ccf0eb",
  },
  {
    id: "00006",
    price: "USD $5",
    iconBg: "#D9F7E7",
    icon: <FaUnlock color="#49d991" size={15} />,
    buttonText: "Closed",
    buttonColor: "#EF3826",
    buttonBg: "#fcd7d4",
  },
];

const Dashboard = () => {
  const [userMeta, setUserMeta] = useState<any>(null);
  const router = useRouter();
  const { data: user } = useGetProfileQuery({});
  const { data: doctorStatsData } = useGetDoctorLeadsStatsQuery(
    { doctorId: user?.user_id },
    { skip: !user?.user_id },
  );
  const { data: procedureStats } = useGetProcedureStatsQuery(
    { doctorId: user?.user_id },
    { skip: !user?.user_id },
  );

  const doctorStats = doctorStatsData?.data;

  const percentage =
    doctorStats?.last_month_leads > 0
      ? ((doctorStats?.current_month_leads - doctorStats?.last_month_leads) /
          doctorStats?.last_month_leads) *
        100
      : 0;

  const isPositive = percentage >= 0;

  useEffect(() => {
    const loadUserMeta = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      setUserMeta(user?.data?.user?.user_metadata);
    };
    loadUserMeta();
  }, [user]);

  return (
    <>
      <h1 className="arial font-normal text-2xl">
        Welcome back, Dr.{" "}
        {`${userMeta?.maternal_last_name || ""} ${userMeta?.paternal_last_name || ""}`}
      </h1>

      <div className="grid xl:grid-cols-2 mt-5 gap-10">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 ">
            <div className="bg-[#8A38F5] rounded-2xl p-4 text-white relative">
              <h2 className="font-medium text-lg">Leads this month</h2>
              <h2 className="font-bold text-center text-5xl py-10">
                {doctorStats?.current_month_leads}
              </h2>
              <div className="flex items-center gap-2 justify-start absolute bottom-4 left-4 right-4">
                {isPositive ? (
                  <FaArrowTrendUp className="text-[#18FFDD]" size={16} />
                ) : (
                  <FaArrowTrendDown className="text-red-400" size={16} />
                )}
                <p className="font-normal text-sm">
                  <span
                    className={isPositive ? "text-[#18FFDD]" : "text-red-400"}
                  >
                    {isPositive ? "+" : ""}
                    {percentage.toFixed(1)}%
                  </span>{" "}
                  since last month
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-black">
              <h2 className="font-medium text-lg">Tokens</h2>
              <div className="flex justify-between gap-5">
                <h2 className="font-bold text-center text-5xl self-center">
                  {user?.tokens}
                </h2>
                <Image
                  src={"/assets/png/coin.png"}
                  alt=""
                  width={90}
                  height={90}
                />
              </div>

              <Button
                className="font-medium text-sm block mx-auto mt-5"
                variant={undefined}
                size={undefined}
                onClick={() => router.push("/billing")}
              >
                Purchase more
              </Button>
            </div>
          </div>

          <List data={data} />
        </div>

        <div>
          <LeadCountry procedureStats={procedureStats} />
          <TopProcedures procedureStats={procedureStats} />
        </div>
      </div>
    </>
  );
};
export default withAuth(Dashboard);
