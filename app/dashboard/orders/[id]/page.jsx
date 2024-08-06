"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { GoPeople } from "react-icons/go";
import { useGlobal } from "@/app/context";
import Loading from "../../components/Loading";
import Box from "./Box";
import { location, messages, profile, shoppingCart } from "@/utils/icons";
import Image from "next/image";

const Modal = ({ setStatus }) => {
  return (
    <div className="absolute w-[280px] px-4 py-5 h-[288px] rounded-[10px] bg-white border top-10 right-8 ">
      <p>Change Status</p>
      <div className="w-full flex flex-col gap-4  mt-4 ">
        <p
          onClick={() => {
            setStatus("Pending");
          }}
          className="w-full pointer shadowt center bg-[#FFF1F1] text-[#D54A4C] rounded-[10px] h-[60px] "
        >
          Pending
        </p>
        <p
          onClick={() => {
            setStatus("Ongoing");
          }}
          className="w-full pointer shadowt center bg-[#E3EFFC] text-[#04326B] rounded-[10px]  h-[60px] "
        >
          Ongoing
        </p>
        <p
          onClick={() => {
            setStatus("Delivered");
          }}
          className="w-full pointer shadowt center bg-[#E7F6EC] text-[#1F7C3F] rounded-[10px]  h-[60px] "
        >
          Delivered
        </p>
      </div>
    </div>
  );
};

const fetchProduct = async (productId, token) => {
  try {
    const response = await fetch(
      `https://my-home-et-al-backend.onrender.com/api/v1/product/${productId}`,
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
        `Failed to fetch product: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    const data = await response.json();
    return data.productTitle;
  } catch (error) {
    console.error("An error occurred while fetching product:", error);
    return null;
  }
};

function Page({ params: { id } }) {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useGlobal();

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(
        `https://my-home-et-al.onrender.com/api/v1/user/${userId}`,
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
          `Failed to fetch user: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("An error occurred while fetching user:", error);
    }
  };

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

      // Fetch the user details
      fetchUser(data.user);

      // Fetch the product details for each order item
      const orderItemsWithProductNames = await Promise.all(
        data.orderItems.map(async (item) => {
          const productTitle = await fetchProduct(item.product, token);
          return { ...item, productTitle };
        })
      );
      setOrderItems(orderItemsWithProductNames);
    } catch (error) {
      console.error("An error occurred while fetching order:", error);
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
    <main className="w-full p-[36px] bg-screen  min-h-screen overflow-y-scroll ">
      <Nav />
      <h2 className="my-[33px] text-[24px] font-semibold text- ">
        Order Details - #{order.orderId}
      </h2>

      {/* more info */}
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="h-auto relative my-6 center  w-full rounded-xl border bg-white py-8 px-4  ">
            {/* <h2 className="text-base font-semibold  ">Delivery Status</h2> */}
            {/* Option */}
            <div className="flex items-center justify-between  gap-4 w-full border-b border-[#F7F9FC] ">
              <div className="flex items-center   gap-4">
                <Image src={shoppingCart} alt="cart" />
                <div className="">
                  <p className="text-[12px] text-[#667185] ">Status</p>
                  <p
                    className={`text-[14px] ${
                      status === "Pending"
                        ? "text-c7"
                        : status === "Ongoing"
                        ? "text-[#04326B]"
                        : "text-[#1F7C3F]"
                    } text-medium `}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setModal((prev) => !prev);
                }}
                className="relative"
              >
                <p className="text-[14px] bg-primary px-4 py-3 text-white text-center rounded-full pointer cursor-pointer ">
                  Change status
                </p>
                {modal && <Modal setStatus={setStatus} />}
              </div>
            </div>

            {/* <Box title={"OrderId"} item={order.orderId} />
            <Box title={"Payment Method"} item={order.paymentMethod} />
            <Box
              title={"Total Price"}
              item={`₦${formatNumberWithCommas(order.orderPrice)}`}
            /> */}
          </div>
          <div className="min-h-[319px]  w-full rounded-xl border bg-white p-6  ">
            <h3 className="text-base mb-[34px] font-semibold ">
              Order Summary
            </h3>
            {loading ? (
              <Loading loading={loading} />
            ) : (
              <>
                <Box title={"Fullname"} item={user.fullname} image={profile} />
                <Box
                  title={"Email Address"}
                  item={user.email}
                  image={messages}
                />
                <Box
                  title={"Delivery Address"}
                  item={order.address}
                  image={location}
                />
                <Box title={"Phone Number"} item={user.phone} image={profile} />
              </>
            )}
          </div>
          <div className="min-h-[300px] relative  my-6 w-full rounded-xl border bg-white p-6  ">
            <h2 className="font-semibold text-lg mb-4 ">Order Summary</h2>
            <div className="border rounded-2xl space-y-6  p-6 ">
              {orderItems.map((item, id) => (
                <div
                  key={id}
                  className=" flex items-center  justify-between text-sm mb-2"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-[95px] w-[95px] bg-gray-200 rounded-2xl "></div>
                    <div className="  ">
                      <p className=" w-[375px] text-wrap mb-4 text-sm font-semibold">
                        {" "}
                        Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 -
                        Light Green {item.productTitle}
                      </p>
                      <p className="flex font-light text-sm justify-start items-center gap-2">
                        Quantity{" "}
                        <span className="bg-red-50 rounded-full w-[56px] h-[31px] text-black center ">
                          {item.qty}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p>Price: {`₦${formatNumberWithCommas(item.price)}`}</p>
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
