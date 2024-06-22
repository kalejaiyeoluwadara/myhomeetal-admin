"use client";
import React, { useEffect } from "react";
import Welcome from "./Welcome";
import Details from "./Details";
import Chart from "./Chart";
import Table from "./Table";

const Page = () => {
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "https://my-home-et-al-backend.onrender.com/api/v1/admin/get-admins",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2E3MWRhZjBlODBlOTI0MTRiOGIxYiIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxNTEwNjI5NSwiZXhwIjoxNzE1MTI3ODk1fQ.YNwDEfgcQxHh_dpLWfV6zVC4cVlin7vCXJ757RNP7sE",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error(
            "Failed to fetch admins:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred while fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []); // Empty dependency array to run only once

  return (
    <div className="w-full p-[36px] bg-[#F9FAFB] min-h-screen overflow-y-scroll">
      <Welcome />
      <Details />
      <Chart />
      <Table />
    </div>
  );
};

export default Page;
