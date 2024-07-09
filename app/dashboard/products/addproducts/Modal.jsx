"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

function Modal({ isModalOpen, setIsModalOpen, modalMessage }) {
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 3000); // close after 3 seconds

      // Clean up the timer if the component is unmounted or if isModalOpen changes
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <main>
      {isModalOpen && (
        <div className="w-screen fixed z-40 top-10 left-0 center">
          <div className="w-auto px-6 h-[60px] gap-4 center bg-white rounded-xl ">
            {modalMessage === "Product Uploaded Successfully" ? (
              <FaCheckCircle className=" text-green-500 " size={30} />
            ) : (
              <MdError className="text-primary" />
            )}
            <p className="text-[16px] text-black">{modalMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Modal;
