import React, { useState, useEffect, useContext } from "react";
import HealthcareProviderService from "../../Services/HealthcareProviderService";
import UpdateProfileModal from "../Common/ProfileModel";
import { AuthContext } from "../../context/AuthProvider";

const UpdateHealthcareProfile = ({ providerId }) => {
  const [updatedHealthcare, setUpdatedHealthcare] = useState({
    providerName: "",
    address: "",
    email: "",
  });
  const [showFormModal, setShowFormModal] = useState(false); 
  const [updateMessage, setUpdateMessage] = useState(""); 
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (providerId) {
      HealthcareProviderService.getHealthcareProviderById(
        providerId,
        auth.accessToken
      )
        .then((response) => {
          setUpdatedHealthcare(response.data);
        })
        .catch((error) => {
          console.error("Error fetching healthcare data:", error);
        });
    }
  }, [providerId]);

  const handleChange = (e) => {
    setUpdatedHealthcare({
      ...updatedHealthcare,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HealthcareProviderService.updateHealthcareProviderById(
      providerId,
      updatedHealthcare,
      auth.accessToken
    )
      .then(() => {
        console.log("Healthcare profile updated successfully!");
        setUpdateMessage("Profile updated successfully!");
        setShowFormModal(false);
      })
      .catch((error) => {
        console.error("Error updating healthcare profile:", error);
        
      });
  };

  const handleModalClose = () => {
    setShowFormModal(false);
  };

  return (
    <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <button
        onClick={() => setShowFormModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Update Profile
      </button>
      <UpdateProfileModal
        show={showFormModal}
        handleClose={handleModalClose}
        title="Update Healthcare Profile"
        formComponent={
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="providerName"
                className="text-gray-700 font-semibold mb-1"
              >
                Provider Name
              </label>
              <input
                id="providerName"
                type="text"
                name="providerName"
                value={updatedHealthcare.providerName}
                onChange={handleChange}
                placeholder="Provider Name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-gray-700 font-semibold mb-1"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={updatedHealthcare.address}
                onChange={handleChange}
                placeholder="Address"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={updatedHealthcare.email}
                onChange={handleChange}
                placeholder="Email"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update
            </button>
          </form>
        }
      />
      {updateMessage && <p className="text-green-600">{updateMessage}</p>}
    </div>
  );
};

export default UpdateHealthcareProfile;
