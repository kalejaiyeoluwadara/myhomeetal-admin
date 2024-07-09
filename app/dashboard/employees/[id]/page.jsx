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
  const [employee, setEmployee] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.fullname || "",
        image: employee.image || "",
        address: employee.address || "",
        phone_no: employee.phone_no || "",
        gender: employee.gender || "",
        emergency_contact_name: employee.emergency_contact_name || "",
        emergency_contact_relationship:
          employee.emergency_contact_relationship || "",
        emergency_contact_phone: employee.emergency_contact_phone || "",
        employee_id: employee.employee_id || "",
        password: "",
        username: employee.username || "",
        active: employee.active || false,
      });
    }
  }, [employee]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to delete admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      alert("Admin deleted successfully");
    } catch (error) {
      console.error("An error occurred while deleting admin:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      alert("Admin updated successfully");
      setEmployee(formData);
      setEditMode(false);
    } catch (error) {
      console.error("An error occurred while updating admin:", error);
    } finally {
      setLoading(false);
    }
  };

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
          `Failed to fetch admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("An error occurred while fetching admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivation = async () => {
    setLoading(true);
    try {
      const updatedActiveStatus = !employee.active;
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o",
          },
          body: JSON.stringify({ ...employee, active: updatedActiveStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      alert(
        `Admin ${
          updatedActiveStatus ? "activated" : "deactivated"
        } successfully`
      );
      const data = await response.json();
      console.log(data);
      setEmployee((prev) => ({ ...prev, active: updatedActiveStatus }));
    } catch (error) {
      console.error("An error occurred while updating admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const renderInfo = (title, value, name) => (
  //   <div className="flex flex-col mb-4">
  //     <label className="text-sm font-semibold text-gray-600">{title}</label>
  //     {editMode ? (
  //       <input
  //         className="mt-1 p-2 border rounded"
  //         name={name}
  //         value={formData[name]}
  //         onChange={handleInputChange}
  //       />
  //     ) : (
  //       <p className="mt-1 text-gray-800">{value}</p>
  //     )}
  //   </div>
  // );
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
      title: "Date of birth",
      item: employee?.start_date,
    },
    {
      title: "Gender",
      item: employee?.gender,
    },
  ];
  const ei = [
    {
      title: "Joining Date",
      item: employee?.start_date,
    },
    {
      title: "Department",
      item: "Product Development",
    },
    {
      title: "Employment Type",
      item: "Full-Time Employment",
    },
    {
      title: "Salary Details",
      item: employee?.salary,
    },
    {
      title: "Status",
      item: "",
    },
  ];
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      {/* <button
        className="w-[200px] absolute right-6 top-4 h-[60px] text-white rounded-xl "
        onClick={handleSave}
      >
        Save
      </button> */}
      <div className="w-full border px-[48px] py-[40px] flex items-start justify-between bg-white h-[202px] rounded-xl mt-[58px] mb-[24px] ">
        <section className="flex items-center gap-6 ">
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full bg-gray-200 ">
            {employee.image === undefined ? (
              <Image className=" h-full w-full bg-white  " alt="" src={girl} />
            ) : (
              <img className="h-full w-full" src={employee.image} alt="" />
            )}
          </div>
          <div className="space-y-3">
            <h2 className=" text-[28px] font-semibold ">
              {employee?.username}
            </h2>
            <div className="flex text-[16px] ">
              {" "}
              <p className="ml-[29px] text-[#475367] ">
                {employee.employee_id ? employee.employee_id : "null"}
              </p>{" "}
              {employee.employee_id && (
                <p className="text-primary ml-2 ">Copy</p>
              )}
            </div>
            <p className="text-[#475367]">{employee?.email}</p>
          </div>
        </section>
        <section className="space-x-4 flex ">
          <div
            onClick={toggleActivation}
            className=" cursor-pointer border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold "
          >
            {true ? "Deactivate Account" : "Activate Account"}
          </div>
          <div
            onClick={handleDelete}
            className=" border px-4 py-2 border-border bg-[#667185] rounded-[8px] text-white text-[14px] font-semibold "
          >
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
