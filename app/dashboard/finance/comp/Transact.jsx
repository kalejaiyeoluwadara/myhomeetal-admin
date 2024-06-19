import React from "react";
import { BsChevronRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
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
const Debit = ({ amount = 0.0, name = "Market Square" }) => {
  return (
    <section className="w-full h-[40px] flex justify-between items-center ">
      <div className="flex gap-6 items-center justify-center ">
        <div className="h-10 w-10 center text-[#D42620] bg-[#FBEAE9] rounded-full ">
          <BsArrowUp size={20} />
        </div>
        <div>
          <p className="text-[16px]  ">
            to<span className="font-medium truncate "> {name}</span>
          </p>
          <p className="text-[#98A2B3] text-[12px] ">Transfer</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-blak text-[16px] ">-#{amount}</p>
      </div>
    </section>
  );
};
const Credit = ({ amount = 0.0, name = "Market Square" }) => {
  return (
    <section className="w-full h-[40px] flex justify-between items-center ">
      <div className="flex gap-6 items-center justify-center ">
        <div className="h-10 w-10 center text-[#0F973D] font-semibold bg-[#E7F6EC] rounded-full ">
          <BsArrowDown size={20} />
        </div>
        <div>
          <p className="text-[16px]  ">
            from<span className="font-medium truncate "> {name}</span>
          </p>
          <p className="text-[#98A2B3] text-[12px] ">Transfer</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-blak text-[16px] ">+#{amount}</p>
      </div>
    </section>
  );
};
function Transact() {
  return (
    <main>
      <div className="grid grid-cols-2 mt-20 h-[388px] w-full gap-4 ">
        <section className="bg-white  px-5 py-6 flex flex-col gap-5 relative w-auto h-full rounded-xl border ">
          <Header />
          {[
            { name: "", amount: "", type: "debit" },
            { name: "Aliya Cornrad", amount: "", type: "credit" },
            { name: "Martin Stanford", amount: "", type: "debit" },
            { name: "", amount: "", type: "debit" },
            { name: "Gabriella Mark", amount: "", type: "credit" },
            { name: "", amount: "", type: "debit" },
          ].map((d, id) => {
            return (
              <>
                {d.type === "debit" ? (
                  <Debit name={d.name !== "" ? d.name : "Market Square"} />
                ) : (
                  <Credit name={d.name} />
                )}
              </>
            );
          })}
        </section>
        <section className="bg-[#F0F2F5] w-auto h-full rounded-xl  "></section>
      </div>
    </main>
  );
}

export default Transact;
