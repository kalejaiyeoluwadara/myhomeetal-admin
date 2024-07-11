"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import man from "@/app/assets/wall.svg";
import OtpVerification from "./OtpInput";

const Page = () => {
  return (
    <main className="h-screen w-full py-[10px] px-[35px] gap-[30px] flex items-center justify-center">
      <section className="h-full w-[40%] flex flex-col items-start justify-center ">
        <Image className="mb-[20px]" alt="Logo" src={logo} />
        <OtpVerification email="oyefesoafolabiteniola@gmail.com" />
      </section>
      <section className="h-[536px]  overflow-hidden w-[50%] relative rounded-[24px]">
        <Image className="cover" src={man} alt="Happy man" />
      </section>
    </main>
  );
};

export default Page;
