import React from "react";
import Welcome from "./comp/Welcome";
import ItemCard from "./comp/ItemCard";
function Page() {
  return (
    <div className="w-full  p-[36px] bg-screen min-h-screen overflow-y-scroll ">
      <Welcome />
      <div className="w-full flex flex-col gap-6 my-[34px] ">
        {[1, 2, 3, 4, 5, 6, 7].map((d, id) => {
          return <ItemCard />;
        })}
      </div>
    </div>
  );
}

export default Page;
