"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
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
import { PiHashBold } from "react-icons/pi";
import { useParams } from "@/utils/param";
import { useGlobal } from "@/app/context";
function Sidebar() {
  const active = useParams(); // Get the current pathname
  const { role, setRole } = useGlobal();
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  return (
    <div className="h-screen relative border-r border-border -z-40 w-full py-[24px]">
      {/* Header */}
      <section className="px-[24px]">
        <Image src={logo} alt="" className="" />
      </section>

      {/* Nav */}
      <section className="h-[50%] w-[270px] flex flex-col px-2 overflow-x-hidden gap overflow-y-scroll no-scrollbar border-b pb-4 mt-[12px]">
        {/* Home */}
        <div
          className={`h-[44px] grey pointer hover:bg-red-50 ${
            active === "/dashboard" || active === "/dashboard/admin/employee"
              ? "bg-red-50"
              : "bg-white"
          } px-[16px] flex-shrink-0 py-[12px] rounded-[4px]`}
        >
          <Link href={"/dashboard"}>
            <div className={`flex gap-3`}>
              <Image src={home} alt="" className="" />
              <p>Home</p>
            </div>
          </Link>
        </div>
        {role === "Super Admin" && <EmployeeC />}
        <ProductsC />
        <OrderC />
        {/* Finance */}
        {role === "Super Admin" && (
          <Link href={"/dashboard/finance"}>
            <div
              className={`h-[44px] hover:bg-red-50 px-[16px] flex-shrink-0 py-[12px] rounded-[4px] ${
                active === "/dashboard/finance" ? "bg-red-50" : "bg-white"
              }`}
            >
              <div className={`flex grey gap-3`}>
                <Image src={finance} alt="" className="" />
                <p>Finance</p>
              </div>
            </div>
          </Link>
        )}

        {/* Customer */}
        <Link href={"/dashboard/customers"}>
          <div
            className={`h-[44px] hover:bg-red-50 px-[16px] flex-shrink-0 py-[12px] rounded-[4px] ${
              active === "/dashboard/customers" ? "bg-red-50" : "bg-white"
            }`}
          >
            <div className={`flex grey gap-3`}>
              <PiHashBold size={20} className="grey" />
              <p>Customers</p>
            </div>
          </div>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default Sidebar;
