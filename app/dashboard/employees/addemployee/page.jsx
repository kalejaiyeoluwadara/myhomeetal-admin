"use client";
import React, { useState } from "react";
import home from "@/app/assets/home.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { FiUploadCloud } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import home2 from "@/app/assets/home2.svg";
import profile2 from "@/app/assets/profile2.svg";
import tick from "@/app/assets/tick.svg";
import Image from "next/image";
import { useGlobal } from "@/app/context";
import FormData from "form-data";
import Link from "next/link";
import Success from "./Success";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { TbCurrencyNaira } from "react-icons/tb";
const HeaderButton = ({ name, onclick, active, setActive, img }) => {
  return (
    <div
      className={` ${
        active === name && "border border-[#ED2224] bg-[#FBF1F1] "
      } h-[32px] gap-2 rounded-[8px] text-[#667185] center border px-2 `}
    >
      <Image src={img} alt="" className="" />
      <p className="text-[14px] font-medium ">{name}</p>
    </div>
  );
};
function Page() {
  const [active, setActive] = useState("Personal");
  const [gender, setGender] = useState("");
  const [gendModal, setGenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [emp, setEmp] = useState("Remote");
  const [empModal, setEmpModal] = useState(false);
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);
  const [randId, setRandId] = useState("");
  const [loading, setLoading] = useState("");
  const { openModal, token } = useGlobal();
  const [formContent, setformContent] = useState({
    fullname: "",
    image: "",
    email: "",
    address: "",
    normal_email: "",
    phone_no: "",
    gender: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    employee_id: "",
    password: "",
    start_date: "",
    employment_type: emp,
    salary: "",
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      formContent.image = file;
      console.log(formContent.image);
      openModal("Image file selected", true);
    }
  };
  const handleClick = () => {
    document.getElementById("file-upload").click();
  };

  const resetForm = () => {
    setformContent({
      fullname: "",
      image: "",
      email: "",
      normal_email: "",
      address: "",
      phone_no: "",
      gender: gender,
      emergency_contact_name: "",
      emergency_contact_relationship: "",
      emergency_contact_phone: "",
      employee_id: "",
      password: "",
      start_date: "",
      employment_type: emp,
      salary: "",
    });
  };
  const handleSubmit = async () => {
    if (formContent.email && formContent.password) {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", formContent.fullname);
      formData.append("admin-image", formContent.image);
      formData.append("email", formContent.email);
      formData.append("address", formContent.address);
      formData.append("phone_no", formContent.phone_no);
      formData.append("gender", formContent.gender);
      formData.append(
        "emergency_contact_name",
        formContent.emergency_contact_name
      );
      formData.append(
        "emergency_contact_relationship",
        formContent.emergency_contact_relationship
      );
      formData.append(
        "emergency_contact_phone",
        formContent.emergency_contact_phone
      );
      formData.append("employee_id", formContent.employee_id);
      formData.append("position", "");
      formData.append("start_date", formContent.start_date);
      formData.append("employment_type", formContent.employment_type);
      formData.append("salary", formContent.salary);
      formData.append("password", formContent.password);

      try {
        const response = await fetch(
          "https://my-home-et-al-backend-u0m7.onrender.com/api/v1/admin/create-admin",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Response from server:", data);
          console.log("Success");
          setId(formContent.employee_id);
          setSuccess(true);
          resetForm();
        } else {
          openModal("Error creating Employee", false);
          setLoading(false);
        }
      } catch (error) {
        openModal("Error creating Employee", false);
        console.error("Error submitting data:", error);
        setLoading(false);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      openModal("Enter Work email and password", false);
    }
  };
  const generateRandomId = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    openModal("Employee ID Generated", true);
    return result;
  };
  // Get random id
  const genId = () => {
    const id = generateRandomId(6);
    console.log(id);
    setRandId(id);
    setformContent({ ...formContent, employee_id: id });
    console.log(formContent.employee_id);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformContent({ ...formContent, [name]: value });
  };

  return (
    <div className=" w-full px-[36px] relative bg-screen  min-h-screen overflow-y-scroll ">
      {/* welcome  */}
      <Success success={success} setSuccess={setSuccess} id={id} />
      <div className="flex mb-[50px] mt-9 items-center justify-between">
        <section>
          <h2 className="text-[24px] font-semibold ">Create a New Employee</h2>
          <p className="text-base font-normal text-[#475367]  ">
            Onboarding Your New Team Member
          </p>
        </section>
        <section>
          <Link href="/dashboard/employees">
            {" "}
            <button className=" text-[16px] font-semibold w-[168px] h-[40px] rounded-[8px] flex items-center justify-center gap-2 ">
              Cancel
            </button>
          </Link>
        </section>
      </div>

      {/* Main form */}
      <div className="h-full  px-[71px] py-[50px]   w-full rounded-[10px] bg-white ">
        <div className="flex center gap-6">
          <HeaderButton
            name={"Personal"}
            active={active}
            setActive={setActive}
            img={home2}
          />
          <HeaderButton
            name={"Employment"}
            active={active}
            img={profile2}
            setActive={setActive}
          />
          <HeaderButton
            name={"Login Credentials"}
            img={tick}
            active={active}
            setActive={setActive}
          />
        </div>

        {/* Contents */}

        {/* Personal Form */}
        {active === "Personal" && (
          <div className="mt-[32px] flex-col center">
            <h2 className="text-[24px] font-semibold">Create A New Employee</h2>
            <p className="text-base text-[#8C94A6]">
              Fill out these details to continue
            </p>

            {/* Form */}
            <div className="mt-[22px] flex flex-col gap-4">
              {/* Full name */}
              <div className="w-full">
                <label className="inputlabel">Full name</label>
                <input
                  name="fullname"
                  onChange={handleInputChange}
                  className="input"
                  type="text"
                  placeholder="Enter surname and first name"
                />
              </div>

              {/* Image upload */}
              <div className="w-full">
                <label className="inputlabel">Upload employee image</label>
                <div
                  className="h-[80px] rounded-sm p-4 flex justify-between items-center border"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="h-[48px] w-[48px] flex items-center justify-center rounded-full bg-[#F0F2F5] text-[#475367] cursor-pointer">
                      <FiUploadCloud size={20} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[#BEC5CF]">
                        {selectedFile
                          ? selectedFile.name
                          : "Upload your document"}
                      </h2>
                      <p className="text-sm text-primary font-medium">
                        JPG/PNG/ JPEG format{" "}
                        <span className="text-[#475367]">&#8226;</span> Max. 5MB
                      </p>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    name="user_img"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <button className="w-[81px] h-[36px] rounded-[38px] text-sm font-semibold">
                    {selectedFile ? "Change" : "Upload"}
                  </button>
                </div>
              </div>
              {/* Normal Email */}
              <div className="w-full">
                <label className="inputlabel">Email</label>
                <input
                  className="input"
                  type="email"
                  name="normal_email"
                  onChange={handleInputChange}
                  placeholder="Enter subject"
                />
              </div>
              {/* Address */}
              <div className="w-full">
                <label className="inputlabel">Address</label>
                <input
                  name="address"
                  className="input"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>
              {/* Row content */}
              <section className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <label className="inputlabel">Phone Number</label>
                  <input
                    name="phone_no"
                    className="input"
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="w-full">
                  <label className="inputlabel">Gender</label>
                  <div
                    onClick={() => {
                      setGenModal((prev) => !prev);
                    }}
                    className="w-full pointer h-[56px] flex justify-between items-center px-4 border relative rounded-xl"
                  >
                    <p>{gender === "" ? "Select a gender" : gender}</p>
                    <IoChevronDown size={20} />

                    {gendModal && (
                      <div className="absolute h-auto flex pointer flex-col gap-2 w-[200px] px-1 py-4 rounded-xl bg-white border top-16">
                        {["Male", "Female"].map((d, id) => {
                          return (
                            <p
                              key={id}
                              onClick={() => {
                                setGender(d);
                                setformContent({ ...formContent, gender: d });
                              }}
                              className="w-full h-[40px] rounded-md hover:bg-red-50 p-2"
                            >
                              {d}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Emergency  */}
              <div className="w-full">
                <label className="inputlabel">Name of Emergency contact</label>
                <input
                  className="input"
                  type="text"
                  name="emergency_contact_name"
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>
              {/* Relationship with Emergency contact */}
              <div className="w-full">
                <label className="inputlabel">
                  Relationship with Emergency contact
                </label>
                <input
                  className="input"
                  type="text"
                  name="emergency_contact_relationship"
                  onChange={handleInputChange}
                  placeholder="Enter relationship"
                />
              </div>
              {/* Phone number of Emergency contact */}
              <div className="w-full">
                <label className="inputlabel">
                  Phone number of Emergency contact
                </label>
                <input
                  className="input"
                  name="emergency_contact_phone"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Buttons */}
              <section className="w-full mt-[32px] gap-6">
                <button
                  onClick={() => {
                    if (formContent.fullname !== "") {
                      if (formContent.normal_email !== "") {
                        if (formContent.address !== "") {
                          if (formContent.phone_no !== "") {
                            if (gender) {
                              if (selectedFile) {
                                if (formContent.emergency_contact_name !== "") {
                                  if (
                                    formContent.emergency_contact_relationship !==
                                    ""
                                  ) {
                                    if (
                                      formContent.emergency_contact_phone !== ""
                                    ) {
                                      setActive("Employment");
                                    } else {
                                      openModal(
                                        "Enter emergency contact phone number!",
                                        false
                                      );
                                    }
                                  } else {
                                    openModal(
                                      "Enter emergency contact relationship!",
                                      false
                                    );
                                  }
                                } else {
                                  openModal(
                                    "Enter emergency contact name!",
                                    false
                                  );
                                }
                              } else {
                                openModal("Select Image!", false);
                              }
                            } else {
                              openModal("Select gender!", false);
                            }
                          } else {
                            openModal("Enter phone number!", false);
                          }
                        } else {
                          openModal("Enter address!", false);
                        }
                      } else {
                        openModal("Enter email!", false);
                      }
                    } else {
                      openModal("Enter full name!", false);
                    }
                  }}
                  className="w-full col-span-2 mb-2 text-[16px] font-semibold border h-[55px] rounded-[99px]"
                >
                  Next Step
                </button>
              </section>
            </div>
          </div>
        )}

        {/* Employement details */}
        {active === "Employment" && (
          <main className="mt-[32px] flex-col center">
            <h2 className="text-[24px] font-semibold">Create A New Employee</h2>
            <p className="text-base text-[#8C94A6]">
              Fill out these details to build your broadcast
            </p>

            {/* Form */}
            <div className="mt-[22px] w-full flex flex-col gap-4">
              {/* Employee ID */}
              <label className="inputlabel">Employee ID</label>
              <div className="w-full border p-4 rounded-md">
                <div className="w-full rounded-xl flex justify-between items-center px-4 py-2">
                  <p className="grey">#{randId}</p>
                  <p
                    onClick={genId}
                    className="font-semibold pointer text-gray-600"
                  >
                    Generate
                  </p>
                </div>
              </div>

              {/* Row content */}
              <section className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <label className="inputlabel">Date of joining</label>
                  <input
                    className="input"
                    type="date"
                    name="start_date"
                    onChange={handleInputChange}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div className="w-full">
                  <label className="inputlabel">Employment type</label>
                  <div
                    onClick={() => {
                      setEmpModal((prev) => !prev);
                      setformContent({ ...formContent, employment_type: emp });
                    }}
                    className="w-full active:border-[1.5px] active:border-red-500 pointer h-[56px] flex justify-between items-center px-4 border relative rounded-xl"
                  >
                    <p>{emp === "" ? "Select Employment type" : emp}</p>
                    <IoChevronDown size={20} />

                    {empModal && (
                      <div className="absolute h-auto flex pointer flex-col gap-2 w-[200px] px-1 py-4 rounded-xl bg-white border top-16">
                        {["On-Site", "Remote"].map((d, id) => (
                          <p
                            onClick={() => {
                              setEmp(d);
                              setformContent({
                                ...formContent,
                                employment_type: d,
                              });
                            }}
                            className="w-full h-[40px] rounded-md hover:bg-red-50 p-2"
                          >
                            {d}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Salary Details */}
              <div className="w-full">
                <label className="inputlabel">Salary Details</label>
                <div className="w-full border outline-[1.5px] transition-all outline-[#FFC5C6] active:border-[#FFC5C6] active:outline border-[#D0D5DD] px-2 flex items-center focus:border-[#FFC5C6] h-[56px] gap-2 rounded-md">
                  <TbCurrencyNaira size={20} />
                  <input
                    name="salary"
                    onChange={handleInputChange}
                    className="w-full outline-none h-full"
                    type="text"
                    placeholder="Enter Subject"
                  />
                </div>
              </div>

              {/* Buttons */}
              <section className="mt-[32px] w-full gap-6">
                <button
                  onClick={() => {
                    if (formContent.employee_id !== "") {
                      if (formContent.start_date !== "") {
                        if (formContent.employment_type !== "") {
                          if (formContent.salary !== "") {
                            setActive("Login Credentials");
                          } else {
                            openModal("Enter salary details!", false);
                          }
                        } else {
                          openModal("Select employment type!", false);
                        }
                      } else {
                        openModal("Enter date of joining!", false);
                      }
                    } else {
                      openModal("Generate Employee ID!", false);
                    }
                  }}
                  className="w-full text-[16px] font-semibold border h-[55px] rounded-[99px]"
                >
                  Next Step
                </button>
              </section>
            </div>
          </main>
        )}

        {/* Login Credentials Details */}
        {active === "Login Credentials" && (
          <main className="mt-[32px] flex-col center  ">
            <h2 className="text-[24px] font-semibold ">
              Create New Email Campaign
            </h2>
            <p className=" text-base text-[#8C94A6]  ">
              Fill out these details to build your broadcast
            </p>

            {/* Form */}
            <div className="mt-[22px] flex w-full flex-col gap-4 ">
              {/*Email */}
              <div className="w-full ">
                <label className="inputlabel">Work Email Address</label>
                <input
                  name="email"
                  className="input"
                  onChange={handleInputChange}
                  type="email"
                  placeholder="user@myhomeetal.com"
                  required
                />
              </div>
              {/* Password */}
              <div className="w-full ">
                <label className="inputlabel">Password</label>
                <input
                  className="input"
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Enter Subject"
                  required
                />
              </div>
              {/* Buttons */}

              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full col-span-2 text-[16px] font-semibold border h-[55px]  rounded-[99px] ${
                  loading && "bg-gray-500 cursor-not-allowed"
                } `}
              >
                {loading ? "Creating new employee" : "Confirm employee"}
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default Page;
