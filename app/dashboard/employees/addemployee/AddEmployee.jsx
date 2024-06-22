"use client";
import React, { useState } from "react";
import home from "@/app/assets/home.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { FiUploadCloud } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import Image from "next/image";
import { useGlobal } from "@/app/context";
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
  const { addEmployee, setAddEmployee } = useGlobal();
  return (
    <>
      {addEmployee && (
        <div className="fixed flex items-center overflow-y-scroll no-scrollbar top-0 left-[270px] h-screen w-full bg-black bg-opacity-25 z-40 ">
          <div className="h-[524px]  p-4 overflow-y-scroll ml-40 w-[670px] rounded-[10px] bg-white ">
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
                      <div className="w-full h-[56px] flex justify-between items-center px-4 border relative rounded-xl ">
                        Gender
                      </div>
                    </div>
                  </section>

                  {/* Emergency  */}
                  <div className="w-full ">
                    <label className="inputlabel">
                      Name of Emergency contact{" "}
                    </label>
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
                  <section className="grid mt-[32px] grid-cols-3 gap-6 ">
                    <button
                      onClick={() => {
                        setAddEmployee(false);
                      }}
                      className="w-auto bg-white text-[#FF6567] border-primary h-[55px] border rounded-[8px] "
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => {
                        setActive("Employment");
                      }}
                      className="w-auto col-span-2 text-[16px] font-semibold border h-[55px]  rounded-[8px] "
                    >
                      Next Step
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
                      <div className="w-full h-[56px] flex justify-between items-center px-4 border relative rounded-xl ">
                        Employment type
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
                  <section className="grid mt-[32px] grid-cols-3 gap-6 ">
                    <button
                      onClick={() => {
                        setAddEmployee(false);
                      }}
                      className="w-auto bg-white text-[#FF6567] border-primary h-[55px] border rounded-[8px] "
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => {
                        setActive("Login Credentials");
                      }}
                      className="w-auto col-span-2 text-[16px] font-semibold border h-[55px]  rounded-[8px] "
                    >
                      Next Step
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
      )}
    </>
  );
}

export default AddEmployee;
