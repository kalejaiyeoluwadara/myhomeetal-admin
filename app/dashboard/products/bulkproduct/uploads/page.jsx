import React from "react";
import { FiUploadCloud } from "react-icons/fi";
function Page() {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <div className="flex items-center w-full justify-between mb-[60px]">
        <h2 className="core">Bulk Product</h2>
        <button className="w-[200px] h-[50px] rounded-[10px] text-base ">
          Upload Product
        </button>
      </div>
      <main className="h-[368px] grid grid-cols-3 gap-6 p-6 rounded-[20px] border w-full ">
        <div className="w-auto border flex-col center rounded-xl h-full ">
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
        <div className="col-span-2 flex gap-1 w-auto h-full ">
          <div className=" flex flex-col gap-4 w-full h-full  ">
            <p className="text-base font-light">
              Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13
              - Light Green
            </p>
            <p className="text-base font-light">
              Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13
              - Light Green
            </p>
            <p className="text-base font-light">
              Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13
              - Light Green
            </p>
            <p className="text-base font-light">
              Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13
              - Light Green
            </p>
          </div>
          <div>
            <div className="h-[30px] w-[30px] center rounded-full bg-[#ED2224] text-white font-semibold  ">
              1
            </div>
            <div className="flex gap-4">
              <p>Remove</p>
              <p>Edit Product</p>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}

export default Page;
