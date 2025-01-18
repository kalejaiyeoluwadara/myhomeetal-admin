"use client";
import { useGlobal } from "@/app/context";
import React, { useState } from "react";
import { BsChevronBarUp, BsChevronDown } from "react-icons/bs";

function FilterDropdown({ filter, setFilter }) {
  const [modal, setModal] = useState(false);
  const filterOptions = ["this week", "last week", "recently"];

  return (
    <div
      onClick={() => setModal((prev) => !prev)}
      className="flex cursor-pointer relative border rounded-[8px] center grey gap-2 px-3 py-[6px]"
    >
      <p className="text-[14px] capitalize font-medium">{filter}</p>
      {modal ? <BsChevronBarUp /> : <BsChevronDown size={20} />}
      {modal && (
        <div className="w-[136px] grey px-2 py-4 h-auto border rounded-xl absolute -bottom-[140px] bg-white">
          {filterOptions.map((option, id) => (
            <p
              key={id}
              onClick={() => {
                setFilter(option);
                setModal(false);
              }}
              className="py-1 px-2 capitalize rounded-md pointer hover:bg-red-50"
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Page() {
  const [filter, setFilter] = useState("this week");
  const [image, setImage] = useState(null);
  const { openModal } = useGlobal();
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      openModal("Select an image", false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("filter", filter);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        openModal("Image uploaded successfully!", true);
      } else {
        openModal("Failed to upload image.", true);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <div className="flex mb-[50px] gap-3">
        <h3 className="text-2xl font-semibold">Banners</h3>
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>
      <div className="w-full bg-white rounded-md px-12 py-8">
        <div
          className="border-[2px] w-full h-[230px] rounded-[20px] border-dashed p-2 px-4 flex items-center justify-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label
            htmlFor="imageInput"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="max-h-full max-w-full rounded-md"
              />
            ) : (
              <>
                <p>Drag and drop an image here, or click to select</p>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-red-600"
        >
          Submit
        </button>
      </div>
    </main>
  );
}

export default Page;
