"use client";
import React, { useState } from "react";
import Form from "./comp/Form";
import Modal from "./Modal";
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Product Uploaded Successfully"
  );
  return (
    <main className="w-full relative p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Modal
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Form
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </main>
  );
}

export default Page;
