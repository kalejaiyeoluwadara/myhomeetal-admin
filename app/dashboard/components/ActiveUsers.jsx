"use client";
import React from "react";
import { PiMoneyWavy } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { IoAnalyticsOutline } from "react-icons/io5";
import { useGlobal } from "@/app/context";
function ActiveUsers() {
  const { clen } = useGlobal();
  return (
    <div className="box">
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center justify-center h-[32px] w-[32px] border rounded-[8px] ">
          <IoPersonOutline />
        </div>
        <p className="grey text-[14px] font-medium ">Active Current user</p>
      </div>

      <div>
        <p className="title mt-8 ">{clen}</p>
      </div>

      <div className="flex items-center mt-[12px] gap-2 justify-center  ">
        <div className="w-[50px] gap-[4px]  h-[18px] flex items-center justify-center rounded-[12px] bg-[#FFF1F1] ">
          <IoAnalyticsOutline
            size={12}
            className="border-[1px] p-[1px] rounded-sm text-[#C70E10] border-[#C70E10] "
          />
          <p className="text-[12px] text-[#C70E10] font-medium  ">10%</p>
        </div>
        <p className="text-[12px] grey font-medium ">Compared to last month</p>
      </div>
    </div>
  );
}

export default ActiveUsers;
