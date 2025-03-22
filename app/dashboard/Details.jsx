"use client";
import React from "react";
import Revenue from "./components/Revenue";
import ActiveUsers from "./components/ActiveUsers";
import TotalUsers from "./components/TotalUsers";
import Loadtime from "./components/Loadtime";
import useData from "../../hooks/useData";
import { ApiRoutes } from "../api/apiRoute";
function Details() {
  const { data } = useData(`${ApiRoutes.BASE_URL}user/all-users`);
  return (
    <div className="w-full grid grid-cols-4 gap-[10px] my-[45px] ">
      <Revenue />
      <ActiveUsers data={data} />
      <TotalUsers data={data} />
      <Loadtime />
    </div>
  );
}

export default Details;
