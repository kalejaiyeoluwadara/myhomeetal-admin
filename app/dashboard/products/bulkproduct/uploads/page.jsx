"use client";
import { useGlobal } from "@/app/context";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function Modal({ message, success, onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-start mt-10 z-50">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg ${
          success ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {success ? (
          <FiCheckCircle className="text-green-600 w-6 h-6 mr-2" />
        ) : (
          <FiXCircle className="text-red-600 w-6 h-6 mr-2" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}

function Page() {
  const { bulk, setBulk } = useGlobal();
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleUpload = async () => {
    if (!Array.isArray(bulk) || bulk.length === 0) {
      console.log("Bulk data is not properly formatted or is empty");
      return;
    }

    try {
      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/product/bulk-publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YyNjdjNDMyNDg5NmFlNzg2ZjgwZSIsImVtYWlsIjoiYmFiYUBteWhvbWVldGFsLmNvbSIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTcxODE2MTQ5NSwiZXhwIjoxNzI2ODAxNDk1fQ.w3OuGAzZmBRQN_kQbcEAAv82dVV3n0ymvu7G6gJLY6o`,
          },
          body: JSON.stringify(bulk),
        }
      );

      const data = await response.json();
      console.log("Response from server:", data);
      if (data.error) {
        console.log("Error from server:", data.error);
        setModalMessage("Product upload failed");
        setModalSuccess(false);
      } else {
        console.log("Success");
        setModalMessage("Product uploaded successfully");
        setModalSuccess(true);
        router.push("/dashboard/products");
      }
    } catch (e) {
      console.log("Error during upload:", e);
      setModalMessage("Product upload failed");
      setModalSuccess(false);
    }
  };

  const handleRemove = (index) => {
    const updatedBulk = bulk.filter((_, i) => i !== index);
    setBulk(updatedBulk);
  };

  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <div className="flex items-center w-full justify-between mb-[60px]">
        <h2 className="core">Bulk Product</h2>
        <button
          onClick={handleUpload}
          className="w-[200px] h-[50px] rounded-[10px] text-base"
        >
          Upload Products
        </button>
      </div>
      {bulk.map((d, id) => {
        const {
          productTitle,
          description,
          price,
          category,
          images,
          inventory,
          brand,
        } = d;
        return (
          <main
            key={id}
            className="h-[250px] my-4 relative flex gap-6 px-6 py-6 rounded-[20px] border w-[900px]"
          >
            <div className="w-[235px] flex-shrink-0 border py-3 flex-col center rounded-xl h-full">
              <div className="h-[50px] w-[50px] rounded-full center bg-[#F0F2F5] mb-6">
                <FiUploadCloud size={25} />
              </div>
              {/* <p className="text-[14px] text-center text-[#ED2224]">
                Click to upload
              </p> */}
            </div>
            <div className="flex justify-between h-full">
              <div className="flex py-3 flex-col gap-4 w-[97%] h-full">
                <div>
                  <p className="text-base truncate font-light">
                    Product Name: {productTitle}
                  </p>
                  <p className="text-base truncate font-light">
                    Product Description: {description}
                  </p>
                  <p className="text-base font-light">Prod Price: #{price}</p>
                  <p className="text-base font-light">SKU </p>
                </div>
              </div>
              <div className="h-[200px] absolute right-4 justify-between items-end flex flex-col">
                <div className="h-[30px] w-[30px] center bg-[#ED2224] rounded-full text-white font-semibold">
                  {id + 1}
                </div>
                <div className="flex text-[14px] text-nowrap w-full gap-4">
                  <p onClick={() => handleRemove(id)} className="pointer">
                    Remove
                  </p>
                </div>
              </div>
            </div>
          </main>
        );
      })}
      {modalMessage && (
        <Modal
          message={modalMessage}
          success={modalSuccess}
          onClose={() => setModalMessage(null)}
        />
      )}
    </main>
  );
}

export default Page;
