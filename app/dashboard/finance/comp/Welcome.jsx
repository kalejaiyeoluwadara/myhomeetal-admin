import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">Transaction Overview</h2>
      </section>
      <section className="flex gap-4">
        <button className=" text-base font-semibold py-4 px-6 rounded-[99px] flex items-center justify-center gap-2 ">
          Withdraw
        </button>
      </section>
    </div>
  );
}

export default Welcome;
