"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import man from "@/app/assets/log.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useGlobal } from "./context";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { role, setRole, userData, openModal, setUserData, setLogOut } =
    useGlobal();
  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch(
        "https://my-home-et-al.onrender.com/api/v1/admin/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.adminProfile));
        localStorage.setItem("username", data.adminProfile?.username);
        localStorage.setItem("email", data.adminProfile?.email);
        localStorage.setItem("fullname", data.adminProfile?.fullname);
        localStorage.setItem("image", data.adminProfile?.image);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.adminProfile.role);
        localStorage.setItem("id", data.adminProfile?.id);
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          const role = localStorage.getItem("role");
          openModal("Login Successful, Welcome Back!", true);
          if (role === "Super Admin") {
            router.push("/dashboard");
          } else {
            router.push("/dashboard/admin/employee");
          }
        }, 1500);
      } else {
        openModal("Incorrect information, try again!", false);
        const errorData = await response.json();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      openModal("Login failed.", false);
    }
  };

  return (
    <>
      <div className="border w-[100%] h-[400px] rounded-[24px] flex items-start justify-center px-[40px] pr-[24px] flex-col border-[#DCDCDC] gap-[16px] ">
        <h3 className="text-[25px] w-full text-center font-light ">
          Admin Panel Login
        </h3>
        <div className="flex flex-col w-full gap-1">
          <div className="holder">
            <label className="label">Work Email Address</label>
            <input
              className="inputa"
              placeholder="Enter Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="holder mt-4 ">
            <label className="label">Password</label>
            <input
              className="inputa"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="w-full text-end text-primary ">
            <Link href={"/"}>Forgot Password</Link>
          </p>
        </div>
        <div className="w-full">
          <div
            onClick={handleLogin}
            className={`cursor-pointer mt-4 w-full h-[52px] flex items-center justify-center rounded-[99px] text-[16px] font-bold ${
              isLoading ? "bg-gray-400" : "bg-primary text-white"
            }`}
          >
            {isLoading ? <div className="loader"></div> : "Login"}
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default function Page() {
  const [isWideScreen, setIsWideScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024); // Adjust the width as needed
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);
  return (
    <main className="h-screen w-full  pl-[35px] gap-[60px] flex items-center justify-between ">
      {isWideScreen ? (
        <>
          <section className="h-full  w-[40%] flex flex-col items-start justify-evenly ">
            <Image className="" alt="" src={logo} />
            <Login />
          </section>
          <section className="h-screen overflow-hidden w-[50%] relative ">
            <Image className="cover" src={man} alt="" />
          </section>
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Screen Too Small</h2>
            <p className="text-lg">
              Please use a laptop or a device with a wider screen to view this
              content.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
