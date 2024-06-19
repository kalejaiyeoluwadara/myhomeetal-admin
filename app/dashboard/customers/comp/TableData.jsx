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
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        <Image className="" alt="" src={sport} />
        <p className="text-[14px] font-medium text-[#101928] ">Nguyen, Shane</p>
      </div>
      <p className=" col-span-2 truncate ">alma.lawson@example.com </p>
      <p className="col-span-2 truncate">(252) 555-0126</p>
      <p className=" ">$854.08</p>
      <p className=" ">24 May, 2020</p>
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
          <Link href={"/dashboard/customers/1"}>
            <div
              onClick={() => {
                setModal((prev) => !prev);
              }}
              className="h-[60px] border bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[120px] p-2 text-[14px] "
            >
              <p className="w-full truncate h-full pointer hover:bg-red-50 center rounded-md ">
                View Customer
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TableData;
