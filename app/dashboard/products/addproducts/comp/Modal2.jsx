import React from "react";

const Modal2 = ({
  subCat,
  categories,
  setSubCat,
  setformContent,
  formContent,
}) => {
  return (
    <div className="flex flex-col h-[250px] overflow-y-scroll no-scrollbar top-[87px] p-4 right-6 w-[250px] rounded-xl border bg-white absolute z-20">
      {categories.map((d, id) => (
        <p
          key={id}
          onClick={() => {
            setformContent({ ...formContent, category: d._id });
            setSubCat(d.name);
          }}
          className="px-2 text-base rounded-md cursor-pointer hover:bg-red-50 py-2"
        >
          {d.name}
        </p>
      ))}
    </div>
  );
};

export default Modal2;
