"use client";
import React, { useState } from "react";
import Form from "./comp/Form";
import Modal from "./Modal";
function Page() {
  return (
    <main className="w-full relative p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Form />
    </main>
  );
}

export default Page;
