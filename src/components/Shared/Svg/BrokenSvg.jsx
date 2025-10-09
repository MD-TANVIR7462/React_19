import React from "react";

const BrokenSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-12 h-12 text-gray-400"
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="3 17 8 12 13 17 21 9" />
      <line x1="13" y1="13" x2="21" y2="21" />
    </svg>
  );
};

export default BrokenSvg;
