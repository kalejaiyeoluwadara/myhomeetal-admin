// Loading.js
import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div className="h-[60vh] w-full center">
      <ClipLoader color="#ED2224" loading={loading} size={50} />
    </div>
  );
};

export default Loading;
