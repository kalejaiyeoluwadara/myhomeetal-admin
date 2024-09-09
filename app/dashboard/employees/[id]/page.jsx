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
import logo from "../../../assets/logo.svg";
import { useGlobal } from "@/app/context";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";
function Page({ params }) {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [piEdit, setPiEdit] = useState(false);
  const [eiEdit, setEiEdit] = useState(false);
  const { openModal, token, fetchAdmins: getAdmins } = useGlobal();
  const router = useRouter();
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.fullname || "",
        address: employee.address || "",
        phone_no: employee.phone_no || "",
        gender: employee.gender || "",
        emergency_contact_name: employee.emergency_contact_name || "",
        emergency_contact_relationship:
          employee.emergency_contact_relationship || "",
        emergency_contact_phone: employee.emergency_contact_phone || "",
        employee_id: employee.employee_id || "",
        start_date: employee.start_date || "",
        employment_type: employee.employment_type || "",
        salary: employee.salary || "",
        email: employee.email || "",
        gender: employee.gender || "",
        isActive: employee?.isActive,
      });
    }
  }, [employee]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        openModal("Failed to delete admin", false);
        throw new Error(
          `Failed to delete admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      openModal("Admin deleted successfully", true);
      router.push("/dashboard/employees");
      getAdmins();
    } catch (error) {
      console.error("An error occurred while deleting admin:", error);
      openModal("An error occurred while deleting admin", false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
        openModal("Admin Update Failed", false);
      }
      openModal("Admin Updated successfully", true);
      const data = await response.json();
      setEmployee(formData);
    } catch (error) {
      console.error("An error occurred while updating admin:", error);
      openModal("Admin Update Failed", false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/admin/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        openModal(`Copied to clipboard: ${text}`, true);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const Deactivate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/admin/deactivate/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to Deactivate admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
        openModal(`An error occurred while deactivating admin`, false);
      }

      openModal(`Admin deactivated successfully`, true);
      const data = await response.json();
      console.log(data);
      fetchAdmin();
    } catch (error) {
      console.error("An error occurred while deactivating admin:", error);
      openModal(`An error occurred while deactivating admin`, false);
    } finally {
      setLoading(false);
    }
  };
  const Activate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend-2.onrender.com/api/v1/admin/activate/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to Deactivate admin: ${response.status} ${response.statusText} - ${errorData.message}`
        );
        openModal(`An error occurred while activating admin`, false);
      }

      const data = await response.json();
      console.log(data);
      openModal(`Admin account activated successfully`, true);
      fetchAdmin();
    } catch (error) {
      console.error("An error occurred while Activating admin:", error);
      openModal(`An error occurred while Activating admin`, false);
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
    console.log("summoned!!");
  };

  const pi = [
    {
      title: "Fullname",
      item: formData?.fullname,
      formName: "fullname",
    },
    {
      title: "Email Address",
      item: formData?.email,
      formName: "email",
    },
    {
      title: "Phone Number",
      item: formData?.phone_no,
      formName: "phone_no",
    },
    {
      title: "Gender",
      item: formData?.gender,
      formName: "gender",
    },
  ];
  const ei = [
    {
      title: "Joining Date",
      item: formData?.start_date,
      formName: "start_date",
    },

    {
      title: "Employment Type",
      item: formData?.employment_type,
      formName: "employment_type",
    },
    {
      title: "Salary Details",
      item: `${formData?.salary}`,
      formName: "salary",
    },
    {
      title: "Status",
      item: `active - ${formData?.isActive}` || "",
      formName: "active",
    },
  ];

  const oi = [
    {
      title: "Emergency Contact Name",
      item: formData?.emergency_contact_name,
      formName: "emergency_contact_name",
    },
    {
      title: "Emergency Contact Relationship",
      item: formData?.emergency_contact_relationship,
      formName: "emergency_contact_relationship",
    },
    {
      title: "Emergency Contact Phone",
      item: formData?.emergency_contact_phone,
      formName: "emergency_contact_phone",
    },
  ];

  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="w-full border px-[48px] py-[40px] flex items-start justify-between bg-white h-[202px] rounded-xl mt-[58px] mb-[24px] ">
            <section className="flex items-center gap-6 ">
              <div className="h-[120px] w-[120px]  overflow-hidden rounded-full bg-gray-200 ">
                {employee.image === undefined ? (
                  <Image
                    className=" h-full w-full bg-white  "
                    alt=""
                    src={logo}
                  />
                ) : (
                  <img
                    className="h-full object-left w-full"
                    src={employee.image}
                    alt=""
                  />
                )}
              </div>
              <div className="space-y-3">
                <h2 className=" text-[28px] capitalize font-semibold ">
                  {employee.fullname
                    ? employee.fullname.split(" ")[0]
                    : employee.email}
                </h2>
                <div className="flex text-[16px] ">
                  {" "}
                  <p className="ml-[29px] text-[#475367] ">
                    {employee.employee_id ? employee.employee_id : "null"}
                  </p>{" "}
                  {employee.employee_id && (
                    <p
                      onClick={() => {
                        copyToClipboard(employee.employee_id);
                      }}
                      className="text-primary pointer hover:text-red-300 ml-2 "
                    >
                      Copy
                    </p>
                  )}
                </div>
                <p className="text-[#475367]">{formData?.email}</p>
              </div>
            </section>
            <section className="space-x-4 flex ">
              {formData?.isActive ? (
                <div
                  onClick={Deactivate}
                  className=" cursor-pointer border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold "
                >
                  Deactivate Account
                </div>
              ) : (
                <div
                  onClick={Activate}
                  className=" cursor-pointer border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold "
                >
                  Activate Account
                </div>
              )}
              <div
                onClick={handleDelete}
                className=" border px-4 py-2 pointer border-border bg-[#667185] rounded-[8px] text-white text-[14px] font-semibold "
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
            <Container
              handleChange={handleInputChange}
              title={"Personal information"}
              handleSave={handleSave}
              editController={piEdit}
              setController={setPiEdit}
              data={pi}
              formData={formData}
              setFormData={setFormData}
            />
            <Container
              editController={eiEdit}
              setController={setEiEdit}
              handleSave={handleSave}
              handleChange={handleInputChange}
              title={"Employment Information"}
              data={ei}
              formData={formData}
              setFormData={setFormData}
            />
            <Permissions />
            <Container
              editController={eiEdit}
              setController={setEiEdit}
              handleChange={handleInputChange}
              title={"Other Informations"}
              data={oi}
              formData={formData}
              setFormData={setFormData}
              otherStyles={"col-span-3"}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default Page;
