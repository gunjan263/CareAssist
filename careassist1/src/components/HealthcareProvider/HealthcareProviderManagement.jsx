import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import HealthcareProviderService from "../../Services/HealthcareProviderService";
import UpdateProfileModal from "../Common/ProfileModel";
import HealthcareProviderForm from "./HealthcareProviderForm";
import { AuthContext } from "../../context/AuthProvider";

const HealthcareProviderManagement = () => {
  const [healthcareProviders, setHealthcareProviders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [providerToUpdate, setProviderToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalProviders, setTotalProviders] = useState(0); 
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllHealthcareProviders();
  }, []);

  const fetchAllHealthcareProviders = () => {
    HealthcareProviderService.getAllHealthcareProviders()
      .then((response) => {
        setHealthcareProviders(response.data);
        setTotalProviders(response.data.length); 
      })
      .catch((error) => {
        console.error("Error fetching healthcare providers:", error);
      });
  };

  const deleteHealthcareProvider = (id) => {
    HealthcareProviderService.deleteHealthcareProviderById(id, auth.accessToken)
      .then(() => {
        fetchAllHealthcareProviders();
      })
      .catch((error) => {
        console.error("Error deleting healthcare provider:", error);
      });
  };

  const handleUpdate = (id) => {
    const providerToUpdate = healthcareProviders.find(
      (provider) => provider.providerId === id
    );
    if (providerToUpdate) {
      setProviderToUpdate(providerToUpdate);
      setShowForm(true);
    } else {
      console.error("Healthcare provider not found.");
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this healthcare provider?"
      )
    ) {
      deleteHealthcareProvider(id);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
    setProviderToUpdate(null); 
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchAllHealthcareProviders();
  };

  const actionsRenderer = (providerId) => (
    <div className="flex gap-2">
      <button
        className="btn btn-success text-white-600 hover:text-white-900"
        onClick={() => handleUpdate(providerId)}
      >
        Edit
      </button>
      
    </div>
  );

  
  const filteredHealthcareProviders = healthcareProviders.filter((provider) =>
    provider.providerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center ">
        Healthcare Provider Data
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by provider name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center ml-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {totalProviders}
            </h2>
          </div>
        </div>
        
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />
      {showForm && (
        <UpdateProfileModal
          show={showForm}
          handleClose={handleCloseForm}
          title={
            providerToUpdate
              ? "Update Healthcare Provider"
              : "Add Healthcare Provider"
          }
          formComponent={
            <HealthcareProviderForm
              id={providerToUpdate ? providerToUpdate.providerId : null}
              handleClose={handleCloseForm}
              handleFormSubmit={handleFormSubmit}
            />
          }
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-sky-800 text-amber-50">
            <tr>
              <th className="px-4 py-3 text-left text-s font-bold uppercase tracking-wider font-EB ">
                Healthcare Provider Name
              </th>
              <th className="px-4 py-3 text-left text-s font-bold uppercase tracking-wider font-EB">
                Address
              </th>
              <th className="px-4 py-3 text-left text-s font-bold uppercase tracking-wider font-EB">
                Email
              </th>
              <th className="px-4 py-3 text-left text-s font-bold uppercase tracking-wider font-EB">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50  font-EB">
            {filteredHealthcareProviders.map((provider, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{provider.providerName}</td>
                <td className="px-4 py-3">{provider.address}</td>
                <td className="px-4 py-3">{provider.email}</td>
                <td className="px-4 py-3">
                  {actionsRenderer(provider.providerId)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthcareProviderManagement;
