"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import finance from "../../assets/finance.svg";
import chart from "../../assets/orders.svg";
import cart from "../../assets/cart.svg";
import home from "../../assets/home.svg";
import employees from "../../assets/users.svg";
import { PiUsers } from "react-icons/pi";
import profile from "../../assets/profile.png";
import { TbSettings } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Inner from "../SidebarComp/Inner";
import EmployeeC from "../SidebarComp/EmployeeC";
import ProductsC from "../SidebarComp/ProductsC";
function Sidebar() {
  const [emp, setEmp] = useState(false);
  return (
    <div className="h-screen relative -z-40 w-full py-[24px]  ">
      {/* Header */}
      <section className="px-[24px]">
        <Image src={logo} alt="" className="" />
      </section>

      {/* Nav */}
      <section className="h-[236px] w-[270px] flex flex-col px-2 overflow-x-hidden gap overflow-y-scroll border-b mt-[12px]   ">
        {/* Home */}
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px] bg-red-50  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={home} alt="" className="   " /> <p>Home</p>{" "}
          </div>
        </div>
        {/* Employees */}
        <EmployeeC />

        {/* Products */}
        <ProductsC />

        {/* Orders */}
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={chart} alt="" className={`opacity-60`} /> <p>Orders</p>{" "}
          </div>
        </div>
        {/* Finance */}
        <div
          className={`h-[44px] px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={finance} alt="" className="   " /> <p>Finance</p>{" "}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="absolute w-full bottom-2  ">
        <div className="w-full   px-[2px] flex flex-col justify-center items-center ">
          <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
            <TbSettings />
            <p className="text-[14px] font-normal ">Settings</p>
          </div>
          <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
            <RiCustomerServiceLine />
            <p className="text-[14px] font-normal ">Help Center</p>
          </div>
        </div>
        <div className="flex items-center  justify-between py-[12px] px-[16px] gap-2">
          <div className="flex items-center gap-[12px] justify-center ">
            <div>
              <Image
                src={profile}
                alt=""
                className="object-cover h-[40px] w-[40px] "
              />
              <div />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold ">David Fayemi</h4>
              <p className="text-[14px] text-[#475367] ">David@rayna.ui</p>
            </div>
          </div>
          <div>
            <FiLogOut size={20} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
