"use client";
import React, { useState, useEffect } from "react";
import { useGlobal } from "@/app/context";
import Loading from "@/app/dashboard/components/Loading";
import CreateCategory from "../categories/CreateCategory";
import CatCard from "../categories/comp/CatCard";
import UpdateCategory from "../categories/comp/UpdateCategory";
import Welcome from "./components/Welcome";
import SubcategoryModal from "../products/addproducts/comp/SubCategoryModal";
import SubCategoryCard from "./components/SubCategoryCard";
function Page() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useGlobal();
  const [itemId, setItemId] = useState("");
  const [details, setDetails] = useState({
    name: "",
    image: "",
  });
  const fetchSubCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.myhomeetal.store/api/v1/sub-category/all",
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
          `Failed to fetch subCategories: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setSubCategories(data.data);
      console.log(data);
    } catch (error) {
      console.error("An error occurred while fetching subCategories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
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
          {subCategories != undefined &&
            subCategories?.map((d, id) => {
              const { _id, name, products, subCategoryImage } = d;
              return (
                <SubCategoryCard
                  name={name}
                  subCategoryImage={subCategoryImage}
                  amt={products.length}
                  _id={_id}
                  key={_id}
                  setItemId={setItemId}
                  category={d}
                  setDetails={setDetails}
                  details={details}
                />
              );
            })}
        </div>
      )}
      <CreateCategory fetchCategories={fetchSubCategories} />
      <UpdateCategory
        setItemId={setItemId}
        itemId={itemId}
        fetchCategories={fetchSubCategories}
        details={details}
        setDetails={setDetails}
      />
    </div>
  );
}

export default Page;
