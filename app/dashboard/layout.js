import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Dashboard - Admin | My home etal",
  description: "Dashboard - Admin | My home etal",
};

export default function Layout({ children }) {
  return (
    <div className=" flex overflow-hidden relative ">
      <div className=" relative flex-shrink-0 overflow-hidden border-r  w-[272px]">
        <div className="fixed w-[272px]">
          <Sidebar />
        </div>
      </div>
      <div className="flex relative flex-col w-full items-start justify-start  ">
        <div className="fixed pr-[270px] top-0 z-20 w-screen  ">
          <NavBar />
        </div>
        <main className="relative w-full mt-20   ">{children}</main>
        <Logout />
        <></>
      </div>
    </div>
  );
}
