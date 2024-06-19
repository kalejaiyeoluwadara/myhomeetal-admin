import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">Transaction Overview</h2>
      </section>
      <section className="flex gap-4">
        <button className=" text-[16px] text-primary border-[1.5px] border-primary bg-white font-semibold py-2 px-3 rounded-[8px] flex items-center justify-center gap-2 ">
          <FaPlus size={20} />
          Add money
        </button>
        <button className=" text-[16px] font-semibold py-2 px-3 rounded-[8px] flex items-center justify-center gap-2 ">
          <FaMinus size={20} />
          withdraw
        </button>
      </section>
    </div>
  );
}

export default Welcome;
