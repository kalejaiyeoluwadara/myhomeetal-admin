import React from "react";
import Welcome from "./comp/Welcome";
import CatCard from "./comp/CatCard";
function Page() {
  // const list = ["My Phone & Tablets"];
  return (
    <div className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <div className="w-full flex flex-col gap-[22px] mt-[49px]">
        {[1, 2, 3, 4, 5, 6].map((d, id) => {
          return <CatCard />;
        })}
      </div>
    </div>
  );
}

export default Page;
