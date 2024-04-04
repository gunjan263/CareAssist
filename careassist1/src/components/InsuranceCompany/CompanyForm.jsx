import React, { useState, useEffect, useContext } from "react";
import InsuranceCompanyService from "../../Services/InsuranceCompanyService";
import { AuthContext } from "../../context/AuthProvider";

const CompanyForm = ({ id, handleClose, handleFormSubmit }) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      InsuranceCompanyService.getInsuranceCompanyById(id, auth.accessToken)
        .then((response) => {
          setCompanyName(response.data.companyName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log("Error fetching insurance company:", error);
        });
    }
  }, [id, auth.accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      companyName: companyName,
      email: email,
    };

    if (id) {
      InsuranceCompanyService.updateInsuranceCompanyById(
        id,
        data,
        auth.accessToken
      )
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error updating insurance company:", error);
        });
    } else {
      InsuranceCompanyService.addInsuranceCompany(data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error adding insurance company:", error);
        });
    }

    setCompanyName("");
    setEmail("");
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="companyName" className="block text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="form-input mt-1 block w-full"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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

export default CompanyForm;
