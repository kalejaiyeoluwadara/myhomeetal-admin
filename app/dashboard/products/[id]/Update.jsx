"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
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

function Form({ id }) {
  const [disctype, SetDiscType] = useState("No Discount");
  const [modal, setModal] = useState(false);
  const [disc, setDisc] = useState(0);
  const [discModal, setDiscModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    productTitle: "",
    price: 0,
    category: "",
    description: "",
    brand: "",
    stock: 0,
    sku: "",
    inventory: 0,
    image: [],
  });
  const [cat, setCat] = useState("");

  // Handling submit
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/product/${id}`,
        {
          method: "PUT",
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
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkyMDAzMzliNjhkM2QyMTg4YTQ0NSIsImlhdCI6MTcxODE4Njk2NywiZXhwIjoxNzE4MjA4NTY3fQ.buJN_l5b-35JlUmg5OxTW_39bEcimUKZUDNuxZxWfE",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch admins: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setFormData({
        productTitle: data.productTitle,
        price: data.price,
        category: data.category,
        description: data.description,
        brand: data.brand,
        inventory: data.inventory,
        image: data.images,
      });
      console.log(data);
      console.log(data.category);
      setCat(data.category);
    } catch (error) {
      console.error("An error occurred while fetching admins:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClick = () => {
    // Trigger click on the file input element
    document.getElementById("file-upload").click();
  };
  return (
    <main className="mb-40 w-full">
      <main className="grid w-full grid-cols-3 mt-10  gap-6 ">
        {/* Main form */}
        <div className="border bg-white col-span-2 rounded-xl p-4 w-auto h-[900px]">
          {/* title */}
          <h2 className=" core mt-4 ">General Information</h2>
          <section className="mt-4 flex flex-col items-start justify-center gap-6 ">
            <div className="w-full ">
              <label className="inputlabel">Product Name</label>
              <input
                className="input"
                name="productTitle"
                value={formData?.productTitle}
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
                value={formData?.description}
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
                value={formData?.brand}
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
                value={formData?.sku}
                onChange={handleInputChange}
                type="text"
                placeholder="783kl32"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Product base price</label>
              <input
                className="input"
                value={formData?.price}
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
                  value={formData?.stock}
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
                  <p>{cat}</p>
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
          </section>
        </div>
        <div className="h-auto w-auto bg-white flex flex-col gap-2  rounded-xl">
          {formData?.image.map((d, id) => {
            const handleRemoveFile = (fileIndex) => {
              setSelectedFile((prevFiles) =>
                prevFiles.filter((_, index) => index !== fileIndex)
              );
            };
            return (
              <div
                key={id}
                className="w-full  px-8 flex justify-between items-center bg-white rounded-[10px] h-[100px]"
              >
                <img
                  src={d}
                  className=" h-[60px] w-[60px] rounded-md object-cover "
                  alt=""
                />
                <p
                  className="pointer text-primary "
                  onClick={() => {
                    handleRemoveFile(id);
                  }}
                >
                  <LiaTimesSolid size={30} />
                </p>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md w-full h-[60px]"
        >
          Update
        </button>
      </main>
      {/* Display selected image files */}
    </main>
  );
}

export default Form;
