"use client";
import { useGlobal } from "@/app/context";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import logouts from "@/app/assets/logout.svg";
import cancel from "@/app/assets/cancel.svg";
import Image from "next/image";
import Link from "next/link";
function UpdateOrder({ id, setModal, modal, fetchOrders }) {
  const { token, openModal } = useGlobal();
  const [loading, setLoading] = useState(false);
  const updateOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-u0m7.onrender.com/api/v1/order/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId: id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to updating order: ${response.status} ${response.statusText} - ${errorData.message}`
        );
        openModal("Status Update Failed", false);
      }

      const data = await response.json();
      console.log(data);
      setModal(false);
      openModal("Updated Status Successfully", true);
      fetchOrders();

      // Fetch the product details for each order item
    } catch (error) {
      console.error("An error occurred while fetching order:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed bg-black bg-opacity-40 z-50 w-screen center h-screen  top-0 right-0 ">
      <div className="w-[400px] h-[400px] p-[40px] bg-white rounded-2xl flex items-center justify-center flex-col ">
        <div className="h-[68px]  w-[68px] bg-[#FFC5C6] rounded-full " />
        <h2 className="text-2xl  mt-4 font-bold text-center w-[277px]  ">
          Are you sure you want Update Status?
        </h2>
        <p className="text-center text-[#292929] mt-4 text-sm font-light w-[277px]  ">
          Once the status is updated, the process cannot be reversed.
        </p>
        <div
          onClick={() => {
            updateOrder();
          }}
          className="w-full cursor-pointer"
        >
          {" "}
          <div
            className={`${
              loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
            }  text-white mt-6 mb-2 gap-2 text-[16px] center w-full h-[44px] rounded-[8px] `}
          >
            <Image src={logouts} alt="" className="" />
            <p>Yes, Update</p>
          </div>
        </div>
        <div
          onClick={() => {
            setModal(false);
          }}
          className="bg-red-50 text-black cursor-pointer gap-2 center w-full h-[44px] rounded-[8px] "
        >
          <Image src={cancel} className="" alt="" />
          No, Cancel
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;
