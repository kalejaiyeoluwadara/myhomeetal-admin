import { useGlobal } from "@/app/context";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

function CheckMark({ product }) {
  const { toBeDeleted, setToBeDeleted } = useGlobal();
  const [isActive, setIsActive] = useState(false);

  // Toggle product selection
  const handleClick = () => {
    if (isActive) {
      // Remove product from toBeDeleted
      setToBeDeleted((prev) => prev.filter((item) => item._id !== product._id));
    } else {
      // Add product to toBeDeleted
      setToBeDeleted((prev) => [...prev, product]);
    }
    setIsActive(!isActive); // Toggle active state
  };

  // Update active state if product is in toBeDeleted
  useEffect(() => {
    setIsActive(toBeDeleted.some((item) => item._id === product._id));
  }, [toBeDeleted, product._id]);

  return (
    <div
      onClick={handleClick}
      className={`h-4 w-4 cursor-pointer transition-all duration-700 ease-in-out flex items-center justify-center absolute left-3 rounded-md ${
        isActive ? "bg-blue-500 border-none" : "bg-white border border-gray-800"
      }`}
    >
      {isActive && <FaCheck className="text-white" size={10} />}
    </div>
  );
}

export default CheckMark;
