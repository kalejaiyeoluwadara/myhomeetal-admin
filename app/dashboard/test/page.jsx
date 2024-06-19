"use client";
import React, { useEffect } from "react";
import axios from "axios";
function Page() {
  useEffect(() => {
    try {
      const data = fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/admin/get-admins"
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>Page</div>;
}

export default Page;
