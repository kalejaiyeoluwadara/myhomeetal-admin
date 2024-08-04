"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "../../../../assets/filter.svg";
import ex from "../../../../assets/export.svg";
import date from "../../../../assets/date.svg";
import Image from "next/image";
import profile from "../../../../assets/profile.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import TableData from "./TableData";
import useData from "@/hooks/useData";
function Table() {
  const { data, loading } = useData(
    "https://my-home-et-al-backend.onrender.com/api/v1/order"
  );
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  const currentData = data.slice(
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
  const [modal, setModal] = useState(false);
  const [filt, setFilt] = useState("this week");
  return (
    <div className="w-auto relative col-span-2 bg-white overflow-hidden h-full rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      <section className="w-full flex items-center justify-between px-[16px]  h-[68px] ">
        <h2 className="font-semibold text-base ">Orders</h2>
        <section
          onClick={() => {
            setModal((prev) => !prev);
          }}
          className="px-3 relative  h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] "
        >
          <Image src={filter} alt="" className="h-[13px] w-[13px] " />
          <p className="text-[#344054] pointer capitalize ">{filt}</p>
          {/* Modal */}
          {modal && (
            <div className=" h-auto w-[180px] flex flex-col items-start justify-center p-2  bg-white border top-12 right-3  rounded-xl absolute z-40  ">
              {[
                "today",
                "yesterday",
                "this week",
                "this month",
                "this quarter",
                "yearly",
                "all time",
              ].map((d, id) => {
                return (
                  <p
                    onClick={() => {
                      setFilt(d);
                      // setModal(!modal);
                    }}
                    key={id}
                    className=" w-full p-3 capitalize rounded-md hover:bg-red-50 pointer text-sm"
                  >
                    {d}
                  </p>
                );
              })}
            </div>
          )}
        </section>
      </section>
      {/* Content */}
      <div className="w-full ">
        {currentData.map((d, id) => {
          return <TableData {...d} key={id} />;
        })}

        {/* Footer */}
        <footer className="w-full absolute bottom-0 flex items-center justify-between px-4 h-[68px] ">
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
