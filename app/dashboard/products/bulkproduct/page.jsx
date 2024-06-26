"use client";
import { useGlobal } from "@/app/context";
import Link from "next/link";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import { useRouter } from "next/navigation";
function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { bulk, setBulk } = useGlobal();
  const router = useRouter();
  const handleClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected: ", file);
      setSelectedFile(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", selectedFile);

    try {
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/product/bulk-create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response from server:", data);
      setBulk(data);
      router.push("/dashboard/products/bulkproduct/uploads");
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <h2 className="core mb-6">Bulk Product</h2>
      <div className="border bg-white center rounded-xl p-4 w-auto h-[536px]">
        <div className="p-4 flex w-full border-[1.5px] rounded-md h-[479px] border-dashed active:border-[2px] active:border-solid cursor-pointer transition-all active:border-primary border-[#D0D5DD] items-center justify-center flex-col">
          <div className="h-[56px] w-[56px] rounded-full center bg-[#F0F2F5] mb-6">
            <FiUploadCloud size={25} />
          </div>
          <div className="center flex-col">
            <h3 className="text-[14px] text-[#475367]">
              <span className="text-[14px] text-center text-[#ED2224]">
                Click to upload
              </span>{" "}
              or drag and drop
            </h3>
            {!selectedFile ? (
              <p className="text-[12px] text-center text-[#98A2B3]">
                Max number of file 10 - SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            ) : (
              <p className="text-[12px] text-center text-[#98A2B3]">
                {selectedFile.name}
              </p>
            )}
          </div>

          <div className="my-[56px] w-full bg-red-300 relative">
            <hr className="bg-[#F0F2F5]" />
            <div className="w-full center">
              <p className="absolute px-4 text-center bg-white text-xs font-bold text-[#98A2B3] -top-[9px]">
                OR
              </p>
            </div>
          </div>

          {!selectedFile ? (
            <button
              onClick={handleClick}
              className="w-[354px] center h-[52px] rounded-[10px] text-[16px] font-medium"
            >
              Browse Files
            </button>
          ) : (
            <button
              onClick={handleUpload}
              className="w-[354px] center h-[52px] rounded-[10px] text-[16px] font-medium"
            >
              Upload
            </button>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </main>
  );
}

export default Page;
