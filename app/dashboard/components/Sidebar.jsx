"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import finance from "../../assets/finance.svg";
import home from "../../assets/home.svg";
import { PiUsers } from "react-icons/pi";
import Inner from "../SidebarComp/Inner";
import EmployeeC from "../SidebarComp/EmployeeC";
import ProductsC from "../SidebarComp/ProductsC";
import OrderC from "../SidebarComp/OrderC";
import Footer from "../SidebarComp/Footer";
import Link from "next/link";
function Sidebar() {
  const [emp, setEmp] = useState(false);
  return (
    <div className="h-screen relative border-r border-border -z-40 w-full py-[24px]  ">
      {/* Header */}
      <section className="px-[24px]">
        <Image src={logo} alt="" className="" />
      </section>

      {/* Nav */}
      <section className="h-[236px] w-[270px] flex flex-col px-2 overflow-x-hidden gap overflow-y-scroll no-scrollbar border-b mt-[12px]   ">
        {/* Home */}
        <div
          className={`h-[44px] grey pointer hover:bg-red-50 px-[16px] flex-shrink-0 py-[12px]   rounded-[4px] `}
        >
          <Link href={"/dashboard"}>
            {" "}
            <div className={`flex  gap-3 `}>
              <Image src={home} alt="" className="   " /> <p>Home</p>{" "}
            </div>
          </Link>
        </div>
        <EmployeeC />
        <ProductsC />
        <OrderC />
        {/* Finance */}
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={finance} alt="" className="   " /> <p>Finance</p>{" "}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Sidebar;
