import Image from "next/image";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";
import { TbSettings } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
function Sidebar() {
  return (
    <div className="h-screen relative -z-40 w-full py-[24px]  ">
      <section className="px-[24px]">
        <Image src={logo} alt="" className="" />
      </section>
      <section className="h-[236px] bg-gray-50 mt-[12px] w-full  "></section>
      <section className="absolute w-full bottom-2  ">
        <div className="w-full   px-[2px] flex flex-col justify-center items-center ">
          <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
            <TbSettings />
            <p className="text-[14px] font-normal ">Settings</p>
          </div>
          <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
            <RiCustomerServiceLine />
            <p className="text-[14px] font-normal ">Help Center</p>
          </div>
        </div>
        <div className="flex items-center  justify-between py-[12px] px-[16px] gap-2">
          <div className="flex items-center gap-[12px] justify-center ">
            <div>
              <Image
                src={profile}
                alt=""
                className="object-cover h-[40px] w-[40px] "
              />
              <div />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold ">David Fayemi</h4>
              <p className="text-[14px] text-[#475367] ">David@rayna.ui</p>
            </div>
          </div>
          <div>
            <FiLogOut size={20} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
