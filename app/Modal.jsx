"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import check from "@/app/assets/check.svg";
import { useGlobal } from "./context";
import Image from "next/image";
function Modal() {
  const { modalMessage, isSuccessful, isModalOpen, setIsModalOpen } =
    useGlobal();
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);
  return (
    <>
      {isModalOpen && (
        <div className="w-screen fixed z-40 top-4 left-0 center">
          <div className="w-auto px-6 h-[50px] gap-4 center bg-white shadow-md rounded-xl ">
            {isSuccessful ? (
              <Image className="" src={check} alt="" />
            ) : (
              <MdError className="text-primary  " />
            )}
            <p className="text-[14px] text-black ">{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
