import React from "react";
import { PiMoneyWavy } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
function Revenue() {
  return (
    <div className="box">
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center justify-center h-[32px] w-[32px] border rounded-[8px] ">
          <PiMoneyWavy />
        </div>
        <p className="grey text-[14px] font-medium ">Total Revenue</p>
      </div>

      <div>
        <p className="title">₦45,823,900</p>
      </div>

      <div className="flex items-center mt-[12px] gap-2 justify-center  ">
        <div className="w-[50px] gap-[4px]  h-[18px] flex items-center justify-center rounded-[12px] bg-[#E7F6EC] ">
          <IoAnalyticsOutline
            size={12}
            className="border-[1px] p-[1px] rounded-sm text-[#036B26] border-[#036B26] "
          />
          <p className="text-[12px] text-[#036B26] font-medium  ">10%</p>
        </div>
        <p className="text-[12px] grey font-medium ">
          Increase Since Last Month
        </p>
      </div>
    </div>
  );
}

export default Revenue;
