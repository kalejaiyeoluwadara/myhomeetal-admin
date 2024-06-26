import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">Edit an Existing Product</h2>
      </section>
      <section className="flex gap-6">
        <Link href={"/dashboard/products"}>
          <button className=" text-[16px] font-semibold p-4 rounded-[8px] flex items-center justify-center bg-white border-primary border-[1.5px] text-primary gap-2 ">
            <FaPlus size={20} />
            Cancel
          </button>
        </Link>
        <button className=" text-[16px] font-semibold p-4 rounded-[8px] flex items-center justify-center gap-2 ">
          <FaPlus size={20} />
          Update Product
        </button>
      </section>
    </div>
  );
}

export default Welcome;
