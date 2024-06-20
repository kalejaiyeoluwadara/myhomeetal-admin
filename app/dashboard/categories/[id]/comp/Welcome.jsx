import React from "react";
import { BsChevronDown } from "react-icons/bs";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section className="flex gap-4 pointer ">
        <h2 className="text-[24px] font-semibold ">My Phone & Tablet</h2>
      </section>
      <button className="px-4 text-[16px] py-2 flex items-center justify-center font-semibold rounded-[8px] ">
        Delete Category
      </button>
    </div>
  );
}

export default Welcome;
