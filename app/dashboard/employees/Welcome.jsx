"use client";
import { useGlobal } from "@/app/context";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

function Welcome() {
  const { addEmployee, setAddEmployee } = useGlobal();
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">All Employees</h2>
        <p className="grey text-[16px] font-normal ">
          It’s a sunny day today, lets see how the business is doing!
        </p>
      </section>
      <section>
        <button
          onClick={() => {
            setAddEmployee(true);
          }}
          className=" text-[16px] font-semibold p-4 rounded-[8px] flex items-center justify-center gap-2 "
        >
          <FaPlus size={20} />
          Add employee
        </button>
      </section>
    </div>
  );
}

export default Welcome;
