"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
const Modal = ({ cat, setCat, setFormData, formData }) => {
  const cats = ["My Phones and Tablet", "My Phones and Tablet"];
  return (
    <div className="flex flex-col h-auto top-24 p-4 right-2 w-[200px] rounded-xl border bg-white absolute z-20 ">
      {cats.map((d, id) => {
        return (
          <p
            key={id}
            onClick={() => {
              setFormData({ ...formData, category: d });
              setCat(d);
            }}
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
  const [disctype, SetDiscType] = useState("No Discount");
  const [cat, setCat] = useState("My Phones $ Tablet");
  const [modal, setModal] = useState(false);
  const [disc, setDisc] = useState(0);
  const [discModal, setDiscModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    productTitle: "lx",
    price: "4000",
    category: "phone",
    description: "eeee",
    brand: "eee",
    inventory: 2,
    sku: "3ee",
    stock: "20",
    image: [],
    review: [],
  });
  // Handling files
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    // Limit to 4 files
    if (files.length > 0) {
      setSelectedFile(files);
      console.log("Selected files:", files);
      setFormData({ ...formData, image: files });
    }
  };

  // Handling submit
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClick = () => {
    // Trigger click on the file input element
    document.getElementById("file-upload").click();
  };
  return (
    <div className="mb-8 relative w-full">
      {/* Nav */}
      <div className="flex  items-center justify-between">
        <section>
          <h2 className="text-[24px] font-semibold ">Add New Product</h2>
        </section>
        <section className="flex gap-4">
          <Link href={"/dashboard/products"}>
            <button className=" text-[16px] border-[1.5px] border-[#ED2224] text-[#ED2224] bg-white font-semibold px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 ">
              <LiaTimesSolid size={20} />
              Cancel
            </button>
          </Link>
          <button className=" text-[16px] font-semibold px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 ">
            <FaPlus size={20} />
            Save product
          </button>
        </section>
      </div>

      {/* Nav ending */}
      <main className="grid w-full grid-cols-3 mt-10  gap-6 ">
        {/* General Info */}
        <div className="border bg-white col-span-2 rounded-xl p-4 w-auto h-[800px]">
          {/* title */}
          <h2 className=" core mt-4 ">General Information</h2>
          <div className="mt-4 flex flex-col items-start justify-center gap-6 ">
            <div className="w-full ">
              <label className="inputlabel">Product Name</label>
              <input
                className="input"
                name="productTitle"
                onChange={handleInputChange}
                type="text"
                placeholder="Iphone 11 Pro"
              />
              <p className="inputfooter ">
                A product name is required and recommended to be unique.
              </p>
            </div>

            <div className="w-full ">
              <label className="inputlabel">Product Description</label>
              <input
                className="input"
                name="description"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
              <p className="inputfooter ">
                Set a description to the product for better visibility.
              </p>
            </div>
            <div className="w-full ">
              <label className="inputlabel">Brand’s Name</label>
              <input
                className="input"
                name="brand"
                onChange={handleInputChange}
                type="text"
                placeholder="Samsung"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">SKU (Stock Keeping Unit)</label>
              <input
                className="input"
                name="sku"
                onChange={handleInputChange}
                type="text"
                placeholder="783kl32"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Product base price</label>
              <input
                className="input"
                name="price"
                onChange={handleInputChange}
                placeholder="290,000"
              />
            </div>
            {/* Level */}
            <section className="flex gap-[18px]">
              <div className="w-full ">
                <label className="inputlabel">Stock Level</label>
                <input
                  className="input"
                  name="stock"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="20"
                />
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
                  {modal && (
                    <Modal
                      formData={formData}
                      setFormData={setFormData}
                      cat={cat}
                      setCat={setCat}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Image update */}
        <div className="border bg-white rounded-xl p-4 w-auto h-[536px]">
          <h2 className="core mb-4 ">Product Image</h2>
          <p className="text-[14px] font-medium text-[#475367] ">
            Set the product media gallery
          </p>
          <div
            onClick={handleClick}
            className="p-4 flex w-full border-[1.5px] rounded-md h-[417px] border-dashed border-[#D0D5DD]  items-center justify-center flex-col "
          >
            <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6 ">
              <FiUploadCloud size={25} />
            </div>
            <div>
              <h3 className="text-[14px] text-center text-[#475367] ">
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
            <input
              id="file-upload"
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              className="hidden"
              onChange={handleFileSelect}
              multiple
            />
          </div>
        </div>

        {/* Product spec and key feautures */}
        <section className="h-auto col-span-2 w-auto flex flex-col gap-3 rounded-xl ">
          <div className="bg-white w-full rounded-xl px-6 py-8 pb-12 flex flex-col gap-3 h-auto ">
            <h2 className=" core  ">Product Specifications</h2>
            <div className="w-full ">
              <label className="inputlabel">Size (L x W x H) cm</label>
              <input
                className="input"
                name="productTitle"
                onChange={handleInputChange}
                type="number"
                placeholder="20 15 16"
              />
              <p className="inputfooter ">
                Ensure Measurements are in Centimetres
              </p>
            </div>
            <div className="w-full ">
              <label className="inputlabel">Weight (Kg)</label>
              <input
                className="input"
                name=""
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Model Number</label>
              <input
                className="input"
                name=""
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Main Material</label>
              <input
                className="input"
                name=""
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full">
              <label className="inputlabel">Color</label>
              <input
                className="input"
                name="productTitle"
                onChange={handleInputChange}
                type="text"
                placeholder="Iphone 11 Pro"
              />
            </div>
          </div>
          <div className="bg-white w-full rounded-xl px-6 py-8 pb-12 flex flex-col gap-3 h-auto ">
            <h2 className=" core  ">Key Feautres</h2>
            <div className="w-full ">
              <label className="inputlabel">Feature 1</label>
              <input
                className="input"
                name="feature1"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 1</label>
              <input
                className="input"
                name="feature1"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 1</label>
              <input
                className="input"
                name="feature1"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 1</label>
              <input
                className="input"
                name="feature1"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 2</label>
              <input
                className="input"
                name="feature2"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 3</label>
              <input
                className="input"
                name="feature3"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 4</label>
              <input
                className="input"
                name="feature4"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 5</label>
              <input
                className="input"
                name="feature5"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 6</label>
              <input
                className="input"
                name="feature6"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 7</label>
              <input
                className="input"
                name="feature7"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Display selected image files */}
      <div className="h-[400px] w-[400px] absolute top-[40rem] -right-8 flex flex-col gap-2  col-span-1 rounded-xl">
        {selectedFile?.map((d, id) => {
          console.log(d);
          const handleRemoveFile = (fileIndex) => {
            setSelectedFile((prevFiles) =>
              prevFiles.filter((_, index) => index !== fileIndex)
            );
          };
          return (
            <div
              key={id}
              className="w-full  px-4 flex justify-between items-center bg-white rounded-[10px] h-[86px]"
            >
              <p>{d.name}</p>
              <p
                className="pointer"
                onClick={() => {
                  handleRemoveFile(id);
                }}
              >
                cancel
              </p>
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit} className="h-[50px] rounded-xl w-[400px] ">
        create
      </button>
    </div>
  );
}

export default Form;
