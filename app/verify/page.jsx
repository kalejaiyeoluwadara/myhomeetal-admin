"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import man from "@/app/assets/wall.svg";
import OtpVerification from "./OtpInput";

const Page = () => {
  return (
    <main className="min-h-screen w-full p-[35px] gap-[60px] flex items-start justify-center">
      <section className="h-full w-40% flex flex-col items-start">
        <Image className="mb-81px" alt="Logo" src={logo} />
        <OtpVerification email="oyefesoafolabiteniola@gmail.com" />
      </section>
      <section className="h-[836px]  overflow-hidden w-[50%] relative rounded-[24px]">
        <Image className="cover" src={man} alt="Happy man" />
      </section>
    </main>
  );
};

export default Page;
