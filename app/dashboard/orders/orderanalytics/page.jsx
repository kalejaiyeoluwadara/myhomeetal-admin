import React from "react";
import Welcome from "./comp/Welcome";
import Status from "../comp/Status";
import Charts from "../../Chart";

function Page() {
  return (
    <div className="w-full p-[36px] bg-screen   min-h-screen overflow-y-scroll ">
      <Welcome />
      <Status />
      <Charts />
    </div>
  );
}

export default Page;
