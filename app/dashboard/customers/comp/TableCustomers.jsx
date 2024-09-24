"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../../assets/filter.svg";
import ex from "../../../assets/export.svg";
import date from "../../../assets/date.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import TableData from "./TableData";
import useData from "@/hooks/useData";
function Table() {
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: customers,
    loading,
    error,
    setdata: setCustomers,
  } = useData(
    "https://my-home-et-al-backend-2.onrender.com/api/v1/user/all-users"
  );
  const totalPages = Math.ceil(customers.length / itemsPerPage);

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

  const currentData = customers
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
        {/* search and filter button */}
        <div className="flex gap-2">
          <section className="sh w-[291px] h-full  border flex items-start justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
            <input
              type="text"
              placeholder="Search here"
              className="w-full bg-transparent h-full outline-none "
            />
            <IoSearch
              className="text-[#667185] hover:text-black cursor-pointer "
              size={20}
            />
          </section>
          {/* <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] ">
            <Image src={filter} alt="" className="h-[13px] w-[13px] " />
            <p className="text-[#344054]">Filter</p>
          </section> */}
        </div>
        <div className="flex  w-full  justify-end items-center gap-2">
          <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh pointer text-[14px] font-[500] ">
            <Image src={ex} alt="" className=" " />
            <p className="text-[#344054]  ">Export data</p>
          </section>
        </div>
      </section>
      {/* Content */}
      <div className="w-full ">
        <div className="w-full h-[44px] px-3 text-[12px] font-medium pt-1 items-center justify-center grid grid-cols-8 ">
          <p className=" col-span-2 ">Customer Name</p>
          <p className=" col-span-2">Email Address </p>
          <p className="text-center ">Refferal code</p>
          <p className="text-center">Points</p>
          <p className="col-span-2 text-center  ">Verified</p>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : currentData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          currentData.map((d, id) => {
            const {
              _id,
              firstname,
              lastname,
              email,
              points,
              referralCode,
              isVerified,
            } = d;
            return (
              <TableData
                key={d._id}
                firstname={firstname}
                lastname={lastname}
                email={email}
                points={points}
                referralCode={referralCode}
                isVerified={isVerified}
                _id={d._id}
              />
            );
          })
        )}

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
