import Link from "next/link";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import Nav from "./Nav";
import Image from "next/image";

import { SiHackthebox } from "react-icons/si";
import { IoAnalyticsOutline } from "react-icons/io5";
import TaksComp from "./comps/TaksComp";
import Container from "./comps/Container";
import Permissions from "./comps/Permissions";
import girl from "../../../assets/girl.svg";
function Page({ params }) {
  const pi = [
    {
      title: "Fullname",
      item: "Olamide Akintan",
    },
    {
      title: "Email Address",
      item: "OlamideAkintan@myhomeetal.com",
    },
    {
      title: "Phone Number",
      item: "+234 9046505356",
    },
    {
      title: "Date of birth",
      item: "14-September-2020",
    },
    {
      title: "Gender",
      item: "Female",
    },
  ];
  const ei = [
    {
      title: "Joining Date",
      item: "14-September-2020",
    },
    {
      title: "Department",
      item: "Product Development",
    },
    {
      title: "Employment Type",
      item: "Full-Time Employment",
    },
    {
      title: "Salary Details",
      item: "₦250,000.00",
    },
    {
      title: "Status",
      item: "Active",
    },
  ];
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <div className="w-full border px-[48px] py-[40px] flex items-start justify-between bg-white h-[202px] rounded-xl mt-[58px] mb-[24px] ">
        <section className="flex items-center gap-6 ">
          <div className="h-[120px] w-[120px] rounded-full bg-gray-200 ">
            <Image className="" alt="" src={girl} />
          </div>
          <div className="space-y-3">
            <h2 className=" text-[28px] font-semibold ">Olamide Akintan</h2>
            <div className="flex text-[16px] ">
              {" "}
              <p className=" font-semibold text-[#475367] ">HR Manager</p>{" "}
              <p className="ml-[29px] text-[#475367] ">ID3435854649</p>{" "}
              <p className="text-primary ml-2 ">Copy</p>
            </div>
            <p className="text-[#475367]">OlamideAkintan@myhomeetal.com</p>
          </div>
        </section>
        <section className="space-x-4 flex ">
          <div className=" border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold ">
            Deactivate Account
          </div>
          <div className=" border px-4 py-2 border-border bg-[#667185] rounded-[8px] text-white text-[14px] font-semibold ">
            Deactivate Account
          </div>
        </section>
      </div>

      {/* Boxes */}
      <div className="grid gap-4 grid-cols-3 ">
        <TaksComp title={" Tasks Completed"} data={"45,823"} />
        <TaksComp title={"Pending Task"} data={"45,823"} />
        <TaksComp title={"Performance Rate"} data={"45,823"} />
        <Container title={"Personal information"} data={pi} />
        <Container title={"Employment Information"} data={ei} />
        <Permissions />
      </div>
    </main>
  );
}

export default Page;
