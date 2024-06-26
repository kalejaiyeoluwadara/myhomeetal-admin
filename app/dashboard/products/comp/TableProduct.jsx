"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "@/app/assets/filter.svg";
import ex from "@/app/assets/export.svg";
import date from "@/app/assets/date.svg";
import Image from "next/image";
import profile from "@/app/assets/profile.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  HiOutlineArrowLongRight,
  HiOutlineArrowLongLeft,
} from "react-icons/hi2";
import TableData from "./TableData";
import { useGlobal } from "@/app/context";
import TableHeader from "./TableHeader";
function Table() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [manipulate, setManipulate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { totalProd, setTotalProd } = useGlobal();
  useEffect(() => {
    setManipulate(products);
  }, [products]);
  const totalPages = Math.ceil(manipulate.length / itemsPerPage);
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

  const currentData = manipulate.slice(
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/product/all-products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      // console.log(data);
      setTotalProd(data.length);
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full overflow-hidden h-auto rounded-[10px] flex flex-col items-start justify-start border ">
      {/* Header */}
      {/* <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
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
        </div>
      </section> */}
      <TableHeader
        manipulate={manipulate}
        setManipulate={setManipulate}
        products={products}
      />
      {/* Content */}
      <div className="w-full ">
        <div className="w-full h-[44px] px-3 text-[12px] font-medium pt-1 items-center justify-center grid grid-cols-9 ">
          <p className=" col-span-2 ">Product name</p>
          <p className="col-span-2">SKU</p>
          <p>Price</p>
          <p className="">Stock Level </p>
          <p className="">Category</p>
          <p className="pl-2">Status</p>
          <p className="">Action</p>
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
              productTitle,
              price,
              category,
              description,
              brand,
              images,
            } = d;
            return (
              <TableData
                key={d._id}
                category={category}
                price={price}
                productTitle={productTitle}
                description={description}
                brand={brand}
                _id={d._id}
                images={images}
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
