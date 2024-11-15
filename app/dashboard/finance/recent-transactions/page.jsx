"use client";
import useData from "@/hooks/useData";
import React from "react";
import { BsChevronRight, BsArrowUp, BsArrowDown } from "react-icons/bs";
import Loading from "../../components/Loading";
import { useGlobal } from "@/app/context";
import Credit from "../Components/Credit";

function Page() {
  const { data, loading } = useData(
    "https://server.myhomeetal.store/api/v1/admin-wallet"
  );

  // Reverse the data array if it exists
  const reversedData = data?.userPayments?.slice().reverse();

  return (
    <main className="min-h-screen w-full py-10 bg-[#F9FAFB] ">
      <div className="grid grid-cols-1 px-9 text-2xl font-semibold w-full gap-[31px] ">
        <h2 className="text-black">Recent Transactions</h2>
        <section className="bg-white px-5 py-6 flex flex-col gap-5 relative w-auto h-full rounded-xl">
          {!loading ? (
            reversedData && reversedData.length > 0 ? (
              reversedData.map((d, id) => (
                <Credit
                  key={id}
                  name={d?.userId?.firstname || "user"}
                  method={d?.method}
                  amount={d?.amount}
                />
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No recent transactions available.
              </p>
            )
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
