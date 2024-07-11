"use client";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import man from "@/app/assets/wall.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useGlobal } from "./context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    role,
    setRole,
    userData,
    openModal,
    setUserData,
    setLogOut,
    switchAccount,
  } = useGlobal();
  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch(
        "https://my-home-et-al-backend.onrender.com/api/v1/admin/sign-in",
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
        setIsLoading(false);
        openModal("Login successful! Redirecting...", true);
        switchAccount();
        setEmail("");
        setPassword("");
        setTimeout(() => {
          router.push("/verify");
        }, 3000);
      } else {
        const errorData = await response.json();
        setIsLoading(false);
        openModal("Login failed: Incorrect password", false);
      }
    } catch (error) {
      setIsLoading(false);
      openModal("Login failed: Incorrect password", false);
    }
  };
  return (
    <>
      <div className="border w-[100%] h-[400px] rounded-[24px] flex items-start justify-center px-[40px] pr-[24px] flex-col border-[#DCDCDC] gap-[16px] ">
        <h3 className="text-[25px] w-full text-center font-bold ">Login</h3>
        <div className="flex flex-col w-full gap-2">
          <div className="holder">
            <label className="label">Email Address</label>
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
          <p className="text-[16px] text-center mt-[8px] text-gray-600 font-medium ">
            Don't have an account{" "}
            <a href="">
              <span className="text-primary  ">Create an account</span>
            </a>
          </p>
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
    <main className="min-h-screen w-full p-[35px] gap-[60px] flex items-start justify-center ">
      {isWideScreen ? (
        <>
          <section className="h-full w-[40%] flex flex-col items-start ">
            <Image className="mb-[81px]" alt="" src={logo} />
            <Login />
          </section>
          <section className="h-[636px] overflow-hidden w-[50%] relative rounded-[24px] ">
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
