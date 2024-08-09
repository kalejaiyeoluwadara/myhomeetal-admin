"use client";
import React, { useState } from "react";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
Data;
import Loading from "@/app/dashboard/components/Loading";
import Data from "./Data";
function TableAlert({ data, loading }) {
  const itemsPerPage = 7;
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

  return (
    <div className="w-auto relative col-span-2 bg-white overflow-hidden h-[568px] rounded-[10px] flex flex-col items-start justify-start ">
      {/* Content */}
      {loading ? (
        <Loading loading={loading} />
      ) : currentData.length > 0 ? (
        currentData.map((item, id) => {
          return (
            <Data
              _id={item?._id}
              images={item?.images}
              productTitle={item?.productTitle}
              key={id}
            />
          );
        })
      ) : (
        <p className="text-center text-xs font-medium w-full">
          Stock Alert is currently empty
        </p>
      )}

      <div className="w-full ">
        {/* Footer */}
        <footer className="w-full absolute bottom-0 flex items-center justify-between px-4 h-[68px] ">
          <div>
            <p className="font-semibold text-sm text-[#667185] ">
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
              className={`w-auto px-2 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 pointer rounded-[8px] text-[14px] ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <HiOutlineArrowLongLeft className="text-[#667185]" size={15} />
              <p className="text-[#344054] font-semibold text-xs ">Prev</p>
            </section>
            <section
              onClick={handleNextPage}
              className={`w-auto px-2 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 pointer rounded-[8px] text-[14px] ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <p className="text-[#344054] font-semibold text-xs ">Nxt</p>
              <HiOutlineArrowLongRight className="text-[#667185]" size={15} />
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TableAlert;
