"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import filter from "@/app/assets/filter.svg";
import ex from "@/app/assets/export.svg";
import Image from "next/image";
import Export from "../../components/Export";
import { useGlobal } from "@/app/context";
import axios from "axios";
import ConfirmDelete from "@/app/ConfirmDelete";

function Tableheader({
  products,
  manipulate,
  setManipulate,
  currentPage,
  productsPerPage,
}) {
  const [list, setList] = useState("");
  const { toBeDeleted, setToBeDeleted, openModal, token } = useGlobal();
  const [loading, isLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [opened, setOpened] = useState(false);

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

    try {
      const response = await axios.delete(
        "https://api.myhomeetal.store/api/v1/product/bulk-delete",
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
        setOpened(false);
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

  const handleSelectAll = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts =
      manipulate.length > 0 ? manipulate : products.slice(startIndex, endIndex);

    if (selectAll) {
      setToBeDeleted([]);
    } else {
      const currentProductIds = currentProducts.map((product) => product._id);
      setToBeDeleted(currentProductIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <section className="w-full flex items-center justify-between px-[16px] bg-white h-[68px] ">
      {/* search and filter button */}
      <ConfirmDelete
        handleClick={handleBulkDelete}
        opened={opened}
        isLoading={loading}
        setOpened={setOpened}
      />
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
      </div>
      <div className="flex w-full px-3 justify-end items-center gap-2">
        <button
          onClick={handleSelectAll}
          className="capitalize w-[120px] py-3 rounded-md bg-primary hover:bg-red-700 text-white"
        >
          {selectAll ? "Deselect All" : "Select All"}
        </button>
        {toBeDeleted.length > 0 && (
          <button
            onClick={() => setOpened(true)}
            className={`capitalize w-[190px] py-3 rounded-md ${
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
