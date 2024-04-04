import React, { useState, useEffect, useContext } from "react";
import AdminService from "../../Services/AdminService";
import { AuthContext } from "../../context/AuthProvider";

const UpdateAdminProfile = ({ adminId }) => {
  const { auth } = useContext(AuthContext);

  const [updatedAdmin, setUpdatedAdmin] = useState({
    email: "",
    phoneNumber: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    AdminService.getAdministratorById(adminId, auth.accessToken)
      .then((response) => {
        setUpdatedAdmin(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  }, [adminId, auth.accessToken]);

  const handleChange = (e) => {
    setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.updateAdministrator(adminId, updatedAdmin, auth.accessToken)
      .then(() => {
        console.log("Admin profile updated successfully!");
        setUpdateMessage("Profile updated successfully!");
        setShowForm(false); 
        setTimeout(() => {
          setUpdatedAdmin({
            email: "",
            phoneNumber: "",
          });
          setUpdateMessage("");
          setShowForm(true);
        }, 5000); 
      })
      .catch((error) => {
        console.error("Error updating admin profile:", error);
        setErrorMessage("Error updating admin profile. Please try again.");
        
        window.alert("Error updating admin profile. Please try again.");
      });
  };

  return (
    <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      {showForm && (
        <div className="mb-1 flex flex-col gap-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: "#014194" }}
          >
            Update Profile
          </h3>
          <div>
            <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={updatedAdmin.email}
              onChange={handleChange}
              placeholder="Email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-gray-700 font-semibold mb-1"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={updatedAdmin.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update
          </button>
        </div>
      )}
      {updateMessage && <p className="text-green-600">{updateMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default UpdateAdminProfile;
