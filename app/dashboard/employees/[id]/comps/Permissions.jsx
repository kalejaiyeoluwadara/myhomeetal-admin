import React from "react";
import { GoPeople } from "react-icons/go";
import Pill from "./Pill";
function Permissions() {
  const data = [
    "User Management",
    "product Management",
    "Order Management",
    "Vendor Management",
    "Finance Management",
    "Analytics & Reporting",
    "Review and Feedback",
  ];
  return (
    <div className="h-[461px] w-auto border flex flex-col rounded-xl gap-[24px] bg-white p-6 ">
      <div className="flex justify-between items-center">
        <h2 className=" text-[16px] font-semibold ">Personal information</h2>
        <div className="border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold">
          Edit
        </div>
      </div>

      <section className="flex flex-col w-full">
        {data.map((d, id) => {
          return (
            <div className="flex h-[52px] border-b border-[#F7F9FC] items-center justify-start gap-4">
              <p className="text-[14px] font-medium ">{d}</p>
              <Pill />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Permissions;