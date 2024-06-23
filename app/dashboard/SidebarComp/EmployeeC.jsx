"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import employees from "../../assets/users.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useParams } from "@/utils/param";
import { useGlobal } from "@/app/context";
function EmployeeC() {
  const active = useParams();
  const [emp, setEmp] = useState(false);
  const { addEmployee, setAddEmployee } = useGlobal();
  return (
    <div className="flex cursor-pointer flex-col">
      <div
        onClick={() => {
          setEmp((prev) => !prev);
        }}
        className="flex hover:bg-red-50  pr-1 w-full justify-between items-center "
      >
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={employees} alt="" className={`opacity-60 `} />{" "}
            <p>Employees</p>{" "}
          </div>
        </div>
        <div> {!emp ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
      </div>
      {/* contents */}
      {emp && (
        <div>
          <Link href={"/dashboard/employees"}>
            <div
              className={` ${
                active === "/dashboard/employees" ? "bg-red-50" : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"All Employees"} />
            </div>
          </Link>
          <Link href={"/dashboard/employees/addemployee"}>
            <div
              className={` ${
                active === "/dashboard/employees/addemployee"
                  ? "bg-red-50"
                  : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Add Employees"} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmployeeC;
