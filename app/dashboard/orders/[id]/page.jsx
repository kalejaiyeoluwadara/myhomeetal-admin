"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import { GoPeople } from "react-icons/go";

const Modal = ({ setStatus }) => {
  return (
    <div className="absolute w-[280px] px-4 py-5 h-[288px] rounded-[10px] bg-white border top-10 right-8 ">
      <p>Change Status</p>
      <div className="w-full flex flex-col gap-4  mt-4 ">
        <p
          onClick={() => {
            setStatus("Pending");
          }}
          className="w-full pointer shadowt center bg-[#FFF1F1] text-[#D54A4C] rounded-[10px] h-[60px] "
        >
          Pending
        </p>
        <p
          onClick={() => {
            setStatus("Ongoing");
          }}
          className="w-full pointer shadowt center bg-[#E3EFFC] text-[#04326B] rounded-[10px]  h-[60px] "
        >
          Ongoing
        </p>
        <p
          onClick={() => {
            setStatus("Delivered");
          }}
          className="w-full pointer shadowt center bg-[#E7F6EC] text-[#1F7C3F] rounded-[10px]  h-[60px] "
        >
          Delivered
        </p>
      </div>
    </div>
  );
};
function Page({ params }) {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <h2 className="my-[33px] text-[24px] font-semibold text- ">
        Order Details - {params.id}
      </h2>
      <div className="h-[319px]  w-full rounded-xl border bg-white p-6  ">
        <h3 className="text-base mb-[34px] font-semibold ">Order Summary</h3>
        {[
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
        ].map((d, id) => {
          return (
            <div
              key={id}
              className="flex h-[69px] border-b border-[#F7F9FC] p-[14px] gap-4 items-center justify-start "
            >
              <div>
                <GoPeople size={20} className="text-[#98A2B3]" />
              </div>
              <div className=" w-full ">
                <p className="text-[12px] font-normal text-[#667185]  ">
                  {d.title}
                </p>
                <p className="text-[14px] w-[93%] truncate font-medium text-black ">
                  {d.item}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* more info */}
      <div className="h-[300px] relative  my-6 w-full rounded-xl border bg-white p-6  ">
        <h2 className="core ">Delivery Status</h2>
        {/* Option */}
        <div className="flex items-center justify-between mt-6 gap-4 h-[69px] w-full border-b py-[14px] border-[#F7F9FC] ">
          <div className="flex items-center   gap-4">
            <GoPeople />
            <div className="">
              <p className="text-[12px] text-[#667185] ">Status</p>
              <p
                className={`text-[14px] ${
                  status === "Pending"
                    ? "text-c7"
                    : status === "Ongoing"
                    ? "text-[#04326B]"
                    : "text-[#1F7C3F]"
                } text-medium `}
              >
                {status}
              </p>
            </div>
          </div>
          <div className="relative">
            <p className="text-[14px] pointer ">Change status</p>
            <Modal setStatus={setStatus} />
          </div>
        </div>
        <div className="flex items-center gap-4 h-[69px] w-full border-b py-[14px] border-[#F7F9FC] ">
          <div className="flex items-center   gap-4">
            <GoPeople />
            <div className="">
              <p className="text-[12px] text-[#667185] ">Delivery Address</p>
              <p className="text-[14px] text-medium ">
                20, Livery street, Ikeja, Lagos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="center w-full mt-[62px]  ">
        <button className="w-[435px] core rounded-xl flex items-center justify-center h-[63px]  ">
          Generate QR
        </button>
      </div>
    </main>
  );
}

export default Page;
