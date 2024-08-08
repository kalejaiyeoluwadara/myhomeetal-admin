"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "@/app/assets/filter.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Filter({ filt, setFilt }) {
  const [modal, setModal] = useState(false);
  return (
    <section
      onClick={() => {
        setModal((prev) => !prev);
      }}
      className="px-3 relative w-[120px]  h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] "
    >
      <Image src={filter} alt="" className="h-[13px] w-[13px] " />
      <p className="text-[#344054] pointer capitalize ">{filt}</p>
      {/* Modal */}
      {modal && (
        <div className=" h-auto w-[180px]  flex flex-col items-start justify-center p-2  bg-white border top-12 -right-[60px]  rounded-xl absolute z-40  ">
          {[
            "today",
            "yesterday",
            "this week",
            "this month",
            "yearly",
            "all time",
          ].map((d, id) => {
            return (
              <p
                onClick={() => {
                  setFilt(d);
                  // setModal(!modal);
                }}
                key={id}
                className=" w-full p-3 capitalize rounded-md hover:bg-red-50 pointer text-sm"
              >
                {d}
              </p>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Filter;
