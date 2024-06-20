import React from "react";
import { WiCloudUp } from "react-icons/wi";

function CatCard() {
  return (
    <section className="flex h-[158px] bg-white w-full justify-between items-center rounded-[22px]  px-6 ">
      <div className="flex items-center justify-center gap-[59px]">
        <div className="h-[109px] bg-[#D9D9D9] w-[109px] rounded-[23px] flex items-center justify-center ">
          <div className="h-[56px] bg-[#F0F2F5] w-[56px] rounded-[23px] flex items-center justify-center text-[#475367] ">
            <WiCloudUp size={30} />
          </div>
        </div>
        <p>My Phone & Tablets</p>
      </div>
      <div className="flex gap-[104px] items-center justify-center ">
        <p>500 products</p>
        <p className="text-[#ED2224] font-light cursor-pointer ">
          Edit Category
        </p>
      </div>
    </section>
  );
}

export default CatCard;
