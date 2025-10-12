import AutoScroll from "@/components/Shared/Scroll/AutoScroll";
import ScrollToTop from "@/components/Shared/Scroll/ScrollToTop";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#f3f5f6] min-h-screen">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 ">
        <ScrollToTop />
        <AutoScroll />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
