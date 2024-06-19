import React from "react";

function List() {
  return (
    <div className="grid grid-cols-3 mb-6 items-center justify-center gap-4 ">
      {[
        {
          title: "Total Sales",
          item: "32,540",
          year: "This year",
        },
        {
          title: "Total Revenue",
          item: "₦832,540.00",
          year: "This year",
        },
        {
          title: "Total Withdrawal",
          item: "₦632,540.00",
          year: "This year",
        },
      ].map((d, id) => {
        return (
          <div
            key={id}
            className=" h-[150px] border py-4 w-auto rounded-xl bg-white px-4 flex items-start justify-center flex-col "
          >
            <section className="flex w-full text-gray-500 justify-between items-center">
              <p>{d.title}</p>
              <p>{d.year}</p>
            </section>
            <section>
              <h2 className="text-[32px] font-semibold mt-8 text-[#1D2739] ">
                {d.item}
              </h2>
            </section>
          </div>
        );
      })}
    </div>
  );
}

export default List;
