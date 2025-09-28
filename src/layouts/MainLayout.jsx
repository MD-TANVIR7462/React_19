import Navbar from "@/MyComponent/Ui/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-4 ">
        <Outlet />
      </div>

    </>
  );
};

export default MainLayout;
