import React, { useState, useEffect, useRef, useContext } from "react";
import HealthcareProviderService from "../../Services/HealthcareProviderService";
import { AuthContext } from "../../context/AuthProvider";

const ViewHealthcareProfile = ({ providerId }) => {
  const [healthcareProvider, setHealthcareProvider] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadHealthcareProviderData(providerId);
  }, [providerId]);

  const loadHealthcareProviderData = (providerId) => {
    HealthcareProviderService.getHealthcareProviderById(
      providerId,
      auth.accessToken
    )
      .then((response) => {
        setHealthcareProvider(response.data);
        setShowProfile(true); // Automatically open the profile
      })
      .catch((error) => {
        console.error("Error fetching healthcare provider data:", error);
      });
  };

  useEffect(() => {
    console.log("Healthcare Provider:", healthcareProvider);
  }, [healthcareProvider]);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {showProfile && healthcareProvider && (
        <div
          className="bg-white p-8 rounded shadow-md max-w-md mx-auto relative"
          ref={profileRef}
        >
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Name:</p>
            <p className="text-gray-900">{healthcareProvider.providerName}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-gray-900">{healthcareProvider.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Address:</p>
            <p className="text-gray-900">{healthcareProvider.address}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewHealthcareProfile;
