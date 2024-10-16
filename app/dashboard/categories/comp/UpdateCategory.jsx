"use client";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobal } from "@/app/context";
import FormData from "form-data";
import { useRouter } from "next/navigation";
function UpdateCategory({
  itemId,
  setItemId,
  fetchCategories,
  details,
  setDetails,
}) {
  const router = useRouter();
  const { createCat, setCreateCat, token, openModal } = useGlobal();
  const [formContent, setFormContent] = useState({
    categoryName: details?.name,
    coverImage: details?.image,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormContent({ ...formContent, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormContent({ ...formContent, coverImage: e.target.files[0] });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", formContent.categoryName);
    if (formContent.coverImage) {
      formData.append("category-image", formContent.coverImage);
    }

    const url = `https://my-home-et-al-backend-u0m7.onrender.com/api/v1/product-category/edit-category/${itemId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        openModal("Category Updated, refresh page", true);
        setFormContent({
          categoryName: "",
          coverImage: null,
        });
        setItemId("");
        setDetails({});
      } else {
        const result = await response.json();
        console.log("Error encountered:", result);
        openModal("Category Update Failed!", true);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    setItemId("");
    setDetails({});
  };

  return (
    <>
      {itemId !== "" && (
        <div className="h-screen fixed -translate-x-12 top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25">
          <div className="w-[400px] ml-[270px] h-auto p-6 bg-white rounded-2xl flex items-center justify-start flex-col">
            <h2 className="core">Update Category</h2>
            <div className="w-full">
              <p className="mt-4 text-[#475367] text-[14px]">
                Upload a cover image
              </p>
              <div className="h-[245px] w-full flex-col rounded-lg border-dashed border cursor-pointer center border-gray-300 hover:border-primary  ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="coverImage"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="coverImage"
                  className="h-full w-full flex flex-col items-center justify-center"
                >
                  <div className="h-[56px]  w-[56px] rounded-full center bg-[#F0F2F5] mb-6">
                    <FiUploadCloud size={25} />
                  </div>
                  <h3 className="text-[14px] text-center text-[#475367]">
                    {!formContent.coverImage ? (
                      <span className="text-[14px] text-[#ED2224]">
                        Click to upload
                      </span>
                    ) : (
                      <span className="text-[14px] text-[#ED2224]">
                        Click to change Image
                      </span>
                    )}{" "}
                  </h3>
                  {!formContent.coverImage && (
                    <p className="text-[12px] text-center text-[#98A2B3]">
                      Image formats - SVG, PNG, JPG or GIF
                    </p>
                  )}
                </label>
              </div>
            </div>
            <input
              type="text"
              name="categoryName"
              autoComplete="false"
              autoSave="false"
              value={formContent.categoryName}
              onChange={handleInputChange}
              className="h-[70px] mt-3 w-full bg-[#F4F4F4] px-4 mb-[20px] rounded-[10px]"
              placeholder="Category Name"
            />
            {/* {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>} */}
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="w-full h-[44px] rounded-[8px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="w-full h-[44px] rounded-[8px] bg-primary text-white"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateCategory;
