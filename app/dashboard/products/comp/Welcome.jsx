import React from "react";
import { FaPlus } from "react-icons/fa6";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">All Products</h2>
      </section>
      <section>
        <button className=" text-[16px] font-semibold p-4 rounded-[8px] flex items-center justify-center gap-2 ">
          <FaPlus size={20} />
          Add Product
        </button>
      </section>
    </div>
  );
}

export default Welcome;
