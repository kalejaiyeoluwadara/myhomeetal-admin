"use client";
import React, { useState, useEffect } from "react";
import Welcome from "./comp/Welcome";
import ItemCard from "./comp/ItemCard";
function Page({ params }) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/product/category/${params.id}`,
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
      setCategory(data);
      console.log(category);
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
    <div className="w-full  p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome id={params.id} />
      <div className="w-full flex flex-col gap-6 my-[34px] ">
        {category.map((d, id) => {
          const { brand, description, price, productTitle, images } = d;
          return (
            <ItemCard
              brand={brand}
              description={description}
              price={price}
              productTitle={productTitle}
              images={images}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
