"use client";
import { useGlobal } from "@/app/context";
import React, { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
function Page() {
  const { bulk, setBulk } = useGlobal();
  useEffect(() => {
    console.log(bulk);
  }, [bulk]);
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <div className="flex items-center w-full justify-between mb-[60px]">
        <h2 className="core">Bulk Product</h2>
        <button className="w-[200px] h-[50px] rounded-[10px] text-base ">
          Upload Product
        </button>
      </div>
      <main className="h-[368px] flex gap-6 px-6 py-3 rounded-[20px] border w-[900px] ">
        <div className="w-[235px] border py-3 flex-col center rounded-xl h-full ">
          <div className="h-[50px] w-[50px] rounded-full center bg-[#F0F2F5] mb-6 ">
            <FiUploadCloud size={25} />
          </div>
          <p className="text-[14px] text-center text-[#ED2224] ">
            Click to upload
          </p>{" "}
          <p className="text-[10px] mt-[33px] text-center text-[#98A2B3]  ">
            Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <div className=" flex w-[60%] h-full ">
          <div className=" flex py-3 flex-col gap-4 w-[80%] h-full  ">
            <div>
              <p className="text-base truncate  font-light">
                Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android
                13 - Light Green
              </p>
              <p className="text-base font-light">Prod Description:₦145,600</p>
              <p className="text-base font-light">SKU SKU</p>
              <p className="text-base font-light">
                Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android
                13 - Light Green
              </p>
            </div>
            <div>
              <p className="text-base  truncate font-light">
                Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android
                13 - Light Green
              </p>
              <p className="text-base font-light">Prod Description:₦145,600</p>
              <p className="text-base font-light">SKU SKU</p>
              <p className="text-base font-light">
                Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android
                13 - Light Green
              </p>
            </div>
          </div>
          <div className="h-full justify-between items-end flex flex-col ">
            <div className="h-[30px] w-[30px] center bg-[#ED2224] rounded-full  text-white font-semibold  ">
              1
            </div>
            <div className="flex text-[14px] text-nowrap w-full gap-4">
              <p>Remove</p>
              <p className="text-c7">Edit Product</p>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}

export default Page;
