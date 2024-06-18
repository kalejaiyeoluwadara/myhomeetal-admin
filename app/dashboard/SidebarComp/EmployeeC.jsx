"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import employees from "../../assets/users.svg";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
function EmployeeC() {
  const [emp, setEmp] = useState(false);
  return (
    <div className="flex  flex-col">
      <div
        onClick={() => {
          setEmp((prev) => !prev);
        }}
        className="flex w-full justify-between items-center "
      >
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={employees} alt="" className={`opacity-60 `} />{" "}
            <p>Employees</p>{" "}
          </div>
        </div>
        <div>
          {" "}
          <IoIosArrowDown />{" "}
        </div>
      </div>
      {/* contents */}
      {emp && (
        <div>
          <Inner name={"All Employees"} />
          <Inner name={"Add Employees"} />
        </div>
      )}
    </div>
  );
}

export default EmployeeC;
