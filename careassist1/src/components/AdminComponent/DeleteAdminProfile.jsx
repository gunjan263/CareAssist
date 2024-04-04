import React, { useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import { AuthContext } from "../../context/AuthProvider";

const DeleteAdminProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true); 
  const { auth } = useContext(AuthContext);

  const handleDelete = () => {
    setLoading(true);

    AdminService.deleteAdministrator(id, auth.accessToken)
      .then(() => {
        setDeleted(true);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Hide the confirmation box
  };

  // If deletion is successful, navigate to "/success"
  if (deleted) {
    return <Navigate to="/success" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {showConfirmation && (
        <div className="p-4 bg-white rounded-md shadow-md ">
          <h2 className="text-xl font-semibold mb-4">Delete Admin Profile</h2>
          <p className="mb-4">
            Are you sure you want to delete this admin profile?
          </p>
          {error && <p className="text-red-500 mb-4">Error: {error}</p>}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAdminProfile;
