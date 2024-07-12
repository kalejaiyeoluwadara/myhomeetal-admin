"use client";
import { useGlobal } from "@/app/context";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
function Welcome() {
  const { addEmployee, setAddEmployee } = useGlobal();
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">All Employees</h2>
        <p className="grey text-[16px] font-normal ">
          Overview of All Employees
        </p>
      </section>
      <section>
        <Link href={"/dashboard/employees/addemployee"}>
          <button
            onClick={() => {
              setAddEmployee(true);
            }}
            className=" text-[16px] w-[300px] h-[50px] font-medium p-4 rounded-[10px] flex items-center justify-center gap-2 "
          >
            <GoPeople size={20} />
            Add employee
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Welcome;
