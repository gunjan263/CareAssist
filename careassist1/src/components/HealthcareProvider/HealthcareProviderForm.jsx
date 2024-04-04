import React, { useState, useEffect, useContext } from "react";
import HealthcareProviderService from "../../Services/HealthcareProviderService";
import { AuthContext } from "../../context/AuthProvider";

const HealthcareProviderForm = ({ id, handleClose, handleFormSubmit }) => {
  const { auth } = useContext(AuthContext);
  const [providerName, setProviderName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      HealthcareProviderService.getHealthcareProviderById(id, auth.accessToken)
        .then((response) => {
          setProviderName(response.data.providerName);
          setAddress(response.data.address);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log("Error fetching healthcare provider:", error);
        });
    }
  }, [id, auth.accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      providerName: providerName,
      address: address,
      email: email,
    };

    if (id) {
      HealthcareProviderService.updateHealthcareProviderById(
        id,
        data,
        auth.accessToken
      )
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error updating healthcare provider:", error);
        });
    } else {
      HealthcareProviderService.addHealthcareProvider(data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error adding healthcare provider:", error);
        });
    }

    setProviderName("");
    setAddress("");
    setEmail("");
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="providerName" className="block text-gray-700">
          Healthcare Provider Name
        </label>
        <input
          type="text"
          id="providerName"
          className="form-input mt-1 block w-full"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="form-input mt-1 block w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-input mt-1 block w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-right">
        <button
          type="button"
          className="btn btn-secondary text-white mr-2 bg-gray-500"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary text-white mr-2 bg-blue-500"
        >
          {id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default HealthcareProviderForm;
