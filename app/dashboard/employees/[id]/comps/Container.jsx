import React from "react";
import { GoPeople } from "react-icons/go";
function Container({
  title,
  data,
  editController,
  setController,
  formData,
  setFormData,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="h-auto w-auto border flex flex-col rounded-xl gap-[24px] bg-white p-6 ">
      <div className="flex justify-between items-center">
        <h2 className=" text-[16px] font-semibold ">{title}</h2>
        <div
          onClick={() => {
            setController(!editController);
          }}
          className="border px-4 py-2 pointer border-border rounded-[8px] text-blak text-[14px] font-semibold"
        >
          {!editController ? "Edit" : "Done"}
        </div>
      </div>

      <section className="flex flex-col w-full">
        {data.map((d, id) => {
          return (
            <div
              key={id}
              className="flex h-[69px] border-b border-[#F7F9FC] p-[14px] gap-4 items-center justify-start "
            >
              <div>
                <GoPeople size={20} className="text-[#98A2B3]" />
              </div>
              <div className=" w-full ">
                <p className="text-[12px] font-normal text-[#667185]  ">
                  {d.title}
                </p>
                <input
                  value={d.item}
                  disabled={!editController}
                  name={d.formName}
                  type={d.formName === "password" ? "password" : "text"}
                  onChange={handleInputChange}
                  autoComplete={false}
                  autoSave={false}
                  placeholder={`${
                    d.formName === "password"
                      ? "Enter New Password"
                      : "Enter Subject"
                  }`}
                  className="text-[14px] outline-none border-none w-full bg-transparent truncate font-medium text-black "
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Container;
