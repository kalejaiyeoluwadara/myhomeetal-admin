import Image from "next/image";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";
function Sidebar() {
  return (
    <div className="h-screen relative -z-40 w-full py-[24px]  ">
      <section className="px-[24px]">
        <Image src={logo} alt="" className="" />
      </section>
      <section className="h-[236px] mt-[12px] w-full  "></section>
      <section className="absolute w-full bottom-0  ">
        <div className="h-[100px] w-full  flex flex-col justify-center items-center ">
          <div className="w-full text-center ">
            <p>Settings</p>
          </div>
          <div>
            <p>Settings</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div>
            <Image src={profile} alt="" className="object-cover" />
            <div />
          </div>
          <div>
            <h4>David Fayemi</h4>
            <p>David@rayna.ui</p>
          </div>
          <div>
            <FiLogOut />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
