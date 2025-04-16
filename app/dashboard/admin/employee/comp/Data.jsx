import React from "react";
import Link from "next/link";
import Image from "next/image";

function Data({ productTitle, images, _id, inventory }) {
  const img =
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1694878981819-1084b2d7dd0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div
      onClick={() => {
        console.log(inventory);
      }}
      className="flex justify-between items-center gap-2 px-4 h-[68px] w-full "
    >
      <div className="flex gap-2 w-[200px] items-center ">
        <Image
          src={img}
          className=" h-[40px] flex-shrink-0  bg-gray-200 w-[40px] rounded-full object-cover "
          alt="category_image"
        />
        <h3 className="truncate">{productTitle}</h3>
      </div>
      <span className="pill px-2  cursor-text ">Low</span>
    </div>
  );
}

export default Data;
