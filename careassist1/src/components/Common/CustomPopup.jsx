import React from "react";

const CustomPopup = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div
        className="bg-blue p-8 rounded-lg"
        style={{
          maxWidth: "400px",
          backgroundColor: "#B9D9EB",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-lg font-semibold text-red-500 mb-4">
          Important Message
        </h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;