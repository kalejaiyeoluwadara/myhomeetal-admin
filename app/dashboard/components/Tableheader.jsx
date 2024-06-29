import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../assets/filter.svg";
import ex from "../../assets/export.svg";
import Image from "next/image";

function Tableheader({ products, setAdmins, manipulate, setManipulate }) {
  const [list, setList] = useState("");

  const handleSearch = () => {
    if (list === "") {
      setManipulate(admins);
    } else {
      const filteredAdmins = admins.filter((admin) =>
        admin.username.toLowerCase().includes(list.toLowerCase())
      );
      setManipulate(filteredAdmins);
      setList("");
    }
  };

  return (
    <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
      {/* search and filter button */}
      <div className="flex gap-2">
        <section className="sh w-[291px] h-full border flex items-center justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
          <input
            value={list}
            onChange={(e) => setList(e.target.value)}
            type="text"
            placeholder="Search here..."
            className="w-full bg-transparent h-full outline-none "
          />
          <button onClick={handleSearch} className="text-[#667185] bg-white ">
            <IoSearch size={20} />
          </button>
        </section>
        {/* <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] ">
          <Image src={filter} alt="Filter" className="h-[13px] w-[13px]" />
          <p className="text-[#344054]">Filter</p>
        </section> */}
      </div>
      <div className="flex w-full justify-end items-center gap-2">
        <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh pointer text-[14px] font-[500] ">
          <Image src={ex} alt="Export data" />
          <p className="text-[#344054]">Export data</p>
        </section>
      </div>
    </section>
  );
}

export default Tableheader;
