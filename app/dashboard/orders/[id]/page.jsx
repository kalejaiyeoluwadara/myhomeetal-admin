import React from "react";
import Nav from "./Nav";
import { GoPeople } from "react-icons/go";
function Page({ params }) {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <h2 className="my-[33px] text-[24px] font-semibold text- ">
        Order Details - {params.id}
      </h2>
      <div className="h-[319px] w-full rounded-xl border bg-white p-6  ">
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
      <div className="h-[319px]  my-6 w-full rounded-xl border bg-white p-6  ">
        <h2 className="core ">Delivery Status</h2>
        {/* Option */}
        <div className="flex items-center justify-between mt-6 gap-4 h-[69px] w-full border-b py-[14px] border-[#F7F9FC] ">
          <div className="flex items-center   gap-4">
            <GoPeople />
            <div className="">
              <p className="text-[12px] text-[#667185] ">Status</p>
              <p className="text-[14px] text-c7 text-medium ">Pending</p>
            </div>
          </div>
          <p className="text-[14px] pointer ">Change status</p>
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
    </main>
  );
}

export default Page;
