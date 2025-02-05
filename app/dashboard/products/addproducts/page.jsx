"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import AddProductForm from "./comp/AddProduct";
function Page() {
  return (
    <main className="w-full relative p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <AddProductForm />
    </main>
  );
}

export default Page;
