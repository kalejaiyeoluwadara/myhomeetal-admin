import React from "react";
import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import profile from "../../assets/man.svg";
import Image from "next/image";
function NavBar() {
  return (
    <div className=" w-full relative flex items-center justify-between px-8  h-[64px] bg-white z-20 ">
      <section className=" bg-gray-50 h-[40px] w-[629px] flex items-start justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
        <IoSearch size={20} />
        <input
          type="text"
          placeholder="Search here..."
          className="w-[605px] bg-transparent h-full outline-none "
        />
      </section>
      <section className="flex gap-[12px] ">
        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#F0F2F5] ">
          <CiBellOn size={25} />
        </div>
        <Image src={profile} alt="" className="h-[40px] w-[40px] " />
      </section>
    </div>
  );
}

export default NavBar;
