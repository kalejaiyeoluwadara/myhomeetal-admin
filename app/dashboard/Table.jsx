"use client";
import React, { useState } from "react";
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
import Tableheader from "./components/Tableheader";
import { useGlobal } from "../context";
function Table() {
  const { admins, setAdmins } = useGlobal();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentData = admins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="w-full overflow-hidden h-auto rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      <Tableheader />
      {/* Content */}
      <div className="w-full ">
        <div className="w-full h-[44px] px-3 text-[12px] font-medium pt-1 items-center justify-center grid grid-cols-8 ">
          <p className=" col-span-2 ">Name</p>
          <p className="">ID</p>
          <p className="col-span-2">Email</p>
          <p className="">Phone No</p>
          <p className="pl-2">Status</p>
          <p className="w-[20px]"></p>
        </div>
        <div className="w-full">
          {currentData.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No data available</p>
            </div>
          ) : (
            currentData.map((d, id) => {
              return (
                <TableData
                  username={d.username}
                  email={d.email}
                  role={d.role}
                  _id={d?.employee_id}
                  key={d._id}
                  phone_no={d?.phone_no}
                />
              );
            })
          )}
        </div>

        {/* Footer */}
        <footer className="w-full flex items-center justify-between px-4 h-[68px] bg-white">
          <div>
            <p className="font-semibold text-[#667185] ">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex text-[#98A2B3] gap-2">
            {getPageNumbers().map((page, index) => (
              <p
                key={index}
                className={`cursor-pointer ${
                  currentPage === page
                    ? "text-[#ED2224] rounded-md bg-[#FFF1F1] p-2"
                    : " text-[#98A2B3] p-2 "
                } ${page === "..." ? "pointer-events-none" : ""}`}
                onClick={() => {
                  if (page !== "...") setCurrentPage(page);
                }}
              >
                {page}
              </p>
            ))}
          </div>
          <div className="flex gap-2">
            <section
              onClick={handlePreviousPage}
              className={`w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 pointer rounded-[8px] text-[14px] ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <HiOutlineArrowLongLeft className="text-[#667185]" size={20} />
              <p className="text-[#344054] font-semibold ">Previous</p>
            </section>
            <section
              onClick={handleNextPage}
              className={`w-auto px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 pointer rounded-[8px] text-[14px] ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
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
