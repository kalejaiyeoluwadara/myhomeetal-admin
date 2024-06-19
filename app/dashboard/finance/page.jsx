import React from "react";
import Welcome from "./comp/Welcome";
import Status from "./comp/Status";
import List from "./comp/List";
import Transact from "./comp/Transact";
Status;
function Page() {
  return (
    <div className="w-full p-[36px] bg-screen   min-h-screen overflow-y-scroll ">
      <Welcome />
      <Status />
      <List />
      <Transact />
    </div>
  );
}

export default Page;
