import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Dropdown = ({
  onViewProfile,
  onUpdateProfile,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownChange = (action) => {
    switch (action) {
      case "view":
        onViewProfile();
        break;
      case "update":
        onUpdateProfile();
        break;
      case "logout":
        onLogout();
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ">
      <div>
        <FaUserCircle
          className="cursor-pointer text-3xl "
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleDropdownChange("view")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-100"
              role="menuitem"
            >
              View Profile
            </button>
            <button
              onClick={() => handleDropdownChange("update")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-100"
              role="menuitem"
            >
              Update Profile
            </button>

            <button
              onClick={() => handleDropdownChange("logout")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
