import Image from "next/image";
import logo from "../app/assets/logo.svg";
import man from "../app/assets/wall.svg";
import Link from "next/link";
const Login = () => {
  return (
    <div className="border w-[437px] h-[389px] rounded-[24px] flex items-center justify-center p-[24px] flex-col border-[#DCDCDC] gap-[16px] ">
      <h3 className="text-[25px] font-bold ">Login</h3>
      <div className="holder">
        <label className="label">Email Address</label>
        <input
          className="inputa"
          placeholder="Enter Email Address"
          type="email"
        />
      </div>
      <div className="holder">
        <label className="label">Password</label>
        <input
          className="inputa"
          placeholder="Enter Password"
          type="password"
        />
      </div>
      <div className="w-full">
        <Link href="/dashboard">
          {" "}
          <div className=" w-full h-[52px] bg-primary text-white flex items-center justify-center rounded-[99px] text-[16px] font-bold ">
            Login
          </div>
        </Link>
        <p className="text-[16px] text-center mt-[8px] text-gray-600 font-bold ">
          Don't have an account{" "}
          <a href="">
            <span className="text-primary  ">Create an account</span>
          </a>
        </p>
      </div>
    </div>
  );
};
export default function Home() {
  return (
    <main className="min-h-screen w-full p-[35px] gap-[100px]   flex items-start justify-end ">
      <section className="h-full flex flex-col items-start  ">
        <Image className="mb-[81px]" alt="" src={logo} />
        <Login />
      </section>
      <section className=" h-[636px]  overflow-hidden w-[610px] relative rounded-[24px] ">
        <Image className="cover" src={man} alt="" />
      </section>
    </main>
  );
}
