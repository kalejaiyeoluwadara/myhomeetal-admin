import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
function Nav() {
  return (
    <div className="flex text-[18px] font-medium items-center justify-start ">
      <section className="flex center ">
        <Link href={"/dashboard/employees"}>
          <section className="w-[30px] flex items-center justify-center h-[30px] bg-white border  pointer rounded-md  ">
            <HiArrowLeft className="text-black" size={15} />
          </section>
        </Link>
        <p className="ml-[12px] text-[#667185] mr-4">Go Back</p>
      </section>

      <section className="flex gap-2  ">
        <Link href="/dashboard/employees">
          <p className="text-[#98A2B3]">All Employee</p>
        </Link>{" "}
        <p className="text-[#98A2B3]"> / </p>{" "}
        <p className="text-[#C70E10]">Employee Details</p>
      </section>
    </div>
  );
}

export default Nav;
