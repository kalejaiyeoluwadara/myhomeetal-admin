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
  user,
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
        <p className="text-sm text-center font-medium text-[#101928] truncate ">
          {user?.firstname}
          {/* {user?.lastname} */}
        </p>
      </div>
      <p className="col-span-2 truncate">{date}</p>
      <p className=" text-center w-full ml-2  ">
        ₦{formatNumberWithCommas(orderPrice)}
      </p>
      <div className="px-2 center col-span-2 ">
        <p
          className={`px-3 text-xs font-medium ${
            status !== "Delivered"
              ? "bg-[#FFF1F1] text-[#C70E10]  "
              : "text-green-600 bg-green-200"
          } rounded-[12px] py-[2px] flex items-center justify-center `}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center relative justify-center ">
        <Link href={`/dashboard/orders/${_id}`}>
          <p
            onClick={() => {
              setModal((prev) => !prev);
            }}
            className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center "
          >
            <IoMdMore size={20} />{" "}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default TableData;
