import Link from "next/link";
import React from "react";
import { BsChevronRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
import Loading from "../../components/Loading";
import { useGlobal } from "@/app/context";
import Credit from "../Components/Credit";

const Header = () => {
  return (
    <header className="flex -top-10 left-0 absolute justify-between items-center w-full">
      <h2 className="text-[16px] font-semibold text-[#101928] ">
        Recent Transactions
      </h2>
      <Link href={"/dashboard/finance/recent-transactions"}>
        <p className="text-[#ED2224] font-semibold items-center justify-center flex gap-[6px] text-[14px] ">
          See all <BsChevronRight size={15} />{" "}
        </p>
      </Link>
    </header>
  );
};

const Debit = ({ amount, name }) => {
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
        <p className="font-semibold text-black text-[16px] ">-#{amount}</p>
      </div>
    </section>
  );
};

function Transact({ data, loading }) {
  // Get the first 10 items
  const recentPayments = data?.userPayments?.slice(0, 5) || [];

  return (
    <main>
      <div className="grid grid-cols-1 mt-20 h-auto w-full gap-4 ">
        <section className="bg-white px-5 py-6 flex flex-col gap-5 relative w-auto h-full rounded-xl">
          <Header />
          {!loading ? (
            recentPayments.map((d, id) => {
              return (
                <Credit
                  name={d?.userId?.firstname || "user"}
                  method={d?.method}
                  amount={d?.amount}
                />
              );
            })
          ) : (
            <Loading loading={loading} />
          )}
        </section>
      </div>
    </main>
  );
}

export default Transact;
