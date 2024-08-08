"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { GoPeople } from "react-icons/go";
import { useGlobal } from "@/app/context";
import Loading from "../../components/Loading";
import Box from "./Box";
import { location, messages, profile, shoppingCart } from "@/utils/icons";
import Image from "next/image";
import UpdateOrder from "./UpdateOrder";

function Page({ params: { id } }) {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useGlobal();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al.onrender.com/api/v1/order/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to fetch order: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setOrder(data);
      console.log(data);

      // Fetch the product details for each order item
    } catch (error) {
      console.error("An error occurred while fetching order:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <main className="w-full p-[36px] bg-screen min-h-screen overflow-y-scroll">
      <Nav />
      <h2 className="my-[33px] text-[24px] font-semibold">
        Order Details - #{order.orderId}
      </h2>

      {/* more info */}
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="h-auto relative my-6 center w-full rounded-xl border bg-white py-8 px-4">
            {/* Delivery status */}
            <div className="flex items-center justify-between gap-4 w-full border-b border-[#F7F9FC]">
              <div className="flex items-center gap-4">
                <Image src={shoppingCart} alt="cart" />
                <div>
                  <p className="text-[12px] text-[#667185]">Status</p>
                  <p
                    className={`text-[14px] ${
                      order.status == "Ongoing" ||
                      order.status === "Pending" ||
                      order.status === "Not paid"
                        ? "text-primary"
                        : "text-green-500"
                    } text-medium`}
                  >
                    {order.status === "Pending" ||
                    order.status === "Ongoing" ||
                    order.status === "Not paid"
                      ? "Ongoing"
                      : "Completed"}
                  </p>
                </div>
              </div>
              <div className="relative">
                <p
                  onClick={() => {
                    setModal(true);
                  }}
                  className="text-[14px] bg-primary px-4 py-3 text-white text-center rounded-full cursor-pointer"
                >
                  Change status
                </p>
                {modal && (
                  <UpdateOrder
                    fetchOrders={fetchOrders}
                    id={order.orderId}
                    modal={modal}
                    setModal={setModal}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="min-h-[319px] w-full rounded-xl border bg-white p-6">
            <h3 className="text-base mb-[34px] font-semibold">Order Summary</h3>
            {loading ? (
              <Loading loading={loading} />
            ) : (
              <>
                <Box title={"Fullname"} item={order.user} image={profile} />
                <Box
                  title={"Email Address"}
                  item={order.email}
                  image={messages}
                />
                <Box
                  title={"Delivery Address"}
                  item={order.address}
                  image={location}
                />
                <Box
                  title={"Phone Number"}
                  item={order.phone}
                  image={profile}
                />
              </>
            )}
          </div>
          <div className="min-h-[300px] relative my-6 w-full rounded-xl border bg-white p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="border rounded-2xl space-y-6 p-6">
              {order.orderItems?.map((item, id) => (
                <div
                  key={id}
                  className="flex items-center justify-between text-sm mb-2"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-[95px] w-[95px] bg-gray-200 rounded-2xl"></div>
                    <div>
                      <p className="w-[375px] text-wrap mb-4 text-sm font-semibold">
                        {item.product?.productTitle}
                      </p>
                      <p className="flex font-light text-sm justify-start items-center gap-2">
                        Quantity
                        <span className="bg-red-50 rounded-full w-[56px] h-[31px] text-black center">
                          {item.qty}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-base">{`₦${formatNumberWithCommas(
                    item.price
                  )}`}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Page;
