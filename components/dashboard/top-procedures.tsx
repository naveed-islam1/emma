import React from "react";

export default function TopProcedures({ procedureStats }) {
  const stats = procedureStats?.data;

  return (
    <>
      <div className="bg-white rounded-2xl p-4 mt-5">
        <h2 className="font-medium text-lg">Top Procedures</h2>
        <ol className="list-decimal ml-4 space-y-2 mt-5">
          <div className="flex justify-between">
            <li className="font-normal text-sm text-black ">Mommy Makeover</li>
            <p className="font-normal text-sm text-[#8A38F5] ">
              {stats?.procedures?.mommy_makeover || 0} Leads
            </p>
          </div>
          <div className="flex justify-between">
            <li className="font-normal text-sm text-black ">
              Breast Augmentation
            </li>
            <p className="font-normal text-sm text-[#8A38F5] ">
              {stats?.procedures?.breast_augmentation || 0} Leads
            </p>
          </div>
        </ol>
      </div>
    </>
  );
}
