// Page.js
"use client";
import React, { useState, useEffect } from "react";
import Welcome from "./comp/Welcome";
import CatCard from "./comp/CatCard";
import CreateCategory from "./CreateCategory";
import { useGlobal } from "@/app/context";
import Loading from "@/app/dashboard/components/Loading"; // Import the Loading component
import UpdateCategory from "./comp/UpdateCategory";
import { ApiRoutes } from "@/app/api/apiRoute";

function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useGlobal();
  const [itemId, setItemId] = useState("");
  const [details, setDetails] = useState({
    name: "",
    image: "",
  });
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ApiRoutes.BASE_URL}product-category/categories`,
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
      setCategories(data.data);
      console.log(data);
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <Welcome />
      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="w-full flex flex-col gap-[22px] mt-[49px]">
          {categories &&
            categories.length > 0 &&
            categories.map((d, id) => {
              const {
                _id,
                name,
                products,
                product_category_image,
                subCategory,
              } = d;
              return (
                <CatCard
                  name={name}
                  product_category_image={product_category_image}
                  amt={products.length}
                  _id={_id}
                  key={_id}
                  setItemId={setItemId}
                  category={d}
                  setDetails={setDetails}
                  details={details}
                  subCategory={subCategory}
                />
              );
            })}
        </div>
      )}
      <CreateCategory fetchCategories={fetchCategories} />
      <UpdateCategory
        setItemId={setItemId}
        itemId={itemId}
        fetchCategories={fetchCategories}
        details={details}
        setDetails={setDetails}
      />
    </div>
  );
}

export default Page;
