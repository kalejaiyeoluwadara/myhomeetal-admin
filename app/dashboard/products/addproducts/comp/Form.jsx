"use client";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";

const Modal = () => {
  const cats = [
    "My Phones and Tablet",
    "My Phones and Tablet",
    "My Phones and Tablet",
    "My Phones and Tablet",
    "My Phones and Tablet",
    "My Phones and Tablet",
    "My Phones and Tablet",
  ];
  return (
    <div className="flex flex-col h-auto top-24 p-4 right-2 w-[200px] rounded-xl border bg-white absolute z-20 ">
      {cats.map((d, id) => {
        return (
          <p
            key={id}
            className="px-2 text-[12px] rounded-md cursor-pointer hover:bg-red-50 py-2"
          >
            {d}
          </p>
        );
      })}
    </div>
  );
};
function Form() {
  const [modal, setModal] = useState(false);
  return (
    <main className="grid w-full grid-cols-3 mt-10 mb-40 gap-6 ">
      {/* Main form */}
      <div className="border bg-white col-span-2 rounded-xl p-4 w-auto h-[800px]">
        {/* title */}
        <h2 className=" core mt-4 ">General Information</h2>
        <section className="mt-4 flex flex-col items-start justify-center gap-6 ">
          <div className="w-full ">
            <label className="inputlabel">Product Name</label>
            <input className="input" type="text" placeholder="Iphone 11 Pro" />
            <p className="inputfooter ">
              A product name is required and recommended to be unique.
            </p>
          </div>

          <div className="w-full ">
            <label className="inputlabel">Product Description</label>
            <input className="input" type="text" placeholder="Enter Subject" />
            <p className="inputfooter ">
              Set a description to the product for better visibility.
            </p>
          </div>
          <div className="w-full ">
            <label className="inputlabel">Product Specifications</label>
            <input className="input" type="text" placeholder="Enter Subject" />
            <p className="inputfooter ">
              Variations (Colour), Model, Size (L x W x H cm), Weight (kg) Main
              Material.
            </p>
          </div>
          <div className="w-full ">
            <label className="inputlabel">Brand’s Name</label>
            <input className="input" type="text" placeholder="Samsung" />
          </div>
          <div className="w-full ">
            <label className="inputlabel">SKU (Stock Keeping Unit)</label>
            <input className="input" type="text" placeholder="783kl32" />
          </div>
          {/* Level */}
          <section className="flex gap-[18px]">
            <div className="w-full ">
              <label className="inputlabel">SKU (Stock Keeping Unit)</label>
              <input className="input" type="text" placeholder="783kl32" />
            </div>
            <div
              onClick={() => {
                setModal((prev) => !prev);
              }}
              className="w-full relative "
            >
              <label className="inputlabel">Category</label>
              <div className="w-full border flex items-center h-[56px] rounded-md  justify-between px-4 ">
                <p>My Phones and Tablet</p>
                <GoChevronDown />
                {modal && <Modal />}
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* Image update */}
      <div className="border bg-white rounded-xl p-4 w-auto h-[536px]">
        <h2 className="core mb-4 ">Product Image</h2>
        <p className="text-[14px] font-medium text-[#475367] ">
          Set the product media gallery
        </p>
        <div className="p-4 flex w-full border-[1.5px] rounded-md h-[417px] border-dashed border-[#D0D5DD]  items-center justify-center flex-col ">
          <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6 ">
            <FiUploadCloud size={25} />
          </div>
          <div>
            <h3 className="text-[14px] text-[#475367] ">
              <span className="text-[14px] text-[#ED2224] ">
                Click to upload
              </span>{" "}
              or drag and drop
            </h3>
            <p className="text-[12px] text-center text-[#98A2B3]  ">
              Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>

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
    </main>
  );
}

export default Form;
