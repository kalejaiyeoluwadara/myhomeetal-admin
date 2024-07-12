"use client";

import React, { useState, useEffect, useCallback } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { useGlobal } from "../context";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { openModal } = useGlobal();

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const getRole = () => {
    const role = localStorage.getItem("role");
    openModal("Login Successful, Welcome Back!", true);
    if (role === "Super Admin") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard/admin/employee");
    }
  };

  const handleVerify = () => {
    const role = localStorage.getItem("role");
    openModal("Login Successful, Welcome Back!", true);
    if (role === "Super Admin") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard/admin/employee");
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleVerify();
      }
    },
    [otp]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="border w-full h-auto py-[14px] rounded-[24px] flex items-start justify-center px-[40px] pr-[24px] flex-col border-[#DCDCDC] gap-[16px]">
      <h3 className="text-[25px] w-full text-center font-light">
        Enter Verification Code
      </h3>
      <div className="w-full center">
        <p className="w-[275px] text-[15px] text-center">
          We have sent a verification code to {email}
        </p>
      </div>
      <p className="mt-[10px] mb-[5px] text-center w-full">5 digit code</p>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={5}
        separator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="otp-input"
        containerStyle="otp-container"
      />
      <div className="w-full">
        <button
          className="cursor-pointer mt-[24px] w-full h-[52px] flex items-center justify-center rounded-[99px] text-[16px] font-semibold"
          onClick={handleVerify}
        >
          Verify One time password
        </button>
        <p className="text-[16px] text-center mt-[18px] text-gray-600 font-medium">
          Didn't receive the code?{" "}
          <a href="#">
            <span className="text-primary">Request a new code</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
