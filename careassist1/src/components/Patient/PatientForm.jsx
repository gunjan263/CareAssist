import React, { useState, useEffect, useContext } from "react";
import PatientService from "../../Services/PatientService";
import { AuthContext } from "../../context/AuthProvider";

const PatientForm = ({ id, handleClose, handleFormSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      PatientService.getPatientById(id, auth.accessToken)
        .then((response) => {
          const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            dateOfBirth,
            gender,
            symptoms,
          } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setPhoneNumber(phoneNumber);
          setAddress(address);
          setDateOfBirth(dateOfBirth);
          setGender(gender);
          setSymptoms(symptoms);
        })
        .catch((error) => {
          console.log("Error fetching patient:", error);
        });
    }
  }, [id, auth.accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      symptoms,
    };

    if (id) {
      PatientService.updatePatientById(id, data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
        });
    } else {
      PatientService.addPatient(data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error adding patient:", error);
        });
    }

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-bold mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-bold mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phoneNumber"
          className="block text-gray-700 font-bold mb-2"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
          Address
        </label>
        <textarea
          id="address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="dateOfBirth"
          className="block text-gray-700 font-bold mb-2"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
          Gender
        </label>
        <select
          id="gender"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="symptoms"
          className="block text-gray-700 font-bold mb-2"
        >
          Symptoms
        </label>
        <textarea
          id="symptoms"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
