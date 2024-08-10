"use client";
import { useGlobal } from "@/app/context";
import useData from "@/hooks/useData";
import React from "react";

function List() {
  const { formatNumberWithCommas } = useGlobal();
  const { data, loading } = useData(
    "https://my-home-et-al.onrender.com/api/v1/admin-wallet"
  );

  // Check if data is loading or undefined
  if (loading || !data) {
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

  // Calculate total sales and total revenue
  const totalSales = (data.userPayments || []).reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <div className="grid grid-cols-3 mb-6 items-center justify-center gap-4">
      {[
        {
          title: "Total Sales",
          item: `₦${formatNumberWithCommas(totalSales)}`,
          year: "This year",
        },
        {
          title: "Total Revenue",
          item: `₦${formatNumberWithCommas(totalSales)}`,
          year: "This year",
        },
        {
          title: "Total Withdrawal",
          item: "₦0.00",
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
