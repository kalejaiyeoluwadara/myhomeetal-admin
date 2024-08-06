import React from "react";
import { BsChevronDown } from "react-icons/bs";
function Welcome({ id, handleDelete, category }) {
  return (
    <div className="flex  items-center justify-between">
      {category.length > 0 && (
        <section className="flex items-center gap-4 pointer ">
          <h2 className="text-[24px] font-semibold ">My {id}</h2>
          <p className="text-primary font-medium text-base">Edit Name</p>
        </section>
      )}
      <button
        onClick={handleDelete}
        className="px-6 text-[16px] py-3 flex items-center justify-center font-medium rounded-full "
      >
        Delete Category
      </button>
    </div>
  );
}

export default Welcome;
