import React from "react";
import Welcome from "./Welcome";
import Update from "./Update";
function Page({ params }) {
  return (
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Welcome />
      <Update id={params.id} />
    </main>
  );
}

export default Page;
