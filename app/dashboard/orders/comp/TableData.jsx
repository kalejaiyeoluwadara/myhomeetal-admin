"use client";
import React, { useState } from "react";
import Image from "next/image";
import sport from "../../../assets/bessie.svg";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
function TableData() {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-9 ">
      <p className=" col-span-2 truncate ">ORD-1562792771583</p>
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        <Image className="" alt="" src={sport} />
        <p className="text-[14px] font-medium text-[#101928] ">Bessie Cooper</p>
      </div>
      <p className="col-span-2 truncate">February 11, 2014</p>
      <p className=" ">$854.08</p>
      <div className="px-2 ">
        <p className="px-3 font-medium bg-[#FFF1F1] rounded-[12px] py-[2px] flex items-center justify-center text-[#C70E10] ">
          Pending
        </p>
      </div>
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
          <div className="h-auto border flex flex-col bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[130px] items-start px-2 py-2 text-[14px] ">
            <Link className="w-full" href={"/dashboard/orders/1"}>
              <p className="w-full px-2 h-[40px]  pointer hover:bg-red-50 flex items-center rounded-md ">
                See Details
              </p>
            </Link>
            <p className="w-full px-2 h-[40px]  pointer hover:bg-red-50 flex items-center rounded-md ">
              Change Status
            </p>
            <p className="w-full px-2 h-[40px]  pointer hover:bg-red-50 flex items-center rounded-md ">
              Cancel Order
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableData;
