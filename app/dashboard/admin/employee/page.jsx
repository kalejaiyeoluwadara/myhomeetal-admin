"use client";
import React, { useState } from "react";
import Welcome from "./comp/Welcome";
import { GoPeople } from "react-icons/go";
import bag from "@/app/assets/bag1.svg";
import shop from "@/app/assets/shop.svg";
import Table from "./comp/TableOrd";
import Data from "./comp/Data";
import Image from "next/image";

function Page() {
  const data = [
    {
      title: "Today Sales",
      item: "20,000",
      img: shop,
    },
    {
      title: "Weekly Sales",
      item: "175,000",
      img: bag,
    },
  ];
  const [modal, setModal] = useState(false);
  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <section className=" mt-6 gap-6 grid grid-cols-2 w-full ">
        {data.map((d, id) => {
          return (
            <div
              key={id}
              className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-6 gap-8   border border-border bg-white"
            >
              <div className="flex gap-3 center">
                <div
                  className={`h-[32px] rounded-[8px] center  ${
                    d.img === shop ? " bg-[#E7F6EC]" : "bg-[#FFF1F1]"
                  } text-[#FF6567] w-[32px] `}
                >
                  <Image className="" src={d.img} alt="" />
                </div>
                <p className="grey">{d.title}</p>
              </div>
              <div>
                <p className="text-[32px] font-semibold  ">{d.item}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-3 mt-6 w-full h-[568px] gap-4">
        <Table />
        {/* Stock aller */}
        <div className="w-auto  bg-white border rounded-xl h-full ">
          <section className="w-full flex items-center justify-between px-[16px]  h-[68px] ">
            <h2 className="font-semibold text-base ">Stock Alert</h2>
            <section
              onClick={() => {
                setModal((prev) => !prev);
              }}
              className="w-[59px] relative  h-[30px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] "
            >
              <p className="text-[#344054] pointer capitalize ">Edit</p>
              {/* Modal */}
              {modal && (
                <div className=" h-auto w-[180px] flex flex-col items-start justify-center p-2  bg-white border top-12 right-3 rounded-xl absolute z-40  ">
                  {["edit order", "change status"].map((d, id) => {
                    return (
                      <p
                        key={id}
                        className=" p-3 w-full capitalize rounded-md hover:bg-red-50 pointer text-sm"
                      >
                        {d}
                      </p>
                    );
                  })}
                </div>
              )}
            </section>
          </section>
          {/* data */}
          <section className="mt-3">
            {[1, 2, 3, 4, 5, 6].map((d, id) => {
              return <Data key={id} />;
            })}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Page;
