"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useGlobal } from "./context";
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
          <div className="w-auto px-6 h-[60px] gap-4 center bg-white rounded-xl ">
            {isSuccessful ? (
              <FaCheckCircle className=" text-green-500 " size={30} />
            ) : (
              <MdError className="text-primary  " />
            )}
            <p className="text-[16px] text-black ">{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
