import React, { useState } from "react";
import { Home, TrendingUp, FileText, Users, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: "Dashboard", route: "/salesman-dashboard" },
    { icon: TrendingUp, label: "Sales Order", route: "/salesman-dashboard/salesorders" },
    { icon: FileText, label: "Invoice", route: "/salesman-dashboard/invoices" },
    { icon: Users, label: "Customer List", route: "/salesman-dashboard/cutomers" },
    { icon: User, label: "Profile", route: "/salesman-dashboard/profile" },
  ];

  return (
    <aside className="w-full mb-5 lg:mb-0 lg:w-72 bg-card md:p-6  sm:p-4 p-3 flex flex-col rounded-sm h-fit">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-3 md:mb-5 lg:mb-8">
        <Avatar className="w-20 h-20 md:w-28 md:h-28 lg:h-32 lg:w-32 mb-2 md:mb-4">
          <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Joe Draft" />
          <AvatarFallback className=" text-lg md:text-xl lg:text-2xl">JD</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-foreground">Joe Draft</h2>
        <p className="text-sm text-muted-foreground">joe.draft@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems?.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              navigate(item.route);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors cursor-pointer ${
              pathname === item.route
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <item.icon className="md:h-5 md:w-5 h-4 w-4" />
            {item.label}
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
