import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, children, title, width ,color="bg-white",bgcolor="bg-black/50"}) => {
  useEffect(() => {
    // Disable scroll when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup the scroll behavior when modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto ">
      <div className={`fixed inset-0 ${bgcolor} `} onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4 ">
        <div
          className={`relative ${color} rounded-sm ${
            width ? width : "max-w-2xl"
          } w-full max-h-[90vh] overflow-y-auto`}
        >
          <div className={`sticky top-0 z-50 bg-white  lg:bg-gray-200/50 p-2 sm:p-4 border-b  flex justify-between items-center`}>
            <h2 className= "text-xl sm:text-2xl font-semibold text-black">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className=" p-2 md:p-3 lg:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
