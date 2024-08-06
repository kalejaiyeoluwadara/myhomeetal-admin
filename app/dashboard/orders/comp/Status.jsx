"use client";
import React, { useEffect, useState } from "react";
import useData from "@/hooks/useData";
import { GoPeople } from "react-icons/go";
import { SiHackthebox } from "react-icons/si";

function Status() {
  const {
    data: orders,
    loading,
    error,
  } = useData("https://my-home-et-al.onrender.com/api/v1/order");
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (orders) {
      const completed = orders.filter(
        (order) => order.status === "Completed"
      ).length;
      const pending = orders.filter(
        (order) => order.status !== "Pending"
      ).length;
      setCompletedCount(completed);
      setPendingCount(pending);
    }
  }, [orders]);

  const data = [
    {
      title: "Total Orders",
      count: orders.length,
    },
    {
      title: "Pending Orders",
      count: pendingCount,
    },
    {
      title: "Completed Orders",
      count: completedCount,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="w-full grid gap-2 mt-[52px] mb-[24px] grid-cols-3">
      {data.map((d, id) => (
        <div
          key={id}
          className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-4 gap-8 border border-border bg-white"
        >
          <div className="flex gap-3 center">
            <div
              className={`h-[32px] rounded-[8px] ${
                d.title === "Total Orders"
                  ? "bg-[#E7F6EC] text-[#1F7C3F]"
                  : d.title === "Pending Orders"
                  ? "bg-[#FEF6E7] text-[#AD6F07]"
                  : "bg-[#FFF1F1] text-[#FF6567] "
              } center w-[32px] `}
            >
              <SiHackthebox size={15} />
            </div>
            <p className="grey">{d.title}</p>
          </div>
          <div>
            <p className="text-[32px] font-semibold">{d.count}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default Status;
