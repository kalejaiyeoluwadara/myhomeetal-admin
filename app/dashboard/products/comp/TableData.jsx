"use client";
import React, { useState, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import Link from "next/link";
import CheckMark from "../../components/CheckMark";
import Image from "next/image";

function TableData({
  _id,
  productTitle,
  price,
  category,
  description,
  inventory,
  brand,
  images,
  product,
}) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => {
        setModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [modal]);
  const img = images[images.length - 1];
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center relative justify-center grid pt-2 grid-cols-8 ">
      {/* delete product */}
      <CheckMark product={product} />
      <div className="flex pl-4 ml-2 w-auto col-span-3 items-center justify-start gap-2 truncate">
        <Image
          className=" h-[40px] flex-shrink-0 bg-gray-200 w-[40px] rounded-full object-cover "
          alt=""
          height={40}
          width={40}
          src={img}
        />
        <p className="text-[14px] truncate font-medium text-[#101928] ">
          {productTitle}
        </p>
      </div>
      {/* <p className=" col-span-2 truncate ">-</p> */}
      <p>#{formatNumberWithCommas(price)}</p>
      <p className="text-center ">{inventory}</p>
      <p className="truncate text-center">{category?.name}</p>
      <div className="px-2 ">
        <p className="px-3 font-medium bg-green-200 rounded-[12px] py-[2px] flex items-center justify-center text-green-600 ">
          active
        </p>
      </div>
      <div className="flex items-center relative justify-center ">
        <Link href={`/dashboard/products/${_id}`}>
          {" "}
          <p className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center ">
            <IoMdMore size={20} />{" "}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default TableData;
