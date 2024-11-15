"use client";
import { PiMoneyWavy } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineAccessAlarms } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import useData from "@/hooks/useData";
import { useGlobal } from "@/app/context";
import useData2 from "@/hooks/useData2";
function Revenue() {
  const { data } = useData2(
    "https://server.myhomeetal.store/api/v1/admin-wallet"
  );
  const { formatNumberWithCommas } = useGlobal();
  const totalSales = (data?.userPayments || []).reduce(
    (acc, payment) => acc + payment?.amount,
    0
  );
  return (
    <div className="box">
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center justify-center h-[32px] w-[32px] border rounded-[8px] ">
          <PiMoneyWavy />
        </div>
        <p className="grey text-[14px] font-medium ">Total Revenue</p>
      </div>

      <div>
        <p className="title mt-8 ">{`₦${formatNumberWithCommas(
          totalSales
        )}`}</p>
      </div>

      <div className="flex items-center mt-[12px] gap-2 justify-center  ">
        <div className="w-[50px] gap-[4px]  h-[18px] flex items-center justify-center rounded-[12px] bg-[#E7F6EC] ">
          <IoAnalyticsOutline
            size={12}
            className="border-[1px] p-[1px] rounded-sm text-[#036B26] border-[#036B26] "
          />
          <p className="text-[12px] text-[#036B26] font-medium  ">0%</p>
        </div>
        <p className="text-[12px] grey font-medium ">
          Increase Since Last Month
        </p>
      </div>
    </div>
  );
}

export default Revenue;
