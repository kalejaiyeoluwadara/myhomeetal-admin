import React from "react";
import card from "../../../assets/card.svg";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import eye from "../../../assets/eye.svg";
function Status() {
  return (
    <div className="w-full relative mt-10 mb-6 overflow-hidden h-[184px] rounded-xl ">
      <Image src={card} alt="" className=" cover " />
      <div className="relative w-full h-full px-10 flex items-center justify-between z-20 ">
        <div>
          <p className="text-[#98A2B3] mb-4 text-[12px] font-medium ">
            Available Balance
          </p>
          <h2 className="text-[36px] font-semibold text-white ">
            ₦ 0<span className="text-gray-400">.00</span>{" "}
          </h2>
          <p className="text-[14px] text-[#98A2B3] font-medium ">
            Payout Balance: <span className="text-white">₦0.00</span>
          </p>
        </div>

        <div>
          <Image src={eye} alt="" className="relative z-20" />
        </div>
      </div>
    </div>
  );
}

export default Status;
