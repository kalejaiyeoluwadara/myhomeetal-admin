"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import chart from "../../assets/orders.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useParams } from "@/utils/param";
function OrderC() {
  const [emp, setEmp] = useState(false);
  const active = useParams();
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
          <Link href={"/dashboard/orders"}>
            <div
              className={` ${
                active === "/dashboard/orders" ? "bg-red-50" : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"All Orders"} />
            </div>
          </Link>
          {/* <Link href="/dashboard/orders/orderanalytics">
            <div
              className={` ${
                active === "/dashboard/orders/orderanalytics"
                  ? "bg-red-50"
                  : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Order Analytics"} />
            </div>
          </Link> */}
          <Link href={"/dashboard/returns"}>
            <div
              className={` ${
                active === "/dashboard/returns" ? "bg-red-50" : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Returns and Refunds"} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderC;
