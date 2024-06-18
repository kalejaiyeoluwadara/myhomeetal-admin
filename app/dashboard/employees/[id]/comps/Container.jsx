import React from "react";
import { GoPeople } from "react-icons/go";
function Container({ title, data }) {
  return (
    <div className="h-[461px] w-auto border flex flex-col rounded-xl gap-[44px] bg-white p-6 ">
      <div className="flex justify-between items-center">
        <h2 className=" text-[16px] font-semibold ">Personal information</h2>
        <div className="border px-4 py-2 border-border rounded-[8px] text-blak text-[14px] font-semibold">
          Edit
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
                <p className="text-[14px] w-[93%] truncate font-medium text-black ">
                  {d.item}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Container;
