"use client";
import React, { useState } from "react";
import Inner from "./Inner";
import cart from "../../assets/cart.svg";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useParams } from "@/utils/param";
function ProcuctsC() {
  const [emp, setEmp] = useState(false);
  const active = useParams();
  return (
    <div className="flex cursor-pointer  flex-col">
      <div
        onClick={() => {
          setEmp((prev) => !prev);
        }}
        className="flex hover:bg-red-50 pr-1 w-full justify-between items-center "
      >
        <div
          className={`h-[44px]  px-[16px] flex-shrink-0 py-[12px]  rounded-[4px] `}
        >
          <div className={`flex grey gap-3 `}>
            <Image src={cart} alt="" className={`opacity-60 `} />{" "}
            <p>Products</p>{" "}
          </div>
        </div>
        <div>
          {" "}
          <div> {!emp ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
        </div>
      </div>
      {/* contents */}
      {emp && (
        <div>
          <Link href={"/dashboard/products"}>
            <div
              className={` ${
                active === "/dashboard/products" ? "bg-red-50" : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"All Products"} />
            </div>
          </Link>
          {/* Add products */}
          <Link href={"/dashboard/products/addproducts"}>
            <div
              className={` ${
                active === "/dashboard/products/addproducts"
                  ? "bg-red-50"
                  : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Add Products"} />
            </div>
          </Link>

          {/* categories */}
          <Link href={"/dashboard/categories"}>
            <div
              className={` ${
                active === "/dashboard/categories" ? "bg-red-50" : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Categories"} />
            </div>
          </Link>
          <Link href={"/dashboard/products/bulkproduct"}>
            <div
              className={` ${
                active === "/dashboard/products/bulkproduct" ||
                active === "/dashboard/products/bulkproduct/uploads"
                  ? "bg-red-50"
                  : "bg-white"
              }  rounded-[4px] `}
            >
              <Inner name={"Bulk Product"} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProcuctsC;
