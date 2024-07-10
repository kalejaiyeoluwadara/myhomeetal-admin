import Image from "next/image";
import Link from "next/link";
import React from "react";
import { WiCloudUp } from "react-icons/wi";
import logo from "@/app/assets/logo.svg";
function CatCard({ name, amt, _id, product_category_image }) {
  return (
    <section className="flex h-[158px] bg-white w-full justify-between items-center rounded-[22px]  px-6 ">
      <div className="flex items-center justify-center gap-[59px]">
        <div className="h-[109px] bg-[#D9D9D9] relative overflow-hidden w-[109px] rounded-[23px] flex items-center justify-center ">
          {product_category_image === null ? (
            <Image className="cover" alt="" src={logo} />
          ) : (
            <img
              src={product_category_image}
              className="cover"
              alt="product_category_image"
            />
          )}

          <div className="h-[56px] bg-[#F0F2F5] w-[56px] rounded-[23px] flex items-center justify-center text-[#475367]  "></div>
        </div>
        <p>My {name}</p>
      </div>
      <div className="flex gap-[104px] items-center justify-center ">
        <p>
          {amt}
          {amt > 1 ? " products" : " product"}{" "}
        </p>
        <Link href={`/dashboard/categories/${_id}`}>
          <p className="text-[#ED2224] font-light cursor-pointer ">
            Edit Category
          </p>
        </Link>
      </div>
    </section>
  );
}

export default CatCard;
