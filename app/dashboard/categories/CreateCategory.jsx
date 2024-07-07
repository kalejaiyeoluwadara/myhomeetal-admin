"use client";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobal } from "@/app/context";
import Image from "next/image";

function CreateCategory() {
  const { createCat, setCreateCat } = useGlobal();
  const [formData, setFormData] = useState({
    categoryName: "newcat",
    coverImage:
      "https://tse3.mm.bing.net/th?id=OIP.sa1g4nyMFk6pjNllFb41PQHaEK&pid=Api&P=0&h=220",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const validateForm = () => {
    if (!formData.categoryName.trim()) {
      setError("Category name is required.");
      return false;
    }
    if (!formData.coverImage) {
      setError("Cover image is required.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setError(null);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("categoryName", formData.categoryName);
        formDataToSend.append("coverImage", formData.coverImage);

        const response = await fetch(
          "https://my-home-et-al-backend.onrender.com/api/v1/product-category",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o`,
            },
            body: formDataToSend,
          }
        );

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (response.ok) {
            setSuccess("Category created successfully!");
            setFormData({ categoryName: "", coverImage: null });
          } else {
            setError(data.message || "Failed to create category.");
          }
        } else {
          // Handle non-JSON response
          const text = await response.text();
          setError(`Unexpected response: ${text}`);
          // setShowModal(true);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        setError("Failed to create category.");
        // setShowModal(true);
      } finally {
        setLoading(false);
      }
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
        <form
          onSubmit={handleSubmit}
          className="h-screen fixed -translate-x-12 top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25 "
        >
          <div className="w-[400px] ml-[270px] h-auto p-6 bg-white rounded-2xl flex items-center justify-start flex-col ">
            <h2 className="core">Create a Category</h2>
            <div>
              <p className="mt-4 text-[#475367] text-[14px]  ">
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
                  className="h-full flex flex-col items-center justify-center"
                >
                  <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6 ">
                    <FiUploadCloud size={25} />
                  </div>
                  <h3 className="text-[14px] text-center text-[#475367] ">
                    <span className="text-[14px] text-[#ED2224] ">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </h3>
                  <p className="text-[12px] text-center text-[#98A2B3]  ">
                    Max number of file 10 - SVG, PNG, JPG or GIF (max.
                    800x400px)
                  </p>
                </label>
              </div>
            </div>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="h-[70px] mt-3 w-full bg-[#F4F4F4] px-4 mb-[20px] rounded-[10px] "
              placeholder="Category Name"
            />
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="w-full h-[44px] rounded-[8px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full h-[44px] rounded-[8px] bg-blue-500 text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default CreateCategory;
