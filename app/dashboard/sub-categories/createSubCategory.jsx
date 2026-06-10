"use client";
import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useGlobal } from "@/app/context";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import FormData from "form-data";
import useData from "@/hooks/useData";
import CategoryModal from "./components/CategoryModal";
import { ApiRoutes } from "@/app/api/apiRoute";
function CreateSubCategory() {
  const {
    isCreateSubCategoryOpen,
    setIsCreateSubCategoryOpen,
    token,
    openModal,
  } = useGlobal();
  const { data: categories } = useData(
    `${ApiRoutes.BASE_URL}product-category/categories`
  );
  const [catItem, setCatItem] = useState([]);
  const [formContent, setFormContent] = useState({
    name: "",
    category: "",
    coverImage: null,
  });
  const [name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCatItem(categories.map((d) => ({ _id: d._id, name: d.name })));
    }
  }, [categories]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormContent({ ...formContent, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormContent({ ...formContent, coverImage: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (formContent.category && formContent.coverImage && formContent.name) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", formContent.name);
      formData.append("category", formContent.category);
      if (formContent.coverImage) {
        formData.append("subCategoryImage", formContent.coverImage);
      }

      const url = `${ApiRoutes.BASE_URL}sub-category/create`;

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
          console.log("sub-category created:", result);
          setSuccess("Sub-Category created successfully");
          setFormContent({
            name: "",
            coverImage: null,
          });
          openModal("Created sub-category successfully.", true);
          // fetchSubCategories();
          setTimeout(() => {
            setIsCreateSubCategoryOpen(false);
          }, 1000);
        } else {
          const result = await response.json();
          console.log("Error encountered:", result);
          setError(result.message || "Failed to create sub-category");
          openModal("Failed to create sub-category", false);
        }
      } catch (error) {
        console.log("Error:", error);
        setError("An error occurred while creating sub category");
        openModal("Failed to create sub category", false);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Input all fields");
    }
  };

  const closeForm = () => {
    setIsCreateSubCategoryOpen(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      {isCreateSubCategoryOpen && (
        <div className="h-screen fixed -translate-x-12 top-0 z-40 w-full bg-black flex justify-start items-center bg-opacity-25">
          <div className="w-[400px] ml-[270px] h-auto p-6 bg-white rounded-2xl flex items-center justify-start flex-col">
            <h2 className="core">Create a Sub-category</h2>
            <div className="w-full">
              <p className="mt-4 text-[#475367] text-[14px]">
                Upload a cover image
              </p>
              <div className="h-[100px] mt-3 py-3 w-full flex-col rounded-lg border-dashed border cursor-pointer center border-gray-300">
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
                  <div className="p-3 rounded-full center bg-[#F0F2F5] mb-2">
                    <FiUploadCloud size={15} />
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
              name="name"
              autoComplete="false"
              autoSave="false"
              value={formContent.name}
              onChange={handleInputChange}
              className="h-[50px] mt-3 w-full bg-[#F4F4F4] px-4 mb-[20px] rounded-[10px]"
              placeholder="Category Name"
            />

            {/* category modal */}
            <div
              onClick={() => {
                setModal((prev) => !prev);
              }}
              className="w-full relative "
            >
              <label className="inputlabel">Category</label>
              <div className="w-[250px] border cursor-pointer flex items-center h-[56px] rounded-md  justify-between px-4 ">
                <p>{name ? name : "Select Category"}</p>
                {!modal ? <GoChevronDown /> : <GoChevronUp />}
              </div>
              {modal && (
                <CategoryModal
                  formContent={formContent}
                  setformContent={setFormContent}
                  categories={catItem}
                  setCategoryName={setCategoryName}
                />
              )}
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <div className="flex mt-3 w-full gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="w-[40%] h-[44px] rounded-[8px] bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full h-[44px] rounded-[8px] bg-primary text-white"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Sub-category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateSubCategory;
