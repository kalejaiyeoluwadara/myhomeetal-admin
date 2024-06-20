"use client";
import Image from "next/image";
import sport from "@/app/assets/sport.svg";
import React, { useState } from "react";
function StockAlert() {
  // const [filt,setFilt] = useState('E')
  const [modal, setModal] = useState(false);
  return (
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
        <div className="flex justify-between px-4 h-[68px] items-center">
          <Image src={sport} className="" alt="" />
          <h3>Sporty Running Shoe</h3>
          <button className="pill cursor-text ">Low</button>
        </div>
      </section>
    </div>
  );
}

export default StockAlert;
