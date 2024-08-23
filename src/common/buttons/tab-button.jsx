/* eslint-disable react/prop-types */
import React from "react";

const TabButton = ({ isActive, onClick, icon, label }) => {
  return (
    <button
      className={`flex-1 text-gray-700 font-medium py-2 flex justify-center items-center flex-wrap ${
        isActive ? "border-b-2 border-purple-500 bg-[#F2F2F2]" : ""
      }`}
      onClick={onClick}
    >
      <span className="mr-4">{icon}</span> {label}
    </button>
  );
};

export default TabButton;
