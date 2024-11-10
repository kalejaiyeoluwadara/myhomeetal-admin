import { useGlobal } from "@/app/context";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

function CheckMark({ product }) {
  const { toBeDeleted, setToBeDeleted } = useGlobal();
  const [isActive, setIsActive] = useState(false);

  // Toggle product selection
  const handleClick = () => {
    if (isActive) {
      // Remove product ID from toBeDeleted
      setToBeDeleted((prev) => prev.filter((id) => id !== product._id));
    } else {
      // Add product ID to toBeDeleted
      setToBeDeleted((prev) => [...prev, product._id]);
    }
    setIsActive(!isActive); // Toggle active state
  };

  // Update active state if product ID is in toBeDeleted
  useEffect(() => {
    setIsActive(toBeDeleted.includes(product._id));
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
