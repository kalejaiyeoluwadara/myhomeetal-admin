"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import chart from "../../assets/orders.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function OrderC() {
  const [emp, setEmp] = useState(false);
  return (
    <div className="flex cursor-pointer flex-col">
      <div
        onClick={() => {
          setEmp((prev) => !prev);
        }}
        className="flex hover:bg-red-50 pr-1 w-full justify-between items-center "
      >
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={chart} alt="" className={`opacity-60 `} /> <p>Orders</p>{" "}
          </div>
        </div>
        <div> {!emp ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
      </div>
      {/* contents */}
      {emp && (
        <div>
          <Inner name={"All Orders"} />
          <Inner name={"Order Analytics"} />
          <Inner name={"Returns and Refunds"} />
        </div>
      )}
    </div>
  );
}

export default OrderC;
