"use client";
import { useGlobal } from "@/app/context";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
function CheckMark({ product }) {
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={() => {
        setIsActive((prev) => !prev);
      }}
      className={`h-4 w-4 cursor-pointer transition-all duration-700 ease-in-out flex items-center justify-center absolute left-3 rounded-md  ${
        isActive ? "bg-blue-500 border-none" : "bg-white border border-gray-800"
      } `}
    >
      {isActive && <FaCheck className="text-white" size={10} />}
    </div>
  );
}

export default CheckMark;
