import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";
function Sidebar() {
  return (
    <div className="h-screen -z-40  w-[270px] py-[24px] top-0 left-0 ">
      <section>
        <Image src={logo} alt="" className="" />
      </section>
      <section></section>
      <section></section>
    </div>
  );
}

export default Sidebar;
