"use client";
import { useGlobal } from "@/app/context";
import Image from "next/image";
import formData from "form-data";
import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Modal = ({ cat, categories, setCat, setformContent, formContent }) => {
  return (
    <div className="flex flex-col h-auto top-24 p-4 right-2 w-[200px] rounded-xl border bg-white absolute z-20 ">
      {categories.map((d, id) => {
        return (
          <p
            key={id}
            onClick={() => {
              setformContent({ ...formContent, category: d._id });
              setCat(d.name);
            }}
            className="px-2 text-[12px] rounded-md cursor-pointer hover:bg-red-50 py-2"
          >
            {d.name}
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
  const [formContent, setformContent] = useState({
    productTitle: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    inventory: 0,
    sku: "",

    size: "",
    weight: "",
    modelno: "",
    mainmaterial: "",
    color: "",
    fit1: "",
    fit2: "",
    fit3: "",
    fit4: "",
    fit5: "",
    fit6: "",
    images: [],
  });
  const router = useRouter();
  const { token, openModal } = useGlobal();
  const [cat, setCat] = useState("");
  const [loading, setLoading] = useState(false);
  // Handling submit
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("productTitle", formContent.productTitle);
    formData.append("price", formContent.price);
    formData.append("category", formContent.category);
    formData.append("description", formContent.description);
    formData.append("brand", formContent.brand);
    formData.append("inventory", formContent.inventory);
    formData.append("weight", formContent.weight);
    formData.append("modelNumber", formContent.modelno);
    formData.append("mainMaterial", formContent.mainmaterial);
    formData.append("color", formContent.color);
    formData.append("keyFeatures", [formContent.fit1]);
    formData.append("keyFeatures", [formContent.fit2]);
    formData.append("keyFeatures", [formContent.fit3]);
    formData.append("keyFeatures", [formContent.fit4]);
    formData.append("keyFeatures", [formContent.fit5]);
    formData.append("keyFeatures", [formContent.fit6]);
    // formContent.images.forEach((file, index) => {
    //    formData.append("images", file); // Field name should match 'images'
    //  });
    try {
      const response = await fetch(
        `https://my-home-et-al.onrender.com/api/v1/product/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        openModal("Product updated!", true);
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 1000);
        console.log("Response from server:", data);
        console.log(formContent.category);
      } else {
        openModal("Error updating product!");
        console.log(formContent.category);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      console.log(formContent.category);

      openModal("Error updating product!");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://my-home-et-al.onrender.com/api/v1/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch product: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setformContent({
        productTitle: data.productTitle || "",
        price: data.price || 0,
        category: data.category || "",
        description: data.description || "",
        brand: data.brand || "",
        inventory: data.inventory.quantity || "",
        images: data.images || [],
        mainmaterial: data.mainMaterial || "",
        weight: data.weight || "",
        color: data.color || "",
        size: data.size || "",
        sku: data.sku || "",
        modelno: data.modelNumber || "",
        fit1: data.keyFeatures[0] || "",
        fit2: data.keyFeatures[1] || "",
        fit3: data.keyFeatures[2] || "",
        fit4: data.keyFeatures[3] || "",
        fit5: data.keyFeatures[4] || "",
        fit6: data.keyFeatures[5] || "",
      });
      setCat(data.category.name);
    } catch (error) {
      console.error("An error occurred while fetching product:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://my-home-et-al.onrender.com/api/v1/product/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Product deleted!");
        openModal("Product deleted successfully.", true);
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error("Error deleting data:", errorData);
        openModal("Error encountered, product does not exist.", false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      openModal("Error encountered.", false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformContent({ ...formContent, [name]: value });
  };
  const handleClick = () => {
    // Trigger click on the file input element
    document.getElementById("file-upload").click();
  };
  const { categories } = useGlobal();
  const [catItem, setCatItem] = useState([]);

  useEffect(() => {
    setCatItem(categories);
  }, []);
  const {
    productTitle,
    price,
    category,
    description,
    brand,
    inventory,
    sku,
    size,
    weight,
    modelno,
    mainmaterial,
    color,
    fit1,
    fit2,
    fit3,
    fit4,
    fit5,
    fit6,
  } = formContent;
  return (
    <main key={id} className="mb-40 w-full">
      <div className="flex  items-center justify-between">
        <section className="flex gap-4 text-end justify-end items-end">
          <h2 className="text-2xl font-semibold ">Edit an Existing Product</h2>
          <p
            onClick={handleDelete}
            className="text-primary text-lg font-semibold "
          >
            Delete Product
          </p>
        </section>
        <section className="flex gap-6">
          <Link href={"/dashboard/products"}>
            <div className=" text-[16px] font-medium p-4 rounded-[99px] flex items-center justify-center bg-white border-primary border-[1.5px] text-primary gap-2 ">
              <LiaTimesSolid size={20} />
              Cancel
            </div>
          </Link>
          <button
            onClick={handleSubmit}
            className={`text-base ${
              loading ? "bg-gray-500 text-white" : ""
            } font-medium p-4 rounded-[99px] w-[166px] flex items-center justify-center gap-2 `}
          >
            {/* <FaPlus size={20} /> */}
            Save Product
          </button>
        </section>
      </div>
      <main className="grid w-full grid-cols-3 mt-10  gap-6 ">
        {/* Main form */}
        <div className="border bg-white col-span-2 rounded-xl p-4 w-auto h-[800px]">
          {/* title */}
          <h2 className=" core mt-4 ">Product Information</h2>
          <section className="mt-4 flex flex-col items-start justify-center gap-6 ">
            <div className="w-full ">
              <label className="inputlabel">Product Name</label>
              <input
                className="input"
                name="productTitle"
                value={productTitle}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
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
                value={description}
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
                value={brand}
                name="brand"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">SKU (Stock Keeping Unit)</label>
              <input
                className="input"
                name="sku"
                value={sku}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Product base price</label>
              <input
                className="input"
                value={price}
                name="price"
                onChange={handleInputChange}
                placeholder="Enter Subject"
              />
            </div>
            {/* Level */}
            <section className="flex gap-[18px]">
              <div className="w-full ">
                <label className="inputlabel">Stock Level</label>
                <input
                  className="input"
                  name="inventory"
                  value={inventory}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter Subject"
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
                  <p>{cat ? cat : "Select Category"}</p>
                  <GoChevronDown />
                  {modal && (
                    <Modal
                      formContent={formContent}
                      setformContent={setformContent}
                      cat={cat}
                      categories={catItem}
                      setCat={setCat}
                    />
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
        {/* Image listing */}
        <div className="h-auto w-auto bg-white flex flex-col gap-2  rounded-xl">
          {formContent?.images.map((d, id) => {
            const handleRemoveFile = (fileIndex) => {
              setformContent((prevContent) => ({
                ...prevContent,
                images: prevContent.images.filter(
                  (_, index) => index !== fileIndex
                ),
              }));
            };
            return (
              <div
                key={id}
                className="h-auto w-auto bg-white flex flex-col gap-2 rounded-xl"
              >
                <div className="w-full px-8 flex justify-between items-center bg-white rounded-[10px] h-[100px]">
                  <img
                    src={d}
                    className="h-[60px] w-[60px] rounded-md object-cover"
                    alt=""
                  />
                  <p
                    className="pointer text-primary"
                    onClick={() => {
                      handleRemoveFile(id);
                    }}
                  >
                    <LiaTimesSolid size={30} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Spec */}
        <section className="h-auto col-span-2 w-auto flex flex-col gap-3 rounded-xl ">
          <div className="bg-white w-full rounded-xl px-6 py-8 pb-12 flex flex-col gap-3 h-auto ">
            <h2 className=" core  ">Product Specifications</h2>
            <div className="w-full ">
              <label className="inputlabel">Size (L x W x H) cm</label>
              <input
                className="input"
                name="size"
                value={size}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
              <p className="inputfooter">
                Ensure Measurements are in Centimetres
              </p>
            </div>
            <div className="w-full ">
              <label className="inputlabel">Weight (Kg)</label>
              <input
                className="input"
                name="weight"
                value={weight}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Model Number</label>
              <input
                className="input"
                name="modelno"
                value={modelno}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Main Material</label>
              <input
                className="input"
                name="mainmaterial"
                value={mainmaterial}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Subject"
              />
            </div>
            <div className="w-full">
              <label className="inputlabel">Color</label>
              <input
                className="input"
                name="color"
                value={color}
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
                name="fit1"
                value={fit1}
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 2</label>
              <input
                className="input"
                value={fit2}
                name="fit2"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 3</label>
              <input
                className="input"
                name="fit3"
                value={fit3}
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 4</label>
              <input
                className="input"
                value={fit4}
                name="fit4"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 5</label>
              <input
                className="input"
                value={fit5}
                name="fit5"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
            <div className="w-full ">
              <label className="inputlabel">Feature 6</label>
              <input
                className="input"
                value={fit6}
                name="fit6"
                onChange={handleInputChange}
                type="text"
                placeholder="Please Enter a Unique Feature that the Product Offers"
              />
            </div>
          </div>
        </section>
      </main>
    </main>
  );
}

export default Form;
