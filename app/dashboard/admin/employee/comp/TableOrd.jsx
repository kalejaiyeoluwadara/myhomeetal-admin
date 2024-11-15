"use client";
import React, { useState, useEffect } from "react";
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
import Loading from "@/app/dashboard/components/Loading";
import Filter from "@/app/dashboard/components/Filter";
import { filterDataByDate } from "@/utils/FilterByDate";
import { useGlobal } from "@/app/context";
function Table() {
  const [filt, setFilt] = useState("all time");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useGlobal();
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("server.myhomeetal.store/api/v1/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch Orders: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      // Filter out orders with status 'Not paid'
      const paidOrders = data.filter((order) => order.status !== "Not paid");
      setOrders(paidOrders.reverse());
    } catch (error) {
      console.error("An error occurred while fetching Orders:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredOrders = filterDataByDate(orders, filt);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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

  const currentData = filteredOrders.slice(
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
    <div className="w-auto relative col-span-2 bg-white overflow-hidden h-full rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      <section className="w-full flex items-center justify-between px-[16px]  h-[68px] ">
        <h2 className="font-semibold text-base ">Orders</h2>
        <Filter filt={filt} setFilt={setFilt} />
      </section>
      {/* Content */}
      <div className="w-full ">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            {currentData.map((d, id) => {
              return <TableData {...d} key={id} />;
            })}
          </>
        )}

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
