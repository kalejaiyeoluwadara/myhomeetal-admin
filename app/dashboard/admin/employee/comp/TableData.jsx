"use client";
import React, { useState } from "react";
import Image from "next/image";
import sport from "../../../../assets/bessie.svg";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
function TableData() {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full h-[72px] border-b border-[#F7F9FC] bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-7 ">
      <div className="flex col-span-3   w-[79%]  gap-2">
        <Image className="" alt="" src={sport} />
        <div className="w-full">
          <p className="text-[14px] truncate w-full font-medium text-[#101928] ">
            Bessie Cooper
          </p>
          <p className="truncate">ORD-1562792771583</p>
        </div>
      </div>
      <div className=" flex items-center justify-start   ">
        <p className=" w-[79px] h-[24px] text-[14px] flex items-center justify-center rounded-xl font-medium bg-[#FFF1F1]  text-[#C70E10] ">
          Pending
        </p>
      </div>
      <p className=" col-span-2 text-center truncate">February 11, 2014</p>
      <div className="flex items-center relative justify-center ">
        <p
          onClick={() => {
            setModal((prev) => !prev);
          }}
          className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center "
        >
          <IoMdMore size={20} />{" "}
        </p>
        {modal && (
          <Link href={"/dashboard/orders/1"}>
            <div className="h-[60px] border bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[150px] p-2 text-[14px] ">
              <p className="w-full h-full pointer hover:bg-red-50 center rounded-md ">
                View Order Details
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TableData;
