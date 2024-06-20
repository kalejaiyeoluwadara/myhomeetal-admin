import React from "react";
import Welcome from "./comp/Welcome";
import Form from "./comp/Form";
function Page() {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Welcome />
      <Form />
    </main>
  );
}

export default Page;
