import React from "react";
import employees from "../../assets/users.svg";
import Image from "next/image";
function Inner({ name }) {
  return (
    <div
      className={`h-[44px] px-[16px] hover:bg-red-50 flex-shrink-0 py-[12px]  rounded-[4px] `}
    >
      <div className={`flex cursor-pointer  grey gap-3 `}>
        <Image src={employees} alt="" className={`opacity-60 invisible `} />{" "}
        <p>{name}</p>{" "}
      </div>
    </div>
  );
}

export default Inner;
