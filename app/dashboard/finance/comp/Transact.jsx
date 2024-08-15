import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import Loading from "../../components/Loading";
import Credit from "../Components/Credit";

const Header = () => {
  return (
    <header className="flex -top-10 left-0 absolute justify-between items-center w-full">
      <h2 className="text-[16px] font-semibold text-[#101928]">
        Recent Transactions
      </h2>
      <Link href={"/dashboard/finance/recent-transactions"}>
        <p className="text-[#ED2224] font-semibold items-center justify-center flex gap-[6px] text-[14px]">
          See all <BsChevronRight size={15} />
        </p>
      </Link>
    </header>
  );
};

function Transact({ data, loading }) {
  // Slice the last 5 items from the array, or return all if there are fewer than 5
  const recentPayments = (data?.userPayments || []).slice(-5).reverse();

  return (
    <main>
      <div className="grid grid-cols-1 mt-20 h-auto w-full gap-4">
        <section className="bg-white px-5 py-6 flex flex-col gap-5 relative w-auto h-full rounded-xl">
          <Header />
          {!loading ? (
            recentPayments.length > 0 ? (
              recentPayments.map((d, id) => (
                <Credit
                  key={id}
                  name={d?.userId?.firstname || "user"}
                  method={d?.method}
                  amount={d?.amount}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No recent transactions available.
              </p>
            )
          ) : (
            <Loading loading={loading} />
          )}
        </section>
      </div>
    </main>
  );
}

export default Transact;
