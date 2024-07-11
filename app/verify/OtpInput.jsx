import React, { useState } from "react";
import OtpInput from "react-otp-input";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleVerify = () => {
    console.log("OTP:", otp);
    // Add your OTP verification logic here
  };

  return (
    <div className="border w-full h-400px rounded-24px flex items-start justify-center px-40px pr-24px flex-col border-DCDCDC gap-16px">
      <h3 className="text-25px w-full text-center font-bold">
        Enter Verification Code
      </h3>
      <p className="w-275px">We have sent a verification code to {email}</p>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={5}
        separator={<span>-</span>}
        inputStyle="otp-input"
        containerStyle="otp-container"
      />
      <div className="w-full">
        <div
          className="cursor-pointer mt-4 w-full h-52px flex items-center justify-center rounded-99px text-16px font-bold bg-primary text-white"
          onClick={handleVerify}
        >
          Verify One time password
        </div>
        <p className="text-16px text-center mt-8px text-gray-600 font-medium">
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
