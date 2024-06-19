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
            title: "Fullname",
            item: "Olamide Akintan",
          },
          {
            title: "Fullname",
            item: "Olamide Akintan",
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
    </main>
  );
}

export default Page;
