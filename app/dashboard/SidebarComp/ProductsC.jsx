"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import cart from "../../assets/cart.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
function ProcuctsC() {
  const [emp, setEmp] = useState(false);
  return (
    <div className="flex  flex-col">
      <div
        onClick={() => {
          setEmp((prev) => !prev);
        }}
        className="flex w-full justify-between items-center "
      >
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={cart} alt="" className={`opacity-60 `} />{" "}
            <p>Products</p>{" "}
          </div>
        </div>
        <div>
          {" "}
          <IoIosArrowDown />{" "}
        </div>
      </div>
      {/* contents */}
      {emp && (
        <div>
          <Inner name={"All Products"} />
          <Inner name={"Add Products"} />
          <Inner name={"Product Analysis"} />
        </div>
      )}
    </div>
  );
}

export default ProcuctsC;
