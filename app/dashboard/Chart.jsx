import React from "react";

function Chart() {
  return (
    <div className="w-full h-[300px] grid grid-cols-3 gap-[16px] ">
      <section className="h-full w-auto border  rounded-[16px] col-span-2 "></section>
      <section className="h-full w-auto border  rounded-[16px]  "></section>
    </div>
  );
}

export default Chart;
