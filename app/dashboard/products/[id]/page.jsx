"use client";
import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Update from "./Update";
import Modal from "../addproducts/Modal";

function Page({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Product Deleted Successfully, Refresh Page"
  );
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalMessage={modalMessage}
      />
      <Update id={params.id} />
    </main>
  );
}

export default Page;
