import React from "react";
import hurr from "@/app/assets/hurr.png";
import Image from "next/image";
import Link from "next/link";
function Success({ id, success, setSuccess }) {
  return (
    <>
      {success && (
        <div className="absolute z-50 bg-[#F9FAFB]  gap-[17px] w-full min-h-[130vh] flex flex-col items-center justify-center top-0 left-0 ">
          <div className="h-[140px] w-[140px] bg-[#FFF1F1] rounded-full center text-[100px] ">
            <Image className="" src={hurr} alt="" />
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-2xl w-[330px] ">
              Employee Created successfully!
            </h2>
            <p>Emplyee ID: #{id}</p>
          </div>
          <Link
            onClick={() => {
              setSuccess(false);
            }}
            href={"/dashboard"}
          >
            <button className="w-[475px] h-[60px] rounded-[10px] ">
              Return to home
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Success;
