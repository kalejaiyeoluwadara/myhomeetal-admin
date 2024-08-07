"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import logo from "@/app/assets/logo.svg";
import { useGlobal } from "@/app/context";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import check from "@/app/assets/check.svg";
import { FiLogOut } from "react-icons/fi";
import cancel from "@/app/assets/cancel.svg";
import logouts from "@/app/assets/logout.svg";

function CatCard({ name, amt, _id, product_category_image }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isConfirmOpen, setIsConfirmOpen } = useGlobal();
  useEffect(() => {
    if (isConfirmOpen) {
      const timer = setTimeout(() => {
        setIsConfirmOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmOpen]);
  const [formContent, setFormContent] = useState({
    categoryName: name,
    coverImage: null,
  });
  const handleClick = () => {
    // Trigger click on the file input element
    document.getElementById("file-upload").click();
  };

  const handleFileChange = (e) => {
    setFormContent({ ...formContent, coverImage: e.target.files[0] });
  };
  // useEffect(() => {
  //   handleUpdate();
  //   console.log("updated");
  // }, [formContent.coverImage]);
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", formContent.categoryName);
    if (formContent.coverImage) {
      formData.append("category-image", formContent.coverImage);
    }

    const url = `https://my-home-et-al.onrender.com/api/v1/product-category/edit-category/${_id}`;

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
      } else {
        const result = await response.json();
        console.log("Error encountered:", result);
        setError(result.message || "Failed to create category");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred while creating category");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex relative h-[158px] bg-white w-full justify-between items-center rounded-[22px]  px-6 ">
      <div className="flex items-center justify-center gap-[59px]">
        <div
          onClick={handleClick}
          className="h-[109px] cursor-pointer bg-[#D9D9D9] relative overflow-hidden w-[109px] rounded-[23px] flex items-center justify-center "
        >
          {product_category_image === null ? (
            <Image className="cover" alt="" src={logo} />
          ) : (
            <img
              src={product_category_image}
              className="cover"
              alt="product_category_image"
            />
          )}
          <input
            id="file-upload"
            type="file"
            accept=".png, .jpg, .jpeg, .svg"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="h-[56px] bg-[#F0F2F5] w-[56px] rounded-[23px] flex items-center justify-center text-[#475367]  "></div>
        </div>
        <p>My {name}</p>
      </div>
      <div className="flex gap-[104px] items-center justify-center ">
        <p>
          {amt}
          {amt > 1 ? " products" : " product"}{" "}
        </p>
        <Link href={`/dashboard/categories/${_id}`}>
          <p className="text-[#ED2224] font-light cursor-pointer ">
            Edit Category
          </p>
        </Link>
      </div>
    </section>
  );
}

export default CatCard;
