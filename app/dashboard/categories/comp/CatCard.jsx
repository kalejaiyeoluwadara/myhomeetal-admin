import Link from "next/link";
import React from "react";
import { WiCloudUp } from "react-icons/wi";

function CatCard({ name, amt, _id }) {
  return (
    <section className="flex h-[158px] bg-white w-full justify-between items-center rounded-[22px]  px-6 ">
      <div className="flex items-center justify-center gap-[59px]">
        <div className="h-[109px] bg-[#D9D9D9] w-[109px] rounded-[23px] flex items-center justify-center ">
          <div className="h-[56px] bg-[#F0F2F5] w-[56px] rounded-[23px] flex items-center justify-center text-[#475367] ">
            <WiCloudUp size={30} />
          </div>
        </div>
        <p>{name}</p>
      </div>
      <div className="flex gap-[104px] items-center justify-center ">
        <p>
          {amt}
          {amt > 1 ? " products" : " product"}{" "}
        </p>
        <Link href={`/dashboard/categories/${_id}`}>
          <p className="text-[#ED2224] font-light cursor-pointer ">
            Edit Category
          </p>
        </Link>
      </div>
    </section>
  );
}

export default CatCard;
