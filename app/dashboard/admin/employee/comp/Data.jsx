import React from "react";
import sport from "@/app/assets/sport.svg";
import Image from "next/image";
import Link from "next/link";

function Data({ productTitle, images, _id }) {
  const img = images[0];
  return (
    <Link href={`/dashboard/products/${_id}`}>
      <div className="flex justify-between px-4 h-[68px] items-center">
        <img
          src={img}
          className=" h-[40px] bg-gray-200 w-[40px] rounded-full object-cover "
          alt=""
        />
        <h3>{productTitle}</h3>
        <span className="pill  cursor-text ">Low</span>
      </div>
    </Link>
  );
}

export default Data;
