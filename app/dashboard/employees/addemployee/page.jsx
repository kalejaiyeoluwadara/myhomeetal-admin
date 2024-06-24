"use client";
import React, { useState } from "react";
import home from "@/app/assets/home.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { FiUploadCloud } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import Image from "next/image";
import { useGlobal } from "@/app/context";
import Link from "next/link";
const HeaderButton = ({ name, onclick, active, setActive }) => {
  return (
    <div
      onClick={() => {
        setActive(name);
      }}
      className={` ${
        active === name && "border border-[#ED2224] bg-[#FBF1F1] "
      } h-[32px] gap-2 rounded-[8px] pointer text-[#667185] center border px-2 `}
    >
      <Image src={home} alt="" className="" />
      <p className="text-[14px] font-medium ">{name}</p>
      {active === name && <LiaTimesSolid size={20} />}
    </div>
  );
};
function AddEmployee() {
  const [active, setActive] = useState("Personal");
  const [gender, setGender] = useState("");
  const [gendModal, setGenModal] = useState(false);
  const [emp, setEmp] = useState("");
  const [empModal, setEmpModal] = useState(false);
  return (
    <div className=" w-full px-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      {/* welcome  */}
      <div className="flex mb-[50px] mt-9 items-center justify-between">
        <section>
          <h2 className="text-[24px] font-semibold ">Create a New Employee</h2>
          <p className="text-base font-normal text-[#475367]  ">
            It’s a sunny day today, lets see how the business is doing!
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
        <div className="flex gap-6">
          <HeaderButton
            name={"Personal"}
            active={active}
            setActive={setActive}
          />
          <HeaderButton
            name={"Employment"}
            active={active}
            setActive={setActive}
          />
          <HeaderButton
            name={"Login Credentials"}
            active={active}
            setActive={setActive}
          />
        </div>

        {/* Contents */}

        {/* Personal Form */}
        {active === "Personal" && (
          <main className="mt-[32px]  ">
            <h2 className="text-[24px] font-semibold ">
              Create A New Employee
            </h2>
            <p className=" text-base text-[#8C94A6]  ">
              Fill out these details to build your broadcast
            </p>

            {/* Form */}
            <div className="mt-[22px] flex flex-col gap-4 ">
              {/* Full name */}
              <div className="w-full ">
                <label className="inputlabel">Full name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter surname and first name"
                />
              </div>

              {/* Image upload */}
              <div className="w-full ">
                <label className="inputlabel">Upload employee image</label>
                <div className=" h-[80px] rounded-sm p-4 flex justify-between items-center border  ">
                  <div className="flex gap-2">
                    <div className="h-[48px] text-[#475367] w-[48px] center rounded-full bg-[#F0F2F5] ">
                      <FiUploadCloud />
                    </div>
                    <div>
                      <h2 className="core">Upload your document</h2>
                      <p className="flex items-center justify-start text-[14px] text[#98A2B3]  ">
                        PDF format <LuDot /> Max. 5MB{" "}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-base font-semibold  ">
                    Upload
                  </button>
                </div>
              </div>
              {/* Email Address */}
              <div className="w-full ">
                <label className="inputlabel">Email Address</label>
                <input
                  className="input"
                  type="text"
                  placeholder="user@gmail.com"
                />
              </div>
              {/* Full name */}
              <div className="w-full ">
                <label className="inputlabel">Address</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter address"
                />
              </div>
              {/* Row content */}
              <section className="grid grid-cols-2 gap-4">
                <div className="w-full ">
                  <label className="inputlabel">Phone Number</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="w-full ">
                  <label className="inputlabel">Gender</label>
                  <div
                    onClick={() => {
                      setGenModal((prev) => !prev);
                    }}
                    className="w-full pointer h-[56px] flex justify-between items-center px-4 border relative rounded-xl "
                  >
                    <p>{gender === "" ? "Select a gender" : gender}</p>
                    <IoChevronDown size={20} />

                    {gendModal && (
                      <div className="absolute h-auto flex pointer flex-col gap-2 w-[200px] px-1 py-4 rounded-xl bg-white border top-16 ">
                        {["Male", "Female"].map((d, id) => {
                          return (
                            <p
                              onClick={() => {
                                setGender(d);
                              }}
                              className="w-full h-[40px] rounded-md hover:bg-red-50 p-2 "
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
              <div className="w-full ">
                <label className="inputlabel">Name of Emergency contact </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Subject"
                />
              </div>
              {/* Relationship with Emergency contact   */}
              <div className="w-full ">
                <label className="inputlabel">
                  Relationship with Emergency contact{" "}
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter subject"
                />
              </div>
              {/* Phone number of Emergency contact   */}
              <div className="w-full ">
                <label className="inputlabel">
                  Phone number of Emergency contact{" "}
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter subject"
                />
              </div>

              {/* Buttons */}
              <section className=" w-full mt-[32px] gap-6 ">
                <button
                  onClick={() => {
                    setActive("Employment");
                  }}
                  className=" w-full col-span-2 mb-2 text-[16px] font-semibold border h-[55px]  rounded-[8px] "
                >
                  Confirm employee
                </button>
              </section>
            </div>
          </main>
        )}

        {/* Employement details */}
        {active === "Employment" && (
          <main className="mt-[32px]  ">
            <h2 className="text-[24px] font-semibold ">
              Create A New Employee
            </h2>
            <p className=" text-base text-[#8C94A6]  ">
              Fill out these details to build your broadcast
            </p>

            {/* Form */}
            <div className="mt-[22px] flex flex-col gap-4 ">
              {/* Full name */}
              <div className="w-full ">
                <label className="inputlabel">Employee ID</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter surname and first name"
                />
              </div>

              {/* Image upload */}
              <div className="w-full ">
                <label className="inputlabel">Upload employee image</label>
                <div className=" h-[80px] rounded-sm p-4 flex justify-between items-center border  ">
                  <div className="flex gap-2">
                    <div className="h-[48px] text-[#475367] w-[48px] center rounded-full bg-[#F0F2F5] ">
                      <FiUploadCloud />
                    </div>
                    <div>
                      <h2 className="core">Upload your document</h2>
                      <p className="flex items-center justify-start text-[14px] text[#98A2B3]  ">
                        PDF format <LuDot /> Max. 5MB{" "}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-base font-semibold  ">
                    Upload
                  </button>
                </div>
              </div>
              {/* Role/Position */}
              <div className="w-full ">
                <label className="inputlabel">Enter Subject</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Role/Position"
                />
              </div>
              {/* Department */}
              <div className="w-full ">
                <label className="inputlabel">Department</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Subject"
                />
              </div>
              {/* Row content */}
              <section className="grid grid-cols-2 gap-4">
                <div className="w-full ">
                  <label className="inputlabel">Date of joining</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Date of joining"
                  />
                </div>
                <div className="w-full ">
                  <label className="inputlabel">Employment type</label>
                  <div
                    onClick={() => {
                      setEmpModal((prev) => !prev);
                    }}
                    className="w-full pointer h-[56px] flex justify-between items-center px-4 border relative rounded-xl "
                  >
                    <p>{emp === "" ? "Select Employment type" : emp}</p>
                    <IoChevronDown size={20} />

                    {empModal && (
                      <div className="absolute h-auto flex pointer flex-col gap-2 w-[200px] px-1 py-4 rounded-xl bg-white border top-16 ">
                        {["Full-time", "Per-time"].map((d, id) => {
                          return (
                            <p
                              onClick={() => {
                                setEmp(d);
                              }}
                              className="w-full h-[40px] rounded-md hover:bg-red-50 p-2 "
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

              {/* Salary Details  */}
              <div className="w-full ">
                <label className="inputlabel">Salary Details </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Subject"
                />
              </div>

              {/* Buttons */}
              <section className=" mt-[32px] w-full gap-6 ">
                <button
                  onClick={() => {
                    setActive("Login Credentials");
                  }}
                  className="w-full text-[16px] font-semibold border h-[55px]  rounded-[8px] "
                >
                  Confirm employee
                </button>
              </section>
            </div>
          </main>
        )}

        {/* Login Credentials Details */}
        {active === "Login Credentials" && (
          <main className="mt-[32px]  ">
            <h2 className="text-[24px] font-semibold ">
              Create New Email Campaign
            </h2>
            <p className=" text-base text-[#8C94A6]  ">
              Fill out these details to build your broadcast
            </p>

            {/* Form */}
            <div className="mt-[22px] flex flex-col gap-4 ">
              {/* Full name */}
              <div className="w-full ">
                <label className="inputlabel">User name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter surname and first name"
                />
              </div>

              {/* Password */}
              <div className="w-full ">
                <label className="inputlabel">Password</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Subject"
                />
              </div>
              {/* User Role */}
              <div className="w-full ">
                <label className="inputlabel">User Role</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Subject"
                />
              </div>

              {/* Buttons */}

              <button className="w-full col-span-2 text-[16px] font-semibold border h-[55px]  rounded-[8px] ">
                Confirm employee
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default AddEmployee;
