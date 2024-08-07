"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import sport from "../../../assets/sport.svg";
import { IoMdMore } from "react-icons/io";
import Link from "next/link";

function TableData({
  _id,
  productTitle,
  price,
  category,
  description,
  brand,
  images,
}) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => {
        setModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [modal]);
  const img = images[0];

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `https://my-home-et-al-backend.onrender.com/api/v1/product/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("Product deleted!");
  //     console.log("Response from server:", data);
  //     alert("Product Deleted! Refresh Page");
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <div className="w-full h-[72px] border-b bg-white text-[#344054] text-[14px] px-3 items-center justify-center grid pt-2 grid-cols-8 ">
      <div className="flex w-auto col-span-2 items-center justify-start gap-2 truncate">
        <img
          className=" h-[40px] bg-gray-200 w-[40px] rounded-full object-cover "
          alt=""
          src={img}
        />
        <p className="text-[14px] font-medium text-[#101928] ">
          {productTitle}
        </p>
      </div>
      {/* <p className=" col-span-2 truncate ">-</p> */}
      <p>#{formatNumberWithCommas(price)}</p>
      <p className=" ">-</p>
      <p className="truncate col-span-2 ">{category}</p>
      <div className="px-2 ">
        <p className="px-3 font-medium bg-green-200 rounded-[12px] py-[2px] flex items-center justify-center text-green-600 ">
          active
        </p>
      </div>
      <div className="flex items-center relative justify-center ">
        <Link href={`/dashboard/products/${_id}`}>
          {" "}
          <p className="w-[32px] h-[32px] pointer border rounded-[8px] flex items-center justify-center ">
            <IoMdMore size={20} />{" "}
          </p>
        </Link>
        {/* {modal && (
          <div className="h-auto border bg-white flex flex-col items-start justify-start sh absolute top-6 -right-2 z-40 center rounded-md w-[120px] px-1 py-2 text-[14px] ">
            <Link href={`/dashboard/products/${_id}`}>
              <p className="w-full h-[30px] px-2 pointer hover:bg-red-50 center rounded-md ">
                View Product
              </p>
            </Link>

            <p
              onClick={() => {
                handleDelete(_id);
                setModal(false);
              }}
              className="w-full h-[30px] pointer hover:bg-red-50 center rounded-md "
            >
              Delete Product
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TableData;
