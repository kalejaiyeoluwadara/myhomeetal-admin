import React from "react";

function Status() {
  const data = [
    {
      title: "Total employee",
      count: "200",
    },
    {
      title: "Active employee",
      count: "175",
    },
    {
      title: "Employee on leave",
      count: "0",
    },
  ];
  return (
    <main className="w-full grid gap-2 mt-[45px]  mb-[24px] grid-cols-3">
      {data.map((d, id) => {
        return (
          <div className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-4 gap-8   border border-border bg-white">
            <div className="flex gap-3 center">
              <div className="h-[32px] rounded-[8px] bg-[#FFF1F1] w-[32px] "></div>
              <p className="grey">{d.title}</p>
            </div>
            <div>
              <p className="text-[32px] font-semibold  ">{d.count}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default Status;
