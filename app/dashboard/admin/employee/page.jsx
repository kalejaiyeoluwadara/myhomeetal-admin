import React from "react";
import Welcome from "./comp/Welcome";
import { GoPeople } from "react-icons/go";
import Table from "./comp/TableOrd";
import StockAlert from "./comp/StockAlert";

function Page() {
  const data = [
    {
      title: "Today Sales",
      item: "20,000",
    },
    {
      title: "Weekly Sales",
      item: "175,000",
    },
  ];
  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <section className=" mt-6 gap-6 grid grid-cols-2 w-full ">
        {data.map((d, id) => {
          return (
            <div
              key={id}
              className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-6 gap-8   border border-border bg-white"
            >
              <div className="flex gap-3 center">
                <div className="h-[32px] rounded-[8px] center bg-[#FFF1F1] text-[#FF6567] w-[32px] ">
                  <GoPeople size={15} />
                </div>
                <p className="grey">{d.title}</p>
              </div>
              <div>
                <p className="text-[32px] font-semibold  ">{d.item}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-3 mt-6 w-full h-[568px] gap-4">
        <Table />
        <StockAlert />
      </section>
    </main>
  );
}

export default Page;
