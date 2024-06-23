"use client";
import { useGlobal } from "@/app/context";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import logouts from "@/app/assets/logout.svg";

import cancel from "@/app/assets/cancel.svg";
import Image from "next/image";
import Link from "next/link";
function Logout() {
  const { logout, setLogOut } = useGlobal();
  return (
    <>
      {logout && (
        <div className="h-screen fixed top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25 ">
          <div className="w-[400px] ml-[270px] h-[400px] p-[40px] bg-white rounded-2xl flex items-center justify-center flex-col ">
            <div className="h-[68px]  w-[68px] bg-[#FFC5C6] rounded-full " />
            <h2 className="text-[24px] leading-[29px] mt-4 font-bold text-center w-[277px]  ">
              Are you sure you want to log out?
            </h2>
            <p className="text-center text-[#292929] mt-4 text-sm font-light w-[277px]  ">
              Ensure you've saved all your actions before proceeding.
            </p>
            <Link
              onClick={() => {
                setLogOut(false);
              }}
              className="w-full"
              href={"/"}
            >
              {" "}
              <div className="bg-red-600 text-white mt-6 mb-2 gap-2 text-[16px] center w-full h-[44px] rounded-[8px] ">
                <Image src={logouts} alt="" className="" />
                <p>Yes, Logout</p>
              </div>
            </Link>
            <button
              onClick={() => {
                setLogOut(false);
              }}
              className="bg-red-50 text-black gap-2 center w-full h-[44px] rounded-[8px] "
            >
              <Image src={cancel} className="" alt="" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Logout;
