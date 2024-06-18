import React from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../app/assets/filter.svg";
import ex from "../../app/assets/export.svg";
import date from "../../app/assets/date.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function Table() {
  return (
    <div className="w-full overflow-hidden h-[840px] rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
        {/* search and filter button */}
        <div className="flex gap-2">
          <section className="sh w-[291px] h-full  border flex items-start justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
            <IoSearch className="text-[#667185]" size={20} />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent h-full outline-none "
            />
          </section>
          <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] ">
            <Image src={filter} alt="" className="h-[13px] w-[13px] " />
            <p className="text-[#344054]">Filter</p>
          </section>
        </div>
        <div className="flex  w-full  justify-end items-center gap-2">
          <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh pointer text-[14px] font-[500] ">
            <Image src={ex} alt="" className=" " />
            <p className="text-[#344054]  ">Export Data</p>
          </section>
          <section className="w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 sh pointer rounded-[8px] text-[14px]  ">
            <Image src={date} alt="" className="" />
            <p className="text-[#344054]] ">Select Dates</p>
            <IoIosArrowDown className="text-[#667185]" size={20} />
          </section>
        </div>
        {/* Content */}
        <div></div>
      </section>
    </div>
  );
}

export default Table;
