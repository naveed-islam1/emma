"use client";
import {
  dashboardApi,
  useGetLeadsQuery,
  useUnlockLeadMutation,
} from "@/services/dashboardApis";
import { useRecordOutcomeMutation } from "@/services/emmaApi";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaLock, FaUnlock } from "react-icons/fa";
import { LeadsSkeleton } from "../skeletons/LeadsSkeleton";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UnlockLeadModal } from "./unlock-leadmodal";
import toast from "react-hot-toast";
import { useSupabaseUser } from "@/hooks/useUser";
import { useGetProfileQuery } from "@/services/profileApi";

const statusButtonColorMap = {
  New: "#FFA756",
  Scheduled: "#6226EF",
  Contacted: "#BA29FF",
  Completed: "#00B69B",
  Closed: "#EF3826",
};

// Display label ↔ backend progress_status value (order = funnel order)
const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
  { label: "Closed", value: "closed" },
];

export default function List({ data }) {
  const { data: user } = useGetProfileQuery({});
  const [unlockLead, { isLoading }] = useUnlockLeadMutation();
  const [page, setPage] = useState(1);
  const { data: leadsData, isFetching } = useGetLeadsQuery({
    page,
    limit: 5,
    doctorId: user?.user_id,
  });

  const leads = leadsData?.data?.leads;
  const pagination = leadsData?.data?.pagination;

  useEffect(() => {
    setPage(pagination?.page);
  }, [pagination?.page]);

  console.log("user", user);

  const handleUnlockLead = async (leadId) => {
    await unlockLead({ leadId: leadId })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error(error.data?.message);
      });
  };

  const dispatch = useDispatch();
  const [recordOutcome] = useRecordOutcomeMutation();

  const handleStatusChange = async (item, newStatus) => {
    await recordOutcome({ lead_id: item.lead_id ?? item.id, new_status: newStatus })
      .unwrap()
      .then(() => {
        toast.success("¡Gracias! Emma aprende de cada actualización. 💜");
        // Dashboard data lives in the other API client — refetch its lists
        dispatch(dashboardApi.util.invalidateTags(["Dashboard"]));
      })
      .catch((error) => {
        toast.error(error?.data?.error || "No se pudo actualizar el estado");
      });
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="bg-white rounded-2xl p-4 mt-5">
          <div className="flex justify-between">
            <p className="font-normal text-[#4E4E4E] text-sm w-[60px]">
              Lead ID
            </p>
            <p className="font-normal text-[#4E4E4E] text-sm w-[90px] md:w-[70px]">
              Price
            </p>
            <p className="font-normal text-[#4E4E4E] text-sm w-[100px] md:w-28">
              Unlock Status
            </p>
            <p className="font-normal text-[#4E4E4E] text-sm w-[127px]">
              Progress Status
            </p>
          </div>

          <div>
            {isFetching ? (
              <LeadsSkeleton />
            ) : leads?.length > 0 ? (
              leads?.map((item, index) => {
                const serial = String(index + 1).padStart(4, "0");
                return (
                  <div
                    key={index}
                    className="flex justify-between mt-3 space-y-4"
                  >
                    <p className="self-center font-normal text-black text-sm w-[60px]">
                      {serial}
                    </p>
                    <p className="self-center font-normal text-black text-sm w-[90px] md:w-[70px]">
                      {item.price_display}
                    </p>
                    <div className="w-[100px] md:w-28">
                      <div
                        className="w-[47px] h-[27px] p-3 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: item.iconBg }}
                      >
                        <UnlockLeadModal
                          lead={item}
                          onConfirm={handleUnlockLead}
                          requiredTokens={item.price_display}
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                    <div className="w-[127px]">
                      <Select
                        value={
                          STATUS_OPTIONS.find((o) => o.label === item?.status)
                            ?.value
                        }
                        onValueChange={(v) => handleStatusChange(item, v)}
                        disabled={!(item.unlock_status ?? item.is_unlocked)}
                      >
                        <SelectTrigger
                          className="font-semibold text-sm w-full rounded-[5px] border-0 text-white justify-center"
                          style={{
                            backgroundColor:
                              statusButtonColorMap[item?.status] ?? "#FFA756",
                            color: item.buttonColor,
                          }}
                        >
                          <SelectValue placeholder={item?.status ?? "New"} />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] text-[#4E4E4E] mt-1 leading-tight">
                        Actualizar el estado entrena a Emma para encontrarte
                        mejores pacientes
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="font-semibold text-[#4E4E4E] text-sm text-center mt-3">
                No leads found
              </p>
            )}
          </div>
          <Pagination
            page={page}
            totalPages={pagination?.totalPages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>

      <div className="block md:hidden">
        <div className="bg-white rounded-2xl p-3 mt-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-3 last:border-none"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm text-black">
                  Lead ID: {item.id}
                </p>
                <p className="font-medium text-sm text-[#4E4E4E]">
                  {item.price}
                </p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div
                  className="w-[47px] h-[27px] p-3 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: item.iconBg }}
                >
                  {item.icon}
                </div>

                <Button
                  className="font-semibold text-xs py-1 px-5 rounded-[5px]"
                  style={{
                    backgroundColor: item.buttonBg,
                    color: item.buttonColor,
                  }}
                  variant={undefined}
                  size={undefined}
                >
                  {item.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
