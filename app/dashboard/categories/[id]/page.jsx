"use client";
import React, { useState, useEffect } from "react";
import Welcome from "./comp/Welcome";
import ItemCard from "./comp/ItemCard";
import Loading from "../../components/Loading";
import { useGlobal } from "@/app/context";
import { useRouter } from "next/navigation";
function Page({ params }) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, openModal } = useGlobal();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/product-category/delete-category/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        openModal("Error deleting category", false);
      }
      const data = await response.json();
      console.log("Response from server:", data);
      openModal("Category Deleted!", true);
      setTimeout(() => {
        router.push("/dashboard/categories");
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
      openModal("Error deleting category", false);
    }
  };
  const fetchCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/product/category/${params.id}`,
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
          `Failed to fetch categories: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }
      const data = await response.json();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <Welcome
        category={category}
        handleDelete={handleDelete}
        id={category[0]?.category.name}
      />
      {loading ? (
        <Loading loading={true} />
      ) : category.length === 0 ? (
        <div className="w-full flex justify-center mt-20 items-center my-[34px]">
          <p>No items available</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6 my-[34px]">
          {category.map((d, id) => {
            const { brand, description, price, productTitle, images, _id } = d;
            return (
              <ItemCard
                key={id}
                fetchCategory={fetchCategory}
                brand={brand}
                description={description}
                price={price}
                productTitle={productTitle}
                images={images}
                id={_id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Page;
