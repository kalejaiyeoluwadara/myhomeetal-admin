"use client";
import React, { useState } from "react";
import card from "../../../assets/card.svg";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import eye from "../../../assets/eye.svg";
import useData from "@/hooks/useData";
import { GoDotFill } from "react-icons/go";
import { useGlobal } from "@/app/context";
function Status({ data, loading }) {
  const { formatNumberWithCommas } = useGlobal();
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full relative mt-10 mb-6 overflow-hidden h-[184px] rounded-xl ">
      <Image src={card} alt="" className=" cover " />
      <div className="relative w-full h-full px-10 flex items-center justify-between z-20 ">
        <div>
          <p className="text-[#98A2B3] mb-4 text-[12px] font-medium ">
            Available Balance
          </p>
          <>
            {visible ? (
              <>
                {loading ? (
                  <h2 className="text-[36px] font-semibold text-white ">
                    ₦00
                    <span className="text-gray-400">.00</span>{" "}
                  </h2>
                ) : (
                  <h2 className="text-[36px] font-semibold text-white ">
                    ₦ {formatNumberWithCommas(data?.adminWallet?.balance)}
                    <span className="text-gray-400">.00</span>{" "}
                  </h2>
                )}
              </>
            ) : (
              <div className="flex gap-0 mb-2">
                {[1, 2, 3, 4].map((dot, id) => (
                  <GoDotFill className="text-white" size={20} />
                ))}
              </div>
            )}
          </>
          <p className="text-[14px] text-[#98A2B3] font-medium ">
            Payout Balance: <span className="text-white">₦0.00</span>
          </p>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            setVisible((prev) => !prev);
          }}
        >
          {visible ? (
            <Image src={eye} alt="" className="relative z-20" />
          ) : (
            <BsEye size={30} className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Status;
