"use client";
import Image from "next/image";
import logo from "../app/assets/logo.svg";
import man from "../app/assets/wall.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useGlobal } from "./context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, setRole } = useGlobal();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setModalMessage("");
    setIsModalOpen(false);

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
        localStorage.setItem("token", data.token);

        setIsLoading(false);
        setModalMessage("Login successful! Redirecting...");
        setIsModalOpen(true);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setIsModalOpen(false);
          if (data.adminProfile.role === "Super Admin") {
            setRole("Super Admin");
            console.log("role:", role);
            router.push("/dashboard");
          } else {
            router.push("/dashboard/admin/employee");
          }
        }, 4000);
      } else {
        const errorData = await response.json();
        setIsLoading(false);
        setModalMessage(`Login failed: Incorrect password`);
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 4000);
      }
    } catch (error) {
      setIsLoading(false);
      setModalMessage("An error occurred during login. Please try again.");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 4000);
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

      {isModalOpen && (
        <div className="w-screen fixed z-40 top-0 left-0 center">
          <div className="w-auto px-6 h-[60px] gap-4 center bg-white rounded-xl ">
            {modalMessage === "Login successful! Redirecting..." ? (
              <FaCheckCircle className=" text-green-500 " size={30} />
            ) : (
              <MdError className="text-primary  " />
            )}
            <p className="text-[16px] text-black ">{modalMessage}</p>
          </div>
        </div>
      )}

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
  return (
    <main className="min-h-screen w-full p-[35px] gap-[60px] flex items-start justify-center ">
      <section className="h-full w-[40%] flex flex-col items-start ">
        <Image className="mb-[81px]" alt="" src={logo} />
        <Login />
      </section>
      <section className="h-[636px] overflow-hidden w-[50%] relative rounded-[24px] ">
        <Image className="cover" src={man} alt="" />
      </section>
    </main>
  );
}
