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
  const { bulk, setBulk, openModal, token } = useGlobal();
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    if (!Array.isArray(bulk) || bulk.length === 0) {
      console.log("Bulk data is not properly formatted or is empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://my-home-et-al.onrender.com/api/v1/product/bulk-publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        setTimeout(() => {
          openModal("Products added successfully.", true);
          router.push("/dashboard/products");
        }, 3000);
      }
    } catch (e) {
      console.log("Error during upload:", e);
      openModal("Product upload failed.", false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    const updatedBulk = bulk.filter((_, i) => i !== index);
    setBulk(updatedBulk);
    openModal("Product removed", true);
  };
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <div className="flex items-center w-full justify-between mb-[60px]">
        <h2 className="font-semibold text-2xl ">Bulk Product</h2>
        <button
          onClick={handleUpload}
          className={`w-[354px] ${
            !loading
              ? "bg-primary cursor-pointer hover:bg-red-700  "
              : "bg-gray-500"
          } center h-[52px] cursor-not-allowed rounded-[10px] text-[16px] font-medium`}
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
            <div className="w-[235px] relative overflow-hidden flex-shrink-0  py-3 flex-col center rounded-xl h-full">
              <div className="h-[183px]  w-[183px] rounded-full center  mb-6">
                {!images.length > 0 ? (
                  <FiUploadCloud size={25} />
                ) : (
                  <div className="gap-2 grid grid-cols-2">
                    {images.map((item, id) => {
                      return (
                        <img
                          className=" h-[81px] w-[81p] "
                          src={images[id]}
                          alt=""
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              {/* <p className="text-[14px] text-center text-[#ED2224]">
                Click to upload
              </p> */}
            </div>
            <div className="flex justify-between h-full">
              <div className="flex py-3 flex-col gap-4 w-[97%] h-full">
                <div className="space-y-4">
                  <p className="text-base truncate font-light">
                    Product Name: {productTitle}
                  </p>
                  <p className="text-base truncate font-light">
                    Product Description: {description}
                  </p>
                  <p className="text-base font-light">
                    Prod Price: <span className="font-bold">₦</span>
                    {formatNumberWithCommas(price)}
                  </p>
                  <p className="text-base font-light">Brand: {brand}</p>
                </div>
              </div>
              <div className="h-[200px] absolute right-4 justify-between items-end flex flex-col">
                <div className="h-[30px] w-[30px] center bg-black rounded-full text-white font-semibold">
                  {id + 1}
                </div>
                <div className="flex text-[14px] text-nowrap w-full gap-4">
                  <p
                    onClick={() => handleRemove(id)}
                    className=" text-primary pointer"
                  >
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
