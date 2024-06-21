"use client";
import React, { useState } from "react";
import home from "@/app/assets/home.svg";
import { LiaTimesSolid } from "react-icons/lia";
import Image from "next/image";
const HeaderButton = ({ name, onclick, active, setActive }) => {
  return (
    <div
      onClick={() => {
        setActive(name);
      }}
      className={` ${
        active === name && "border border-[#ED2224] bg-[#FBF1F1] "
      } h-[32px] gap-2 rounded-[8px] text-[#667185] center border px-2 `}
    >
      <Image src={home} alt="" className="" />
      <p className="text-[14px] font-medium ">{name}</p>
      {active === name && <LiaTimesSolid size={20} />}
    </div>
  );
};
function AddEmployee() {
  const [active, setActive] = useState("Personal");
  return (
    <div className="fixed flex items-center overflow-y-scroll top-0 left-[270px] h-screen w-full bg-black bg-opacity-25 z-40 ">
      <div className="h-[524px] gap-6 p-4 flex ml-40 w-[670px] rounded-[10px] bg-white ">
        <HeaderButton name={"Personal"} active={active} setActive={setActive} />
        <HeaderButton
          name={"Employment"}
          active={active}
          setActive={setActive}
        />
        <HeaderButton
          name={"Login Credentials"}
          active={active}
          setActive={setActive}
        />
      </div>
    </div>
  );
}

export default AddEmployee;
