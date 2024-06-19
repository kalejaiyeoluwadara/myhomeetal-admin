import React from "react";
import Welcome from "./comp/Welcome";
import Table from "./comp/TableOrders";
import Status from "./comp/Status";

function Page() {
  return (
    <div className="w-full p-[36px] bg-screen   min-h-screen overflow-y-scroll ">
      <Welcome />
      <Status />
      <Table />
    </div>
  );
}

export default Page;
