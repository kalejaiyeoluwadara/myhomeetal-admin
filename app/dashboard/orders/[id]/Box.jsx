import Image from "next/image";
import React from "react";
import { GoPeople } from "react-icons/go";
function Box({ title, item, image = null }) {
  return (
    <div className="flex items-center gap-4 h-[69px] w-full border-b py-[14px] border-[#F7F9FC] ">
      <div className="flex items-center   gap-4">
        {image === null ? <GoPeople /> : <Image src={image} alt="profile" />}
        <div className="">
          <p className="text-[12px] text-[#667185] ">{title}</p>
          <p className="text-[14px] text-medium ">{item}</p>
        </div>
      </div>
    </div>
  );
}

export default Box;
