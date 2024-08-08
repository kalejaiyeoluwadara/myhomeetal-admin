import React from "react";
import ex from "@/app/assets/export.svg";
import Image from "next/image";
import { handleExport } from "./ExportData";
function Export({ data }) {
  return (
    <section
      onClick={() => {
        handleExport(data);
      }}
      className="px-3 h-[40px] border border-[#D0D5DD] flex items-center justify-center gap-2 rounded-[8px] sh pointer text-[14px] font-[500] "
    >
      <Image src={ex} alt="" className=" " />
      <p className="text-[#344054]  ">Export data</p>
    </section>
  );
}

export default Export;
