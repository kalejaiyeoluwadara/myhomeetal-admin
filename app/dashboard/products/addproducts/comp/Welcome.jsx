import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
function Welcome() {
  return (
    <div className="flex  items-center justify-between">
      <section>
        <h2 className="text-[24px] font-semibold ">Add New Product</h2>
      </section>
      <section className="flex gap-4">
        <Link href={"/dashboard/products"}>
          <button className=" text-[16px] border-[1.5px] border-[#ED2224] text-[#ED2224] bg-white font-semibold px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 ">
            <LiaTimesSolid size={20} />
            Cancel
          </button>
        </Link>
        <button className=" text-[16px] font-semibold px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 ">
          <FaPlus size={20} />
          Save product
        </button>
      </section>
    </div>
  );
}

export default Welcome;
