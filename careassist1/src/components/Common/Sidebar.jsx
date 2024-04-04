import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"; 
import Footer from "../FooterComponents/Footer";

const Sidebar = ({ options, handleSidebarOptionClick }) => {
  return (
    <div className="bg-sky-800 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center justify-center h-20 border-b border-amber-50">
        <p className="text-2xl font-bold text-amber-50 font-Oleo">
          Care Assist{" "}
        </p>
      </div>
      <div className="mt-8">
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <button
                className="flex items-center w-full px-4 py-3 text-left text-sm font-Playfair font-bold text-amber-50 hover:bg-gray-700"
                onClick={() => handleSidebarOptionClick(option.action)}
              >
                <FontAwesomeIcon icon={option.icon} className="mr-3" />
                {option.label}
                <FontAwesomeIcon icon={faChevronRight} className="ml-auto" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
