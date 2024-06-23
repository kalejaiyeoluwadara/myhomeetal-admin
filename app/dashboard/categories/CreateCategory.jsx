"use client";
import { useGlobal } from "@/app/context";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import logouts from "@/app/assets/logout.svg";
import cancel from "@/app/assets/cancel.svg";
import Image from "next/image";
import Link from "next/link";
import { FiUploadCloud } from "react-icons/fi";
function CreateCategory() {
  const { createCat, setCreateCat } = useGlobal();
  return (
    <>
      {createCat && (
        <div className="h-screen fixed -translate-x-12 top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25 ">
          <div className="w-[400px] ml-[270px] h-[572] p-6 bg-white rounded-2xl flex items-center justify-start flex-col ">
            <h2 className="core">Create a Category</h2>
            <div>
              <p className="mt-4 text-[#475367] text-[14px]  ">
                Upload a cover image
              </p>
              <div className=" h-[245px] active:border-solid active:border-red-500 active:border-[1.5px] w-full flex-col rounded-lg active:bg-gray-50 cursor-pointer center border-dashed border ">
                <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6 ">
                  <FiUploadCloud size={25} />
                </div>
                <h3 className="text-[14px] text-center text-[#475367] ">
                  <span className="text-[14px] text-[#ED2224] ">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </h3>
                <p className="text-[12px] text-center text-[#98A2B3]  ">
                  Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <div className="my-6 w-full bg-red-300 relative ">
                  <hr className="bg-[#F0F2F5]" />
                  <div className="w-full center ">
                    <p className="absolute px-4 text-center bg-white text-xs font-bold text-[#98A2B3]  -top-[9px] ">
                      OR
                    </p>
                  </div>
                </div>

                <button className="w-[118px] center h-[36px] rounded-md text-[14px] font-semibold ">
                  Browse Files
                </button>
              </div>
            </div>
            <input
              type="text"
              className=" h-[70px] mt-3 w-full bg-[#F4F4F4] px-4 mb-[20px] rounded-[10px] "
              placeholder="Category Name"
            />
            <button
              onClick={() => {
                setCreateCat(false);
              }}
              className="   center w-full h-[44px] rounded-[8px] "
            >
              Create Category
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateCategory;
