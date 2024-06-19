"use client";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
function Welcome() {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("this week");
  return (
    <div className="flex  items-center justify-between">
      <section
        onClick={() => {
          setModal((prev) => !prev);
        }}
        className="flex gap-4 pointer "
      >
        <h2 className="text-[24px] font-semibold ">Returns and Refunds</h2>
        <div className="flex relative border rounded-[8px] center grey gap-2 px-3 py-[6px]">
          <p className="text-[14px] capitalize font-medium  ">{filter}</p>
          <BsChevronDown size={20} />

          {modal && (
            <div className="w-[136px] grey px-2 py-4 h-auto border rounded-xl absolute -bottom-[140px] bg-white ">
              {["this week", "last week", "recently"].map((d, id) => {
                return (
                  <p
                    onClick={() => {
                      setFilter(d);
                    }}
                    key={id}
                    className="py-1 px-2 capitalize rounded-md pointer hover:bg-red-50 "
                  >
                    {d}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
