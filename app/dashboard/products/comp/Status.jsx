"use client";
import { useGlobal } from "@/app/context";
import useData from "@/hooks/useData";
import React from "react";
import { GoPeople } from "react-icons/go";
import { SiHackthebox } from "react-icons/si";
function Status() {
  const { totalProd } = useGlobal();
  const { data: products = [] } = useData(
    "https://my-home-et-al.onrender.com/api/v1/product/all-products"
  );
  const outOfStockCount = products.reduce((count, product) => {
    if (product.inventory?.quantity < 5) {
      return count + 1;
    }
    return count;
  }, 0);

  const data = [
    {
      title: "Total products",
      count: totalProd,
    },
    {
      title: "Out of Stock Products ",
      count: outOfStockCount,
    },
    // {
    //   title: "Most Viewed Product",
    //   count: 0,
    // },
  ];
  return (
    <main className="w-full grid gap-2 mt-[45px]  mb-[24px] grid-cols-3">
      {data.map((d, id) => {
        return (
          <div className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-4 gap-8   border border-border bg-white">
            <div className="flex gap-3 center">
              <div className="h-[32px] rounded-[8px] center bg-[#FFF1F1] text-[#FF6567] w-[32px] ">
                <SiHackthebox size={15} />
              </div>
              <p className="grey">{d.title}</p>
            </div>
            <div>
              <p className="text-[32px] font-semibold  ">{d.count}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default Status;
