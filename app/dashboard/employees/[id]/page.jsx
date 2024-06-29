"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import Nav from "./Nav";
import Image from "next/image";

import { SiHackthebox } from "react-icons/si";
import { IoAnalyticsOutline } from "react-icons/io5";
import TaksComp from "./comps/TaksComp";
import Container from "./comps/Container";
import Permissions from "./comps/Permissions";
import girl from "../../../assets/logo.svg";
function Page({ params }) {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState(null);
  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch admins: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      console.log(data);
      setEmployee(data);
    } catch (error) {
      console.error("An error occurred while fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  const pi = [
    {
      title: "Fullname",
      item: employee?.fullname,
    },
    {
      title: "Email Address",
      item: employee?.email,
    },
    {
      title: "Phone Number",
      item: employee?.phone_no,
    },

    {
      title: "Gender",
      item: employee?.gender,
    },
    {
      title: "emergency contact name",
      item: employee?.emergency_contact_name,
    },
    {
      title: "Emergency contact phone",
      item: employee?.emergency_contact_phone,
    },
    {
      title: "Emergency contact relationship",
      item: employee?.emergency_contact_relationship,
    },
  ];
  const ei = [
    {
      title: "Joining Date",
      item: employee?.start_date,
    },

    {
      title: "Employment Type",
      item: employee?.employment_type,
    },
    {
      title: "Salary Details",
      item: `#${employee?.salary}`,
    },
    {
      title: "Status",
      item: "Active",
    },
  ];
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <div className="w-full border px-[48px] py-[40px] flex items-start justify-between bg-white h-[202px] rounded-xl mt-[58px] mb-[24px] ">
        <section className="flex items-center gap-6 ">
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full bg-gray-200 ">
            {employee.image === undefined ? (
              <Image className="" alt="" src={girl} />
            ) : (
              <img className="h-full w-full" src={employee.image} alt="" />
            )}
          </div>
          <div className="space-y-3  flex flex-col items-start ">
            <h2 className=" text-[28px] font-semibold ">
              {employee?.username}
            </h2>
            <div className="flex text-[16px] ">
              {" "}
              <p className=" text-[#475367] ">
                ID{employee.employee_id ? employee.employee_id : "null"}
              </p>{" "}
              {employee.employee_id && (
                <p className="text-primary ml-2 ">Copy</p>
              )}
            </div>
            <p className="text-[#475367]">{employee?.email}</p>
          </div>
        </section>
        <section className="space-x-4 flex ">
          <div className=" border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold ">
            Deactivate Account
          </div>
          <div className=" border px-4 py-2 border-border bg-[#667185] rounded-[8px] text-white text-[14px] font-semibold ">
            Delete Account
          </div>
        </section>
      </div>

      {/* Boxes */}
      <div className="grid gap-4 grid-cols-3 ">
        <TaksComp title={" Tasks Completed"} data={"0"} />
        <TaksComp title={"Pending Task"} data={"0"} />
        <TaksComp title={"Performance Rate"} data={"0"} />
        <Container title={"Personal information"} data={pi} />
        <Container title={"Employment Information"} data={ei} />
        <Permissions />
      </div>
    </main>
  );
}

export default Page;
