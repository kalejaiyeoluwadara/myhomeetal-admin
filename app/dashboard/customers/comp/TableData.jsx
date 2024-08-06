"use client";
import React, { useState } from "react";
import Image from "next/image";
import sport from "../../../assets/bessie.svg";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
function TableData({
  _id,
  firstname,
  lastname,
  email,
  points,
  referralCode,
  isVerified,
}) {
  const [modal, setModal] = useState(false);
  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-8 ">
      <div className="flex w-auto col-span-2 items-center  justify-start gap-2 truncate">
        {/* <Image className="" alt="" src={sport} /> */}
        <p className="text-[14px] font-medium text-[#101928] ">
          {lastname}, {firstname}
        </p>
      </div>
      <p className=" col-span-2 truncate ">{email} </p>
      <p className=" text-center ">{referralCode}</p>
      <p className=" text-center ">{points}</p>
      <div className="flex items-center justify-center col-span-2 ">
        <p
          className={`px-3 font-medium w-[60px] rounded-[12px] py-[2px] flex items-center justify-center ${
            isVerified
              ? "text-green-600 bg-green-200"
              : " bg-red-200 text-red-600 "
          } `}
        >
          {isVerified ? "true" : "false"}
        </p>
      </div>
    </div>
  );
}

export default TableData;
