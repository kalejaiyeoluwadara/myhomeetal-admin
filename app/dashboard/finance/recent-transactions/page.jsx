"use client";
import useData from "@/hooks/useData";
import React from "react";
import { BsChevronRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
import Loading from "../../components/Loading";
import { useGlobal } from "@/app/context";
import Credit from "../Components/Credit";
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

function Page() {
  const { data, loading } = useData(
    "https://my-home-et-al.onrender.com/api/v1/admin-wallet"
  );
  return (
    <main className="min-h-screen w-full py-10 bg-[#F9FAFB] ">
      <div className="grid  grid-cols-1 px-9 text-2xl font-semibold w-full gap-[31px] ">
        <h2 className="text-black">Recent Transactions</h2>
        <section className="bg-white  px-5 py-6 flex flex-col gap-5 relative w-auto h-full rounded-xl  ">
          {!loading ? (
            data?.userPayments?.map((d, id) => {
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
        {/* <section className="bg-[#F0F2F5] w-auto h-full rounded-xl  "></section> */}
      </div>
    </main>
  );
}

export default Page;
