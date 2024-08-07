"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LiaTimesSolid } from "react-icons/lia";
import { useGlobal } from "@/app/context";
import formData from "form-data";
const Modal = ({ cat, categories, setCat, setformContent, formContent }) => {
  return (
    <div className="flex flex-col h-[250px] overflow-y-scroll no-scrollbar top-[87px] p-4 right-6 w-[250px] rounded-xl border bg-white absolute z-20">
      {categories.map((d, id) => (
        <p
          key={id}
          onClick={() => {
            setformContent({ ...formContent, category: d._id });
            setCat(d.name);
          }}
          className="px-2 text-base rounded-md cursor-pointer hover:bg-red-50 py-2"
        >
          {d.name}
        </p>
      ))}
    </div>
  );
};

function Form() {
  const [disctype, SetDiscType] = useState("No Discount");
  const { openModal } = useGlobal();
  const [cat, setCat] = useState("");
  const [modal, setModal] = useState(false);
  const [disc, setDisc] = useState(0);
  const [discModal, setDiscModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formContent, setformContent] = useState({
    productTitle: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    inventory: 0,
    sku: "",
    stock: "",
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

  // Handling categories fetch

  // Handling files
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    // Limit to 4 files
    if (files.length > 0) {
      setSelectedFile(files);
      setformContent({ ...formContent, images: files });
      openModal("Image Upload Completed", true);
      console.log(formContent.images);
    } else {
      openModal("Error Encountered", true);
    }
  };
  useEffect(() => {
    console.log(formContent.images);
  }, [formContent.images.length]);

  const createProduct = async () => {
    setIsLoading(true);
    const url =
      "https://my-home-et-al.onrender.com/api/v1/product/create-product";
    const formData = new FormData();
    formData.append("productTitle", formContent.productTitle);
    formData.append("images", [
      "https://tse1.mm.bing.net/th?id=OIP._GCVhLmCRPm_W4TOyBrIuQHaEK&pid=Api&P=0&h=220",
    ]);
    formData.append("price", formContent.price);
    formData.append("category", formContent.category);
    formData.append("description", formContent.description);
    formData.append("brand", formContent.brand);
    formData.append("inventory", formContent.inventory);
    formData.append("sku", formContent.sku);
    formData.append("stock", formContent.stock);
    formData.append("size", formContent.size);
    formData.append("weight", formContent.weight);
    formData.append("modelno", formContent.modelno);
    formData.append("mainmaterial", formContent.mainmaterial);
    formData.append("color", formContent.color);
    formData.append("keyFeatures", [
      formContent.fit1,
      formContent.fit2,
      formContent.fit3,
      formContent.fit4,
      formContent.fit5,
      formContent.fit6,
    ]);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product created:", result);
        setformContent({
          productTitle: "",
          price: "",
          category: "",
          description: "",
          brand: "",
          inventory: 0,
          sku: "",
          stock: "",
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
          weight: "",
          images: [],
          review: [],
        });
        openModal("Product Uploaded Successfully", true);
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 3000);
        // console.log(formContent);
      } else {
        console.error("Failed to create product:", response.statusText);
        openModal("Unable to Upload Product", false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      openModal("Unable to Upload Product", false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformContent({ ...formContent, [name]: value });
  };
  const handleClick = () => {
    // Trigger click on the file input element
    document.getElementById("file-upload").click();
  };

  const {
    productTitle,
    price,
    category,
    description,
    brand,
    inventory,
    sku,
    stock,
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
  const router = useRouter();
  const { categories, token } = useGlobal();
  const [catItem, setCatItem] = useState([]);

  useEffect(() => {
    setCatItem(categories.map((d) => ({ _id: d._id, name: d.name })));
    console.log("Fetched!");
  }, []);

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
          <button
            onClick={createProduct}
            className={` text-[16px] ${
              isLoading ? "bg-gray-500 text-white " : ""
            } font-semibold px-4 py-2 rounded-[8px] flex items-center justify-center gap-2 `}
          >
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
                value={productTitle}
                name="productTitle"
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
                name="brand"
                value={brand}
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
                name="price"
                value={price}
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
                  name="stock"
                  value={stock}
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
                <div className="w-[250px] border cursor-pointer flex items-center h-[56px] rounded-md  justify-between px-4 ">
                  <p>{cat ? cat : "Select Category"}</p>
                  {!modal ? <GoChevronDown /> : <GoChevronUp />}
                </div>
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
            </section>
          </div>
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
              <h3 className="text-[14px] text-center text-[#475367] ">
                <span className="text-[14px] text-[#ED2224] ">
                  Click to upload
                </span>{" "}
                or drag and drop
              </h3>
              <p className="text-[12px] text-center text-[#98A2B3]  ">
                Max number of file 4 - SVG, PNG, JPG or GIF (max. 800x400px)
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

            <button
              onClick={handleClick}
              className="w-[118px] center h-[36px] rounded-md text-[14px] font-semibold "
            >
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
                placeholder="Enter Subject"
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

      {/* Display selected image files */}
      <div className="h-[400px] w-[400px] absolute items-end top-[40rem] -right-2 flex flex-col gap-2  col-span-1 rounded-xl">
        {selectedFile?.map((d, id) => {
          const handleRemoveFile = (fileIndex) => {
            setSelectedFile((prevFiles) =>
              prevFiles.filter((_, index) => index !== fileIndex)
            );
          };
          return (
            <div
              key={id}
              className="w-[300px]   px-4 flex justify-between items-center bg-white rounded-[10px] h-[86px]"
            >
              <p className="truncate">{d.name}</p>
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
    </div>
  );
}

export default Form;
