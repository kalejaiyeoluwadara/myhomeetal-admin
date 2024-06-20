import React from "react";
import Welcome from "./comp/Welcome";
import Image from "next/image";
import prod from "../../../assets/prod.svg";
function Page() {
  return (
    <div className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <div className="w-full mt-[34px] ">
        <div className="border w-full flex px-[] ">
          <div>
            <Image src={prod} alt="" className="" />
          </div>
          <div>
            <p>
              Product Name: Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13
            </p>
            <p>Prod Description: ₦145,600</p>
            <p>SKU</p>
            <p>SKU</p>
            <p>Remove Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
