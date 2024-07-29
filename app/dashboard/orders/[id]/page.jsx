"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { GoPeople } from "react-icons/go";
import { useGlobal } from "@/app/context";
import Loading from "../../components/Loading";
import Box from "./Box";

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

function Page({ params: { id } }) {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useGlobal();

  const fetchUser = async (userId, token) => {
    try {
      console.log("Fetching user with token:", token);
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching user:", error);
      throw error;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://my-home-et-al-backend.onrender.com/api/v1/order/${id}`,
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
      fetchUser(data.user, token);
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
        Order Details - {id}
      </h2>
      <div className="h-[319px]  w-full rounded-xl border bg-white p-6  ">
        <h3 className="text-base mb-[34px] font-semibold ">Order Summary</h3>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Box title={"Fullname"} item={user.fullname} />
            <Box title={"Email Address"} item={user.email} />
            <Box title={"Phone Number"} item={user.phone} />
          </>
        )}
      </div>

      {/* more info */}
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="min-h-[300px] relative  my-6 w-full rounded-xl border bg-white p-6  ">
            <h2 className="core ">Delivery Status</h2>
            {/* Option */}
            <div className="flex items-center justify-between mt-6 gap-4 h-[69px] w-full border-b py-[14px] border-[#F7F9FC] ">
              <div className="flex items-center   gap-4">
                <GoPeople />
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
                <p className="text-[14px] pointer ">Change status</p>
                {modal && <Modal setStatus={setStatus} />}
              </div>
            </div>

            <Box title={"Delivery Address"} item={order.address} />
            <Box title={"OrderId"} item={order.orderId} />
            <Box title={"Payment Method"} item={order.paymentMethod} />
            <Box
              title={"Total Price"}
              item={formatNumberWithCommas(order.orderPrice)}
            />
          </div>

          <div className="center w-full mt-[62px]  ">
            <button className="w-[435px] core rounded-xl flex items-center justify-center h-[63px]  ">
              Generate QR
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Page;
