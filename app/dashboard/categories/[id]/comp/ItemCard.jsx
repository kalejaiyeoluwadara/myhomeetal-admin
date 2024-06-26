import React from "react";
import prod from "../../../../assets/prod.svg";
import Image from "next/image";

function ItemCard({ brand, description, price, productTitle, images }) {
  const img = images[0];
  return (
    <div className="border relative w-full flex px-6 gap-20 h-[271px] rounded-xl items-center justify-start ">
      <div className="h-[173px] relative w-[173px] center bg-white rounded-xl ">
        <img src={img} alt="" className=" object-cover h-[131px] w-[131px] " />
      </div>
      <div className="text[16px] space-y-4 font-light ">
        <p>Product Name: {productTitle}</p>
        <p>Prod Description: {description}</p>
        <p>Prod Price: ₦{price}</p>
        <p className="flex gap-4">
          <span>SKU</span>
          <span></span>
        </p>
        <p className="absolute bottom-4 right-4 cursor-pointer text-[#FF0000] ">
          Remove Product
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
