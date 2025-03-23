"use client";
import React from "react";
import Image from "next/image";
import { useGlobal } from "@/app/context";
import { ApiRoutes } from "@/app/api/apiRoute";

function ItemCard({
  brand,
  description,
  price,
  productTitle,
  images,
  id,
  fetchCategory,
}) {
  const img = images[0];
  const { openModal, token } = useGlobal();
  const handleDelete = async () => {
    try {
      const response = await fetch(`${ApiRoutes.BASE_URL}product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Product deleted!");
        openModal("Product deleted successfully.", true);
        fetchCategory();
      } else {
        const errorData = await response.json();
        console.error("Error deleting data:", errorData);
        openModal("Error encountered, product does not exist.", false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      openModal("Error encountered.", false);
    }
  };

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  return (
    <div className="border relative w-full flex px-6 gap-20 h-fit py-4 rounded-xl items-center justify-start ">
      <div className="h-fit relative w-[173px] center bg-white flex-shrink-0 rounded-xl ">
        <img src={img} alt="" className=" object-cover h-[131px] w-[131px] " />
      </div>
      <div className="text[16px] space-y-4 font-light ">
        <p className="text-wrap">Product Name: {productTitle}</p>
        <p className="text-wrap">Prod Description: {description}</p>
        <p>Prod Price: ₦{formatNumberWithCommas(price)}</p>
        <p>Stock Level: {"-"}</p>
        <p>Brand: {brand}</p>

        <p
          onClick={handleDelete}
          className="absolute bottom-4 right-4 cursor-pointer text-[#FF0000] "
        >
          Remove Product
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
