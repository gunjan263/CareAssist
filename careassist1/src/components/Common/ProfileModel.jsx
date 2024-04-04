import React from "react";

const ProfileModal = ({ show, handleClose, title, formComponent }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              className="absolute top-0 right-0 mt-1 mr-1"
              onClick={handleClose}
            >
              <svg
                style={{ height: "2rem", width: "2rem" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.646 2.646a.5.5 0 01.708 0L10 9.293l6.646-6.647a.5.5 0 01.708.708L10.707 10l6.647 6.646a.5.5 0 01-.708.708L10 10.707l-6.646 6.647a.5.5 0 01-.708-.708L9.293 10 2.646 3.354a.5.5 0 010-.708z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {formComponent}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
