import React, { useState, useEffect } from "react";
import PatientService from "../../Services/PatientService";

const UpdatePatientProfile = ({ patientId }) => {
  const [updatedPatient, setUpdatedPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    symptoms: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    loadPatientData(patientId);
  }, [patientId]);

  const loadPatientData = (patientId) => {
    PatientService.getPatientById(patientId)
      .then((response) => {
        setUpdatedPatient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  };

  const handleChange = (e) => {
    setUpdatedPatient({ ...updatedPatient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PatientService.updatePatientById(patientId, updatedPatient)
      .then(() => {
        setUpdateMessage("Profile updated successfully!");
        setShowForm(false);
        setTimeout(() => {
          setUpdatedPatient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            dateOfBirth: "",
            gender: "",
            symptoms: "",
          });
          setUpdateMessage("");
          setShowForm(true);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error updating patient profile:", error);
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
            <label
              htmlFor="firstName"
              className="text-gray-700 font-semibold mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={updatedPatient.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-gray-700 font-semibold mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={updatedPatient.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={updatedPatient.email}
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
              type="tel"
              name="phoneNumber"
              value={updatedPatient.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
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
              value={updatedPatient.address}
              onChange={handleChange}
              placeholder="Address"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="text-gray-700 font-semibold mb-1"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={updatedPatient.dateOfBirth}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-gray-700 font-semibold mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={updatedPatient.gender}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="symptoms"
              className="text-gray-700 font-semibold mb-1"
            >
              Symptoms
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={updatedPatient.symptoms}
              onChange={handleChange}
              placeholder="Symptoms"
              rows="4"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            ></textarea>
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
    </div>
  );
};

export default UpdatePatientProfile;
