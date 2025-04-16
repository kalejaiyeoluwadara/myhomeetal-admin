"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/app/assets/logo.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { toast } from "sonner";

function CatCard({
  name,
  amt,
  _id,
  product_category_image,
  setItemId,
  setDetails,
  details,
  subCategory, // Now an array of objects with `name` property
}) {
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  return (
    <section className="flex relative min-h-[158px] bg-white w-full justify-between items-start rounded-[22px] overflow-hidden px-6 py-4 flex-col gap-4">
      {/* Toggle Icon */}
      <div
        className="absolute top-4 right-4 cursor-pointer text-xl"
        // onClick={() => setShowSubCategories((prev) => !prev)}
        onClick={() => {
          toast.info("Coming Soon");
        }}
      >
        {showSubCategories ? <BsEyeSlash /> : <BsEye />}
      </div>

      {!showSubCategories ? (
        <div className="w-full flex justify-between items-center">
          {/* Left: Image & Title */}
          <div className="flex items-center gap-[59px]">
            <div
              onClick={() => {
                setItemId(_id);
                setDetails({
                  name: name,
                  image: product_category_image,
                });
              }}
              className="h-[109px] cursor-pointer bg-[#D9D9D9] relative overflow-hidden w-[109px] rounded-[23px] flex items-center justify-center"
            >
              {product_category_image === null ? (
                <Image className="cover" alt="" src={logo} />
              ) : (
                <Image
                  src={product_category_image}
                  className="cover"
                  alt="product_category_image"
                />
              )}
            </div>
            <p>My {name}</p>
          </div>

          {/* Right: Amount & Edit */}
          <div className="flex gap-[104px] items-center">
            <p>
              {amt}
              {amt > 1 ? " products" : " product"}
            </p>
            <Link href={`/dashboard/categories/${_id}`}>
              <p className="text-[#ED2224] font-light cursor-pointer">
                Edit Category
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 overflow-y-auto bg-white">
          {subCategory?.length > 0 ? (
            subCategory.map((sub, index) => (
              <div
                key={index}
                onClick={() => setSelectedItemId(index)}
                className={`h-[35px] flex items-center cursor-pointer w-full px-2 py-2 text-black hover:text-white flex-shrink-0 ${
                  selectedItemId === index
                    ? "bg-[#881415] text-white"
                    : "hover:bg-[#881415]"
                }`}
              >
                <p className="text-xl">{sub.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subcategories available.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default CatCard;
