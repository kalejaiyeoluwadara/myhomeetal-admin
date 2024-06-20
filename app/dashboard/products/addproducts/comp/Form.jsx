import React from "react";
import { FiUploadCloud } from "react-icons/fi";
function Form() {
  return (
    <main className="grid w-full grid-cols-3 mt-10  gap-6 ">
      {/* Main form */}
      <div className="border bg-white col-span-2 rounded-xl p-4 w-auto h-[937px]">
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
            <div className="w-full ">
              <label className="inputlabel">SKU (Stock Keeping Unit)</label>
              <input className="input" type="text" placeholder="783kl32" />
            </div>
          </section>
        </section>
      </div>

      {/* Image update */}
      <div className="border bg-white rounded-xl p-4 w-auto h-[536px]">
        <h2 className="core">Product Image</h2>
        <p className="text-[]">Set the product media gallery</p>
        <div>
          <div className="">
            <FiUploadCloud size={25} />
          </div>
          <div>
            <h3>
              <span>Click to upload</span> or drag and drop
            </h3>
            <p>Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <div>
            <hr />
            <p>OR</p>
          </div>

          <button>Browse Files</button>
        </div>
      </div>
    </main>
  );
}

export default Form;
