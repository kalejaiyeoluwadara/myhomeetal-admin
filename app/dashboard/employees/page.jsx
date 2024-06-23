import React from "react";
import Welcome from "./Welcome";
import Table from "../Table";
import Status from "./Status";
function Page() {
  return (
    <div className="w-full p-[36px] relative bg-screen   min-h-screen overflow-y-scroll ">
      <Welcome />
      <Status />
      <Table />
    </div>
  );
}

export default Page;
