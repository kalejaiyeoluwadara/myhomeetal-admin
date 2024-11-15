"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import ex from "../../../assets/export.svg";
import dateimg from "../../../assets/date.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import CalendarComponent from "../../components/CalendarComponent";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import TableData from "./TableData";
import { useGlobal } from "@/app/context";
import Filter from "../../components/Filter";
import { filterDataByDate } from "@/utils/FilterByDate";
import Export from "../../components/Export";
import Loading from "../../components/Loading";
function Table() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useGlobal();
  const [filt, setFilt] = useState("all time");

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
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [cal, setCal] = useState(false);
  const filteredOrders = filterDataByDate(orders, filt);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const [date, setDate] = useState(new Date());

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
    <div className="w-full overflow-hidden h-auto rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
        {/* search and filter button */}
        <div className="flex gap-2">
          <section className="sh w-[291px] h-full  border flex items-start justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
            <IoSearch className="text-[#667185]" size={20} />
            <input
              type="text"
              placeholder="Search here"
              className="w-full bg-transparent h-full outline-none "
            />
          </section>
          <Filter filt={filt} setFilt={setFilt} />
        </div>
        <div className="flex  w-full  justify-end items-center gap-2">
          <Export data={orders} />
          <section className="w-auto  relative px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 sh pointer rounded-[8px] text-[14px]  ">
            <Image src={dateimg} alt="" className="" />
            <p onClick={() => setCal(true)} className="text-[#344054]] ">
              Select dates
            </p>
            <IoIosArrowDown
              onClick={() => setCal(true)}
              className="text-[#667185]"
              size={20}
            />
            <CalendarComponent
              date={date}
              setDate={setDate}
              cal={cal}
              setCal={setCal}
            />
          </section>
        </div>
      </section>
      {/* Content */}
      <div className="w-full ">
        <div className="w-full h-[44px] px-3 text-[12px] font-medium pt-1 items-center justify-center grid grid-cols-9 ">
          <p className=" col-span-2 ">Order Id</p>
          <p className="col-span-2">Customer Name</p>
          <p className="col-span-2">Order Date</p>
          <p className="">Total Amount</p>
          <p className="">Status</p>
          <p className="pl-2">Action</p>
        </div>
        {loading ? (
          <Loading loading={loading} />
        ) : currentData.length > 0 ? (
          currentData.map((d, id) => {
            return (
              <TableData
                date={d?.date}
                address={d?.address}
                deliveryMethod={d?.deliveryMethod}
                orderId={d?.orderId}
                orderPrice={d?.orderPrice}
                status={d?.status}
                user={d?.user}
                _id={d?._id}
                key={id}
              />
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500 py-4">
            No orders found for the selected period.
          </p>
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
