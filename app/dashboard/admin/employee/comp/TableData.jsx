"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
import { useGlobal } from "@/app/context";
function TableData({
  date,
  address,
  deliveryMethod,
  orderId,
  orderPrice,
  status,
  user: person,
  _id,
}) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-9 ">
      <p className=" col-span-2 truncate ">{orderId}</p>
      <div className="flex w-auto  items-center justify-start gap-2 ">
        <p className="text-[14px] font-medium text-[#101928] truncate ">
          username
        </p>
      </div>
      <p className="col-span-2 truncate">{date}</p>
      <p className=" text-center w-full ml-2  ">
        ₦{formatNumberWithCommas(orderPrice)}
      </p>
      <div className="px-2 center col-span-2 ">
        <p
          className={`px-3 text-xs font-medium ${
            status === "Pending"
              ? "bg-[#FFF1F1] text-[#C70E10]  "
              : "text-green-600 bg-green-200"
          } rounded-[12px] py-[2px] flex items-center justify-center `}
        >
          {status}
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
          <div
            onClick={() => setModal((prev) => !prev)}
            className="h-auto border flex flex-col bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[130px] items-start px-2 py-2 text-[14px] "
          >
            <Link className="w-full" href={`/dashboard/orders/${_id}`}>
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
