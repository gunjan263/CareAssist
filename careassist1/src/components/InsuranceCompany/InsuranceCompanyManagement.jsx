import React, { useState, useEffect, useContext } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import InsuranceCompanyService from "../../Services/InsuranceCompanyService";
import UpdateProfileModal from "../Common/ProfileModel";
import InsuranceCompanyForm from "./CompanyForm";
import { AuthContext } from "../../context/AuthProvider";

const InsuranceCompanyManagement = () => {
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [companyToUpdate, setCompanyToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCompanies, setTotalCompanies] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchAllInsuranceCompanies();
  }, []);

  const fetchAllInsuranceCompanies = () => {
    InsuranceCompanyService.getAllInsuranceCompanies()
      .then((response) => {
        setInsuranceCompanies(response.data);
        setTotalCompanies(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching insurance companies:", error);
      });
  };

  const deleteInsuranceCompany = (id) => {
    InsuranceCompanyService.deleteInsuranceCompanyById(id, auth.accessToken)
      .then(() => {
        fetchAllInsuranceCompanies();
      })
      .catch((error) => {
        console.error("Error deleting insurance company:", error);
      });
  };

  const handleUpdate = (id) => {
    console.log("Handle Update called with id:", id);
    console.log("Insurance Companies:", insuranceCompanies);

    const companyToUpdate = insuranceCompanies.find(
      (company) => company.companyId === id
    );
    console.log("Company to update:", companyToUpdate);

    if (companyToUpdate) {
      setCompanyToUpdate(companyToUpdate);
      setShowForm(true);
    } else {
      console.error("Insurance company not found.");
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this insurance company?")
    ) {
      deleteInsuranceCompany(id);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
    setCompanyToUpdate(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchAllInsuranceCompanies();
  };

  const filteredInsuranceCompanies = insuranceCompanies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Insurance Company Data
      </h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center ml-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {totalCompanies}
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
            companyToUpdate
              ? "Update Insurance Company"
              : "Add Insurance Company"
          }
          formComponent={
            <InsuranceCompanyForm
              id={companyToUpdate ? companyToUpdate.companyId : null}
              handleClose={handleCloseForm}
              handleFormSubmit={handleFormSubmit}
            />
          }
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50 divide-y divide-gray-200">
            {filteredInsuranceCompanies.map((company) => (
              <tr key={company.companyId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {company.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{company.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success text-white-600 hover:text-white-900"
                      onClick={() => handleUpdate(company.companyId)}
                    >
                      Edit
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceCompanyManagement;
