"use client";
import React, { useState } from "react";
import Image from "next/image";
import sport from "../../../assets/sport.svg";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
function TableData({
  _id,
  productTitle,
  price,
  category,
  description,
  brand,
  images,
}) {
  const [modal, setModal] = useState(false);
  const img = images[0];
  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-9 ">
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        <img
          className=" h-[40px] bg-gray-200 w-[40px] rounded-full object-cover "
          alt=""
          src={img}
        />
        <p className="text-[14px] font-medium text-[#101928] ">
          {productTitle}
        </p>
      </div>
      <p className=" col-span-2 truncate ">-</p>
      <p>#{price}</p>
      <p className=" ">-</p>
      <p className="truncate ">{category}</p>
      <div className="px-2 ">
        <p className="px-3 font-medium bg-green-200 rounded-[12px] py-[2px] flex items-center justify-center text-green-600 ">
          active
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
          <Link href={`/dashboard/products/${_id}`}>
            <div className="h-[60px] border bg-white sh absolute top-6 -right-2 z-40 center rounded-md w-[100px] p-2 text-[14px] ">
              <p className="w-full h-full pointer hover:bg-red-50 center rounded-md ">
                View Product
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TableData;
