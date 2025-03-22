"use client";
import React from "react";
import Welcome from "./comp/Welcome";
import Status from "./comp/Status";
import List from "./comp/List";
import Transact from "./comp/Transact";
import useData from "@/hooks/useData";
import { ApiRoutes } from "@/app/api/apiRoute";
Status;
function Page() {
  const { data, loading } = useData(`${ApiRoutes.BASE_URL}admin-wallet`);
  return (
    <div className="w-full p-[36px] bg-screen   min-h-screen overflow-y-scroll ">
      <Welcome />
      <Status data={data} loading={loading} />
      <List />
      <Transact />
    </div>
  );
}

export default Page;
