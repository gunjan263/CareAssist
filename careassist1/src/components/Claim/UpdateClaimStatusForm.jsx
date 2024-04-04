import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const UpdateClaimStatusForm = ({ onSubmit }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [claimApprovalDate, setClaimApprovalDate] = useState("");
  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedStatus, claimApprovalDate, auth.accessToken);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="">Select Status</option>
        <option value="Approved">Approved</option>
        <option value="Under Process">Under Process</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        value={claimApprovalDate}
        onChange={(e) => setClaimApprovalDate(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateClaimStatusForm;
