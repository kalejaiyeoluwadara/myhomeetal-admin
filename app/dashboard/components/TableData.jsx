"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../assets/logo.svg";
import { IoIosArrowDown, IoIosArrowUp, IoMdMore } from "react-icons/io";
import Link from "next/link";
function TableData({
  username,
  fullname,
  email,
  _id,
  phone_no,
  employee_id,
  img,
  isActive,
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
  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-8 ">
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        {img !== undefined && img !== "" ? (
          <img
            className=" flex-shrink-0 object-cover h-[50px] w-[50px] bg-gray-300 rounded-full "
            alt=""
            src={img}
          />
        ) : (
          <Image
            src={profile}
            alt=""
            className=" h-[50px]  w-[50px] rounded-full  "
          />
        )}
        <p className="text-[14px] truncate bg-re-300 font-medium text-[#101928] capitalize ">
          {fullname ? fullname.split(" ")[0] : username}
        </p>
      </div>
      <p className=" truncate">#{employee_id}</p>
      <p className=" truncate col-span-2">{email}</p>
      <p className="">{phone_no}</p>
      <div className="px-2 ">
        <p
          className={`px-3 font-medium  rounded-[12px] py-[2px] flex items-center justify-center ${
            isActive
              ? "text-green-600 bg-green-200"
              : "bg-[#FFF1F1] text-[#C70E10] "
          } `}
        >
          {isActive ? "active" : "inactive"}
        </p>
      </div>
      <Link href={`/dashboard/employees/${_id}`}>
        <div className="flex items-center relative justify-center ">
          <p
            onClick={() => {
              setModal((prev) => !prev);
            }}
            className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center "
          >
            <IoMdMore size={20} />{" "}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default TableData;
