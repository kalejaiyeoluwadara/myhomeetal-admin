import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import profile from "../../assets/logo.svg";
import { RiCustomerServiceLine } from "react-icons/ri";
import Image from "next/image";
import { useGlobal } from "@/app/context";

function Footer() {
  const { logout, setLogOut, userData, setUserData } = useGlobal();
  const [userDetails, setUserDetails] = useState({
    email: "",
    image: "",
    username: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");
    const username = localStorage.getItem("username");

    setUserDetails({
      email: email || "N/A",
      image: image && image !== "undefined" ? image : null,
      username: username || "Anonymous",
    });
  }, []);

  const { email, image, username } = userDetails;

  return (
    <footer className="absolute w-full bottom-2">
      <div className="flex items-center justify-between py-[12px] px-[16px] gap-2">
        <div className="flex items-center gap-[12px] justify-center">
          <div className="relative flex-shrink-0 flex">
            {image ? (
              <img
                className="flex-shrink-0 object-cover h-[50px] w-[50px] bg-gray-300 rounded-full"
                alt="Profile"
                src={image}
              />
            ) : (
              <Image
                src={profile}
                alt="Default Profile"
                className="h-[50px] w-[50px] rounded-full"
              />
            )}
            <div className="absolute right-0 bottom-0 border-2 border-white h-3 w-3 bg-[#04802E] rounded-full" />
          </div>
          <div className="w-[140px]">
            <h4 className="text-[14px] truncate font-semibold">{username}</h4>
            <p className="text-[14px] truncate text-[#475367]">{email}</p>
          </div>
        </div>
        <div>
          <FiLogOut
            onClick={() => setLogOut((prev) => !prev)}
            className="pointer"
            size={20}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
