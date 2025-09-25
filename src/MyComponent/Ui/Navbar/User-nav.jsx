import { Lock } from "lucide-react";
import React from "react";

const Usernav = () => {
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Gift", href: "/gift" },
    { name: "Islamic", href: "/islamic" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="block  border-t border-border bg-[#61a741]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 h-12">
          
            <a
              className="text-ms font-medium   transition-colors duration-200 relative group text-white flex gap-1"
            >
              <Lock className="w-5 h-5 "/> Login / Register
              {/* <span className="absolute -bottom-3 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span> */}
            </a>
        </div>
      </div>
    </div>
  );
};

export default Usernav;
