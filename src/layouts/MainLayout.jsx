import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#f3f5f6]">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 "
      
      >
        {/*border md:border-red-500 lg:border-green-500 xl:border-blue-500 sm:border-yellow-500" */}
      
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
