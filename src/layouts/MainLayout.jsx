import AutoScroll from "@/components/Shared/Scroll/AutoScroll";
import ScrollToTop from "@/components/Shared/Scroll/ScrollToTop";
import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#f3f5f6]">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 ">
        <AutoScroll />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
