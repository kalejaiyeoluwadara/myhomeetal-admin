import React from "react";
import { FaPlus } from "react-icons/fa6";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">All Employees</h2>
        <p className="grey text-[16px] font-normal ">
          It’s a sunny day today, lets see how the business is doing!
        </p>
      </section>
      <section>
        <button className="h-[56px] text-[16px] font-semibold w-[161px] rounded-[8px] flex items-center justify-center gap-2 ">
          <FaPlus size={20} />
          Add employee
        </button>
      </section>
    </div>
  );
}

export default Welcome;
