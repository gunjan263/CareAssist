import React, { useState } from "react";

const UpdateInvoiceStatusForm = ({ onSubmit, onCancel }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedStatus);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-sky-800"
      >
        <option value="">Select Status</option>
        <option value="PAID">Paid</option>
        <option value="UNPAID">Unpaid</option>
      </select>
      <div className="mt-4 flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateInvoiceStatusForm;
