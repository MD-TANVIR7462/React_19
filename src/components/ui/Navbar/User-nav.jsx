import { Lock } from "lucide-react";
import React from "react";

const Usernav = () => {
  // const user = true;
  // if (user) {
  //   return null;
  // }

  return (
    <div className="block  border-t border-border bg-[#61a741]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 h-12">
          <a className="text-xs font-medium   transition-colors duration-200 relative group text-white flex gap-1 cursor-pointer ">
            <Lock className="h-4 w-4 md:w-5 md:h-5 " /> Login / Register
            <span className="absolute  left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Usernav;
