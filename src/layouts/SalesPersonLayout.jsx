import SideBar from "@/components/SalesPersonDashboard/SideBar/SideBar";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function SalesPersonLayout() {
  return (
    <div className="bg-[#f3f5f6] min-h-screen">
      <Navbar />
      <div className="lg:flex py-5 gap-5 max-w-[1400px] mx-auto px-2 lg:px-4 ">
        {/* Sidebar */}
        <SideBar />
        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
