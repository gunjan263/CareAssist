import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import { AuthContext } from "../../context/AuthProvider";

const ViewAdminProfile = ({ adminId }) => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadAdminData(id);
  }, [id]);

  const loadAdminData = () => {
    AdminService.getAdministratorById(adminId, auth.accessToken)
      .then((response) => {
        setAdmin(response.data);
        setShowProfile(true);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
        window.alert("Error fetching admin data");
      });
  };

  // const toggleProfile = () => {
  //   setShowProfile(!showProfile);
  // };

  return (
    <div className="container mx-auto mt-8">
      {showProfile && admin && (
        <div
          className="bg-white p-8 rounded shadow-md max-w-md mx-auto relative"
          ref={profileRef}
        >
          <button
            className="absolute top-0 right-0 mt-1 mr-1"
            onClick={() => setAdmin(null)}
          >
            <svg
              className="h-6 w-6 text-gray-600 hover:text-gray-800"
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
          <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-gray-900">{admin.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Phone Number:</p>
            <p className="text-gray-900">{admin.phoneNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAdminProfile;
