"use client";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
function Modal({ isModalOpen, setIsModalOpen }) {
  const [modalMessage, setModalMessage] = useState(
    "Product Uploaded Successfully"
  );
  return (
    <main>
      {isModalOpen && (
        <div className="w-screen fixed z-40 top-10 left-0 center">
          <div className="w-auto px-6 h-[60px] gap-4 center bg-white rounded-xl ">
            <FaCheckCircle className=" text-green-500 " size={30} />
            <p className="text-[16px] text-black ">{modalMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Modal;
