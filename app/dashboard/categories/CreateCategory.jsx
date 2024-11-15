"use client";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobal } from "@/app/context";
import Image from "next/image";
import FormData from "form-data";

function CreateCategory({ fetchCategories }) {
  const { createCat, setCreateCat, token, openModal } = useGlobal();
  const [formContent, setFormContent] = useState({
    categoryName: "",
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormContent({ ...formContent, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormContent({ ...formContent, coverImage: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", formContent.categoryName);
    if (formContent.coverImage) {
      formData.append("category-image", formContent.coverImage);
    }

    const url = "https://server.myhomeetal.store/api/v1/product-category";

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
        console.log("Category created:", result);
        setSuccess("Category created successfully");
        setFormContent({
          categoryName: "",
          coverImage: null,
        });
        setCreateCat(false);
        openModal("Created category successfully.", true);
        fetchCategories();
      } else {
        const result = await response.json();
        console.log("Error encountered:", result);
        setError(result.message || "Failed to create category");
        openModal("Failed to create category", false);
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred while creating category");
      openModal("Failed to create category", false);
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    setCreateCat(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      {createCat && (
        <div className="h-screen fixed -translate-x-12 top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25">
          <div className="w-[400px] ml-[270px] h-auto p-6 bg-white rounded-2xl flex items-center justify-start flex-col">
            <h2 className="core">Create a Category</h2>
            <div className="w-full">
              <p className="mt-4 text-[#475367] text-[14px]">
                Upload a cover image
              </p>
              <div className="h-[245px] w-full flex-col rounded-lg border-dashed border cursor-pointer center border-gray-300">
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
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="w-full h-[44px] rounded-[8px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full h-[44px] rounded-[8px] bg-primary text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateCategory;
