import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import profile from "../../assets/logo.svg";
import { RiCustomerServiceLine } from "react-icons/ri";
import Image from "next/image";
import { useGlobal } from "@/app/context";
function Footer() {
  const { logout, setLogOut, userData, setUserData } = useGlobal();
  console.log(userData.fullname);
  return (
    <footer className="absolute w-full bottom-2  ">
      {/* <div className="w-full   px-[2px] flex flex-col justify-center items-center ">
        <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
          <TbSettings />
          <p className="text-[14px] font-normal ">Settings</p>
        </div>
        <div className="w-full flex items-center h-[44px] justify-start px-[16px] gap-[12px]">
          <RiCustomerServiceLine />
          <p className="text-[14px] font-normal ">Help Center</p>
        </div>
      // </div> */}
      <div className="flex items-center  justify-between py-[12px] px-[16px] gap-2">
        <div className="flex items-center gap-[12px] justify-center ">
          <div className="relative flex-shrink-0 flex">
            {userData?.image !== "undefined" && userData.image !== "" ? (
              <img
                className=" flex-shrink-0 object-cover h-[50px] w-[50px] bg-gray-300 rounded-full "
                alt=""
                src={userData?.image}
              />
            ) : (
              <Image
                src={profile}
                alt=""
                className=" h-[50px]  w-[50px] rounded-full  "
              />
            )}
            <div className="absolute right-0 bottom-0 border-2 border-white h-3 w-3 bg-[#04802E] rounded-full " />
          </div>
          <div className="w-[140px]">
            <h4 className="text-[14px] truncate font-semibold ">
              {userData.fullname !== "undefined"
                ? userData.fullname
                : userData.username}
            </h4>
            <p className="text-[14px] truncate text-[#475367] ">
              {userData.email}
            </p>
          </div>
        </div>
        <div>
          <FiLogOut
            onClick={() => {
              setLogOut((prev) => !prev);
            }}
            className=" pointer  "
            size={20}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
