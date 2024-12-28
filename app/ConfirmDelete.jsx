"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import check from "@/app/assets/check.svg";
import { FiLogOut } from "react-icons/fi";
import logouts from "@/app/assets/logout.svg";
import cancel from "@/app/assets/cancel.svg";
import { useGlobal } from "./context";
import Image from "next/image";
function ConfirmDelete({ handleClick, opened, setOpened, isLoading }) {
  return (
    <>
      {opened && (
        <div className="w-screen h-screen bg-black bg-opacity-35 fixed z-40 top-0 left-0 center">
          <div className="w-[450px] ml-[270px] translate-x-[-100px] h-[450px] p-[40px] bg-white rounded-2xl flex items-center justify-center flex-col ">
            <div className="h-[68px] flex-shrink-0 w-[68px] bg-[#FFC5C6] rounded-full " />
            <h2 className="text-[24px] leading-[29px] mt-4 font-bold text-center w-[277px]  ">
              Are you sure you want to Delete all selected items?
            </h2>
            <p className="text-center text-[#292929] mt-4 text-sm font-light w-[277px]  ">
              Please confirm if you want to Delete all.
            </p>
            <div onClick={handleClick} className="w-full">
              <div
                className={`${
                  isLoading
                    ? "bg-gray-400 "
                    : "bg-red-600 cursor-pointer hover:bg-red-500"
                } text-white mt-6 mb-2 gap-2 text-[16px] center w-full h-[44px] rounded-[8px] `}
              >
                <Image src={logouts} alt="" className="" />
                <p>Yes, Delete All</p>
              </div>
            </div>
            <div
              onClick={() => {
                setOpened(false);
              }}
              className="bg-red-50 hover:bg-red-100 text-black cursor-pointer gap-2 center w-full h-[44px] rounded-[8px] "
            >
              <Image src={cancel} className="" alt="" />
              Cancel
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmDelete;
