"use client";
import React, { useEffect, useState } from "react";
import Table from "./TableOrd";
import { useGlobal } from "@/app/context";
import useData from "@/hooks/useData";
function Welcome() {
  const [id, setId] = useState("");
  useEffect(() => {
    const localId = localStorage.getItem("id");
    setId(localId);
  }, [id]);
  const { data } = useData(
    `https://server.myhomeetal.store/api/v1/admin/${id}`
  );
  return (
    <div>
      <h2 className="text-2xl font-semibold ">
        Welcome{" "}
        <span className="capitalize">
          {data?.fullname ? data.fullname.split(" ")[0] : "admin"}
        </span>
      </h2>
      <p className="text-base text-[#475367] font-medium ">
        What task do you have to do today?
      </p>
    </div>
  );
}

export default Welcome;
