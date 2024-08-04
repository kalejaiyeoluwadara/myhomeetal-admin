import React from "react";
import sport from "@/app/assets/sport.svg";
import Image from "next/image";

function Data() {
  return (
    <div className="flex justify-between px-4 h-[68px] items-center">
      <Image src={sport} className="" alt="" />
      <h3>Sporty Running Shoe</h3>
      <span className="pill  cursor-text ">Low</span>
    </div>
  );
}

export default Data;
