"use client";
import { useGlobal } from "@/app/context";
import React from "react";
function Welcome() {
  const { isCreateSubCategoryOpen, setIsCreateSubCategoryOpen } = useGlobal();
  return (
    <div className="flex  items-center justify-between">
      <section className="flex gap-4 pointer ">
        <h2 className="text-[24px] font-semibold ">All Sub-Categories</h2>
      </section>
      <button
        onClick={() => {
          setIsCreateSubCategoryOpen(true);
        }}
        className=" w-fit px-6 font-medium h-[55px] rounded-[99px] "
      >
        Create Sub-Category
      </button>
    </div>
  );
}

export default Welcome;
