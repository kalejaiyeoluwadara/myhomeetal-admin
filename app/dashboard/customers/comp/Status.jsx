import React from "react";
import { GoPeople } from "react-icons/go";
import { SiHackthebox } from "react-icons/si";
function Status() {
  const data = [
    {
      title: "Total Customer",
      count: "0",
    },
    {
      title: "Active Customers",
      count: "0",
    },
    {
      title: "Unregistered Customers",
      count: "0",
    },
  ];
  return (
    <main className="w-full grid gap-2 mt-[52px]  mb-[24px] grid-cols-3">
      {data.map((d, id) => {
        return (
          <div className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-4 gap-8   border border-border bg-white">
            <div className="flex gap-3 center">
              <div className="h-[32px] rounded-[8px] center bg-[#FFF1F1] text-[#FF6567] w-[32px] ">
                <SiHackthebox size={15} />
              </div>
              <p className="grey">{d.title}</p>
            </div>
            <div>
              <p className="text-[32px] font-semibold  ">{d.count}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default Status;
