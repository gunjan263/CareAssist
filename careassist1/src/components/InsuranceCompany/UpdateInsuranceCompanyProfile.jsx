import React, { useState, useEffect, useContext } from "react";
import InsuranceCompanyService from "../../Services/InsuranceCompanyService";
import { AuthContext } from "../../context/AuthProvider";

const UpdateInsuranceCompanyProfile = ({ companyId }) => {
  const [updatedCompany, setUpdatedCompany] = useState({
    companyName: "Example Company",
    email: "company@example.com",
  });
  const [showForm, setShowForm] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    InsuranceCompanyService.getInsuranceCompanyById(companyId, auth.accessToken)
      .then((response) => {
        setUpdatedCompany(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, [companyId, auth.accessToken]);

  const handleChange = (e) => {
    setUpdatedCompany({ ...updatedCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    InsuranceCompanyService.updateInsuranceCompanyById(
      companyId,
      updatedCompany,
      auth.accessToken
    )
      .then(() => {
        console.log("Company profile updated successfully!");
        setUpdateMessage("Profile updated successfully!");
        setShowForm(false);
        setTimeout(() => {
          setUpdatedCompany({
            companyName: "",
            email: "",
          });
          setUpdateMessage("");
          setShowForm(true);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error updating company profile:", error);
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
            Update Company Profile
          </h3>
          <div>
            <label
              htmlFor="companyName"
              className="text-gray-700 font-semibold mb-1"
            >
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={updatedCompany.companyName}
              onChange={handleChange}
              placeholder="Company Name"
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
              value={updatedCompany.email}
              onChange={handleChange}
              placeholder="Email"
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
    </div>
  );
};

export default UpdateInsuranceCompanyProfile;
