"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "@/app/assets/filter.svg";
import ex from "@/app/assets/export.svg";
import Image from "next/image";
import Export from "../../components/Export";
import { useGlobal } from "@/app/context";
import axios from "axios"; // Import axios for making API requests

function Tableheader({ products, manipulate, setManipulate }) {
  const [list, setList] = useState("");
  const { toBeDeleted, setToBeDeleted, openModal, token } = useGlobal();
  const [loading, isLoading] = useState(false);
  const handleSearch = () => {
    const filteredProducts = list
      ? products.filter((product) => {
          const regex = new RegExp(list, "i"); // 'i' makes the search case-insensitive
          return regex.test(product.productTitle);
        })
      : products;

    setManipulate(filteredProducts);
    setList("");
  };

  const handleBulkDelete = async () => {
    if (toBeDeleted.length === 0) return;
    isLoading(true);
    console.log(toBeDeleted);

    try {
      const response = await axios.delete(
        "server.myhomeetal.store/api/v1/product/bulk-delete",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            productIds: toBeDeleted,
          },
        }
      );

      if (response.status === 200) {
        const updatedProducts = manipulate.filter(
          (product) => !toBeDeleted.includes(product._id)
        );
        setManipulate(updatedProducts);
        setToBeDeleted([]);
        openModal("Selected products deleted successfully!", true);
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
      openModal(
        "An error occurred while deleting products. Please try again.",
        false
      );
    } finally {
      isLoading(false);
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
            placeholder="Search here"
            className="w-full bg-transparent h-full outline-none "
          />
          <div
            onClick={handleSearch}
            className="text-[#667185] cursor-pointer hover:text-black bg-white "
          >
            <IoSearch size={20} />
          </div>
        </section>
        {/* <section className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh text-[14px] font-[500] ">
          <Image src={filter} alt="Filter" className="h-[13px] w-[13px]" />
          <p className="text-[#344054]">Filter</p>
        </section> */}
      </div>
      <div className="flex w-full justify-end items-center gap-2">
        {toBeDeleted.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className={`capitalize w-[300px] py-3 rounded-md ${
              loading ? "bg-gray-400" : "bg-primary hover:bg-red-700 text-white"
            } `}
          >
            delete all selected
          </button>
        )}
        <Export data={products} />
      </div>
    </section>
  );
}

export default Tableheader;
