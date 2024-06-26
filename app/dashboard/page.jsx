"use client";
import React, { useEffect } from "react";
import Welcome from "./Welcome";
import Details from "./Details";
import Chart from "./Chart";
import Table from "./Table";

const Page = () => {
  return (
    <div className="w-full p-[36px] bg-[#F9FAFB] min-h-screen overflow-y-scroll">
      <Welcome />
      <Details />
      {/* <Chart /> */}
      <Table />
    </div>
  );
};

export default Page;
