import React from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../app/assets/filter.svg";
import ex from "../../app/assets/export.svg";
import date from "../../app/assets/date.svg";
import Image from "next/image";
import profile from "../assets/profile.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import TableData from "./components/TableData";
function Table() {
  return (
    <div className="w-full overflow-hidden h-auto rounded-[10px] flex flex-col items-start justify-start border ">
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
        <div className="w-full h-[44px] px-3 text-[12px] font-medium pt-1 items-center justify-center grid grid-cols-9 ">
          <p className=" col-span-2 ">Name</p>
          <p className="">ID</p>
          <p>Position</p>
          <p className="col-span-2">Email</p>
          <p className="">Phone No</p>
          <p className="pl-2">Status</p>
          <p className="w-[20px]"></p>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, id) => {
          return <TableData />;
        })}
        <footer className="w-full flex items-center justify-between px-4 h-[68px] bg-white">
          <div>
            <p className="font-semibold text-[#667185] ">Page 1 of 30</p>
          </div>
          <div className="flex text-[#98A2B3] gap-2">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className="flex gap-2">
            <section className="w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 sh pointer rounded-[8px] text-[14px]  ">
              <HiOutlineArrowLongLeft className="text-[#667185]" size={20} />
              <p className="text-[#344054] font-semibold ">Previous</p>
            </section>
            <section className="w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 sh pointer rounded-[8px] text-[14px]  ">
              <p className="text-[#344054] font-semibold ">Next</p>
              <HiOutlineArrowLongRight className="text-[#667185]" size={20} />
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Table;
