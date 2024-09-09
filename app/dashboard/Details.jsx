"use client";
import React from "react";
import { PiMoneyWavy } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import Revenue from "./components/Revenue";
import ActiveUsers from "./components/ActiveUsers";
import TotalUsers from "./components/TotalUsers";
import Loadtime from "./components/Loadtime";
import useData from "@/hooks/useData";
function Details() {
  const { data } = useData(
    "https://my-home-et-al-backend-2.onrender.com/api/v1/user/all-users"
  );
  return (
    <div className="w-full grid grid-cols-4 gap-[10px] my-[45px] ">
      <Revenue />
      <ActiveUsers data={data} />
      <TotalUsers data={data} />
      <Loadtime />
    </div>
  );
}

export default Details;
