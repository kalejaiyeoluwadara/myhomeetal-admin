"use client";
import React, { useState, useEffect } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import profile from "../../assets/logo.svg";
import Image from "next/image";
import { useGlobal } from "@/app/context";
function NavBar() {
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
    <div className="relative w-full  flex items-center justify-between px-8  h-[64px] bg-white z-20 ">
      <section className=" bg-gray-50 h-[40px] w-[629px] flex items-start justify-center rounded-[6px] px-[12px] py-[10px] gap-[8px] ">
        <IoSearch size={20} />
        <input
          type="text"
          placeholder="Search here..."
          className="w-[605px] bg-transparent h-full outline-none "
        />
      </section>
      <section className="flex gap-[12px] ">
        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#F0F2F5] ">
          <CiBellOn size={25} />
        </div>
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
            className="h-[40px] w-[40px] rounded-full"
          />
        )}
      </section>
    </div>
  );
}

export default NavBar;
