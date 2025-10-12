import { BookOpen, Grid3x3 } from "lucide-react";
import React from "react";

const BoxGridButton = ({ setViewMode, viewMode }) => {
  return (
    <div className="fixed w-fit right-6 top-[30%] md:top-[40%] z-20 justify-end items-center gap-3 mb-6 mt-8">
      <div className="flex bg-white rounded-sm border border-gray-500/20 overflow-hidden">
        <button
          onClick={() => setViewMode("grid")}
          className={`flex items-center px-2 sm:px-4 py-2 transition-colors duration-200 cursor-pointer ${
            viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Grid3x3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("book")}
          className={`flex items-center px-2 md:px-4 py-2 transition-colors duration-200 cursor-pointer ${
            viewMode === "book" ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BoxGridButton;
