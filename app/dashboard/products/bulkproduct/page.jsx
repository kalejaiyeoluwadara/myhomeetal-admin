import Link from "next/link";
import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";

function Page() {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <h2 className="core mb-6 ">Bulk Product</h2>
      <div className="border bg-white center  rounded-xl p-4 w-auto h-[536px]">
        <div className="p-4 flex w-full border-[1.5px] rounded-md h-[479px] border-dashed active:border-[2px] active:border-solid cursor-pointer transition-all active:border-primary border-[#D0D5DD]  items-center justify-center flex-col ">
          <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6 ">
            <FiUploadCloud size={25} />
          </div>
          <div className="center flex-col">
            <h3 className="text-[14px] text-[#475367] ">
              <span className="text-[14px] text-center text-[#ED2224] ">
                Click to upload
              </span>{" "}
              or drag and drop
            </h3>
            <p className="text-[12px] text-center text-[#98A2B3]  ">
              Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>

          <div className="my-[56px] w-full bg-red-300 relative ">
            <hr className="bg-[#F0F2F5]" />
            <div className="w-full center ">
              <p className="absolute px-4 text-center bg-white text-xs font-bold text-[#98A2B3]  -top-[9px] ">
                OR
              </p>
            </div>
          </div>

          <Link href={"/dashboard/products/bulkproduct/uploads"}>
            <button className="w-[354px]  center h-[52px] rounded-[10px] text-[16px] font-medium ">
              Browse Files
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Page;
