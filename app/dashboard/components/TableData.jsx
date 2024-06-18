"use client";
import React, { useState } from "react";
import Image from "next/image";
import profile from "../../assets/profile.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function TableData() {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-9 ">
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        <Image className="" alt="" src={profile} />
        <p className="text-[14px] font-medium text-[#101928] ">
          Olamide Akintan
        </p>
      </div>
      <p className=" ">#28373</p>
      <p>Design team</p>
      <p className=" truncate col-span-2">olamideakintan@gmail.com</p>
      <p className="">0814 609 2019</p>
      <div className="px-2 ">
        <p className="px-3 font-medium bg-[#FFF1F1] rounded-[12px] py-[2px] flex items-center justify-center text-[#C70E10] ">
          Label
        </p>
      </div>
      <div className="flex items-center relative justify-center ">
        <p
          onClick={() => {
            setModal((prev) => !prev);
          }}
          className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center "
        >
          <IoIosArrowDown size={20} />{" "}
        </p>
        {modal && (
          <div className="h-[60px] border bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[70px] ">
            <p>View</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableData;
