"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import logo from "@/app/assets/logo.svg";
import useData from "@/hooks/useData";
import { ApiRoutes } from "@/app/api/apiRoute";

function SubCategoryCard({
  name,
  amt,
  _id,
  subCategoryImage,
  setItemId,
  setDetails,
  details,
}) {
  const [subCategories, setSubCategories] = useState(false);
  const [catItem, setCatItem] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item

  return (
    <section className="flex relative h-[158px] bg-white w-full justify-between items-center rounded-[22px] overflow-hidden px-6">
      {!subCategories && (
        <div className="flex items-center justify-center gap-[59px]">
          <div
            onClick={() => {
              setItemId(_id);
              setDetails({
                name: name,
                image: subCategoryImage,
              });
            }}
            className="h-[109px] cursor-pointer bg-[#D9D9D9] relative overflow-hidden w-[109px] rounded-[23px] flex items-center justify-center"
          >
            {subCategoryImage === null ? (
              <Image fill className="cover" alt="" src={logo} />
            ) : (
              <Image
                src={subCategoryImage}
                fill
                className="cover"
                alt="subCategoryImage"
              />
            )}
            <div className="h-[56px] bg-[#F0F2F5] w-[56px] rounded-[23px] flex items-center justify-center text-[#475367]"></div>
          </div>
          <p>My {name}</p>
        </div>
      )}
      {!subCategories && (
        <div className="flex gap-[104px] items-center justify-center">
          <p>
            {amt}
            {amt > 1 ? " products" : " product"}
          </p>
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/sub-categories/${_id}`}>
              <p className="text-[#ED2224] font-light cursor-pointer">
                Edit Category
              </p>
            </Link>
          </div>
        </div>
      )}
      {subCategories && (
        <div className="w-full flex flex-col gap-2 overflow-y-auto py-2 bg-white h-full ">
          <p
            className="cursor-pointer"
            onClick={() => setSubCategories((prev) => !prev)}
          >
            <BsEyeSlash />
          </p>
          {catItem.map((d, id) => {
            return (
              <div
                onClick={() => setSelectedItemId(d._id)}
                className={`h-[35px] flex items-center cursor-pointer w-full px-2 py-2 text-black hover:text-white flex-shrink-0 ${
                  selectedItemId === d._id
                    ? "bg-[#881415] text-white"
                    : "hover:bg-[#881415]"
                }`}
              >
                <p className=" text-xl">{d.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SubCategoryCard;
