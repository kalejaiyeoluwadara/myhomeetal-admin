import React from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../app/assets/filter.svg";
import ex from "../../app/assets/export.svg";
import date from "../../app/assets/date.svg";
import Image from "next/image";
import profile from "../assets/profile.png";
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
            <p className="text-[#344054]  ">Export data</p>
          </section>
          <section className="w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 sh pointer rounded-[8px] text-[14px]  ">
            <Image src={date} alt="" className="" />
            <p className="text-[#344054]] ">Select dates</p>
            <IoIosArrowDown className="text-[#667185]" size={20} />
          </section>
        </div>
      </section>
      {/* Content */}
      <div className="w-full ">
        <div className="w-full h-[44px] px-3 pt-1 items-center justify-center grid grid-cols-9 ">
          <p className=" col-span-2 ">Name</p>
          <p className="">ID</p>
          <p>Position</p>
          <p className="col-span-2">Email</p>
          <p className="">Phone No</p>
          <p>Status</p>
          <p className="w-[20px]"></p>
        </div>
        <div className="w-full h-[72px] bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-9 ">
          <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
            <Image className="" alt="" src={profile} />
            <p className="text-[14px] font-medium text-[#101928] ">
              Olamide Akintan
            </p>
          </div>
          <p className=" ">#28373</p>
          <p>Design team</p>
          <p className=" truncate col-span-2">olamideakintan@gmail.com</p>
          <p className="">0814 609 2019</p>
          <p>Label</p>
          <p className="w-[20px]">
            <IoIosArrowDown size={20} />{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Table;
