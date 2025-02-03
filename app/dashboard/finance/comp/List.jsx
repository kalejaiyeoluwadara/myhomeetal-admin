"use client";

import { useGlobal } from "@/app/context";
import useData from "@/hooks/useData";
import React from "react";

function List() {
  const { formatNumberWithCommas } = useGlobal();

  // Fetch revenue, sales, and withdrawals data
  const { data: revenueData, loading: loadingRevenue } = useData(
    "https://api.myhomeetal.store/api/v1/admin-wallet/revenue"
  );
  const { data: salesData, loading: loadingSales } = useData(
    "https://api.myhomeetal.store/api/v1/admin-wallet/sales"
  );
  const { data: withdrawalsData, loading: loadingWithdrawals } = useData(
    "https://api.myhomeetal.store/api/v1/admin-wallet/withdrawals"
  );

  // Loading state or data fallback
  if (
    loadingRevenue ||
    loadingSales ||
    loadingWithdrawals ||
    !revenueData ||
    !salesData ||
    !withdrawalsData
  ) {
    return (
      <div className="grid grid-cols-3 mb-6 items-center justify-center gap-4">
        {[
          { title: "Total Sales", item: "Loading...", year: "This year" },
          { title: "Total Revenue", item: "Loading...", year: "This year" },
          { title: "Total Withdrawal", item: "Loading...", year: "This year" },
        ].map((d, id) => (
          <div
            key={id}
            className="h-[150px] border py-4 w-auto rounded-xl bg-white px-4 flex items-start justify-center flex-col"
          >
            <section className="flex w-full text-gray-500 justify-between items-center">
              <p>{d.title}</p>
              <p>{d.year}</p>
            </section>
            <section>
              <h2 className="text-[32px] font-semibold mt-8 text-[#1D2739]">
                {d.item}
              </h2>
            </section>
          </div>
        ))}
      </div>
    );
  }

  // Extract total revenue, sales, and withdrawals from the API responses
  const totalRevenue = revenueData?.totalRevenue || 0;
  const totalSales = salesData?.totalSales || 0;
  const totalWithdrawals = withdrawalsData?.totalWithdrawals || 0;

  return (
    <div className="grid grid-cols-3 mb-6 items-center justify-center gap-4">
      {[
        {
          title: "Total Sales",
          item: `₦${formatNumberWithCommas(totalSales)}.00`,
          year: "This year",
        },
        {
          title: "Total Revenue",
          item: `₦${formatNumberWithCommas(totalRevenue)}.00`,
          year: "This year",
        },
        {
          title: "Total Withdrawal",
          item: `₦${formatNumberWithCommas(totalWithdrawals)}.00`,
          year: "This year",
        },
      ].map((d, id) => (
        <div
          key={id}
          className="h-[150px] border py-4 w-auto rounded-xl bg-white px-4 flex items-start justify-center flex-col"
        >
          <section className="flex w-full text-gray-500 justify-between items-center">
            <p>{d.title}</p>
            <p>{d.year}</p>
          </section>
          <section>
            <h2 className="text-[32px] font-semibold mt-8 text-[#1D2739]">
              {d.item}
            </h2>
          </section>
        </div>
      ))}
    </div>
  );
}

export default List;
