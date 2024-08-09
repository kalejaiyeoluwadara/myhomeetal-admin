"use client";
import React, { useEffect, useState } from "react";
import Welcome from "./comp/Welcome";
import bag from "@/app/assets/bag1.svg";
import shop from "@/app/assets/shop.svg";
import Table from "./comp/TableOrd";
import Data from "./comp/Data";
import Image from "next/image";
import useData from "@/hooks/useData";
import { filterDataByDate } from "@/utils/FilterByDate";
import { useGlobal } from "@/app/context";
function Page() {
  const { token } = useGlobal();
  const { data: order, loading } = useData(
    "https://my-home-et-al.onrender.com/api/v1/order"
  );
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://my-home-et-al.onrender.com/api/v1/product/all-products",
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
          `Failed to fetch products: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products && products.length > 0) {
      const low = products.filter((product) => product.inventory?.quantity < 5);
      setLowStockProducts(low);
    } else {
      console.log("none");
    }
  }, [products]);
  const today = filterDataByDate(order, "today");
  const week = filterDataByDate(order, "this week");
  const data = [
    {
      title: "Today Sales",
      item: today?.length,
      img: shop,
    },
    {
      title: "Weekly Sales",
      item: week?.length,
      img: bag,
    },
  ];
  return (
    <main className="w-full p-6 bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <section className=" mt-6 gap-6 grid grid-cols-2 w-full ">
        {data.map((d, id) => {
          return (
            <div
              key={id}
              className="w-auto h-[195px] flex justify-center items-start flex-col rounded-[12px] px-6 gap-8   border border-border bg-white"
            >
              <div className="flex gap-3 center">
                <div
                  className={`h-[32px] rounded-[8px] center  ${
                    d.img === shop ? " bg-[#E7F6EC]" : "bg-[#FFF1F1]"
                  } text-[#FF6567] w-[32px] `}
                >
                  <Image className="" src={d.img} alt="" />
                </div>
                <p className="grey">{d.title}</p>
              </div>
              <div>
                <p className="text-[32px] font-semibold  ">{d.item}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-3 mt-6 w-full h-[568px] gap-4">
        <Table />
        {/* Stock alert */}
        <div className="w-auto  bg-white border rounded-xl h-full ">
          <section className="w-full flex items-center justify-between px-[16px]  h-[68px] ">
            <h2 className="font-semibold text-base ">Stock Alert</h2>
          </section>
          {/* data */}
          <section className="mt-3">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((d, id) => {
                return <Data {...d} key={id} />;
              })
            ) : (
              <p className="text-center">No Stock Alert</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Page;
