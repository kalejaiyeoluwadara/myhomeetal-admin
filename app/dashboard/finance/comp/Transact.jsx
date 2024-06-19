import React from "react";
import { BsChevronRight } from "react-icons/bs";
const Header = () => {
  return (
    <header className="flex -top-10 left-0 absolute justify-between items-center w-full">
      <h2 className="text-[16px] font-semibold text-[#101928] ">
        Recent Transactions
      </h2>
      <p className="text-[#ED2224] font-semibold items-center justify-center flex gap-[6px] text-[14px] ">
        See all <BsChevronRight size={15} />{" "}
      </p>
    </header>
  );
};
function Transact() {
  return (
    <main>
      <div className="grid grid-cols-2 mt-20 h-[388px] w-full gap-4 ">
        <section className="bg-white px-5 py-6 relative w-auto h-full rounded-xl border ">
          <Header />
        </section>
        <section className="bg-[#F0F2F5] w-auto h-full rounded-xl  "></section>
      </div>
    </main>
  );
}

export default Transact;
