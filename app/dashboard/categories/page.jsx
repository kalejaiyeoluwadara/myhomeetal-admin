"use client";
import React, { useState, useEffect } from "react";
import Welcome from "./comp/Welcome";
import CatCard from "./comp/CatCard";
import CreateCategory from "./CreateCategory";
import { useGlobal } from "@/app/context";

function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/product-category/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
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
      setCategories(data);
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
        <p className="h-[60vh] w-full center">Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="w-full flex flex-col gap-[22px] mt-[49px]">
          {categories.map((d, id) => {
            const { _id, name, products } = d;
            return (
              <CatCard
                name={name}
                amt={products.length}
                _id={_id}
                key={_id}
                category={d}
              />
            );
          })}
        </div>
      )}
      <CreateCategory />
    </div>
  );
}

export default Page;
