import Link from "next/link";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import Nav from "./Nav";
import Image from "next/image";
function Page({ params }) {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <div className="w-full border px-[48px] py-[40px] flex items-center justify-between bg-white h-[202px] rounded-xl mt-[58px] mb-[24px] ">
        <section className="flex items-center gap-6 ">
          <div className="h-[120px] w-[120px] rounded-full bg-gray-200 ">
            <Image className="" alt="" src={""} />
          </div>
          <div className="space-y-3">
            <h2 className=" text-[28px] font-semibold ">Olamide Akintan</h2>
            <div className="flex text-[16px] ">
              {" "}
              <p className=" font-semibold text-[#475367] ">HR Manager</p>{" "}
              <p className="ml-[29px] text-[#475367] ">ID3435854649</p>{" "}
              <p className="text-primary ml-2 ">Copy</p>
            </div>
            <p className="text-[#475367]">OlamideAkintan@myhomeetal.com</p>
          </div>
        </section>
        <section className="space-y-4">
          <div className=" border px-4 py-2 rounded-[8px] text-blak text-[14px] font-semibold ">
            Deactivate Account
          </div>
        </section>
      </div>
      <div></div>
    </main>
  );
}

export default Page;
