"use client";
import { useGlobal } from "@/app/context";
import React from "react";
function Welcome() {
  const { createCat, setCreateCat } = useGlobal();
  return (
    <div className="flex  items-center justify-between">
      <section className="flex gap-4 pointer ">
        <h2 className="text-[24px] font-semibold ">All Categories</h2>
      </section>
      <button
        onClick={() => {
          setCreateCat(true);
        }}
        className=" w-[161px] h-[55px] rounded-lg "
      >
        Create Category
      </button>
    </div>
  );
}

export default Welcome;
