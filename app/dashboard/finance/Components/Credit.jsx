"use client";
import { useGlobal } from "@/app/context";
import { BsChevronRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
import React from "react";
const Credit = ({ amount, name, method }) => {
  const { formatNumberWithCommas } = useGlobal();
  return (
    <section className="w-full h-[40px] flex justify-between items-center ">
      <div className="flex gap-6 items-center justify-center ">
        <div className="h-10 w-10 center text-[#0F973D] font-semibold bg-[#E7F6EC] rounded-full ">
          <BsArrowDown size={20} />
        </div>
        <div>
          <p className="text-[16px]  ">
            from<span className="font-medium truncate "> {name}</span>
          </p>
          <p className="text-[#98A2B3] text-[12px] ">{method}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-blak text-[16px] ">
          +₦{formatNumberWithCommas(amount)}.00
        </p>
      </div>
    </section>
  );
};

export default Credit;
