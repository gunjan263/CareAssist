import React, { useState, useEffect, useContext } from "react";
import InsuranceCompanyService from "../../Services/InsuranceCompanyService";
import ProfileModal from "../Common/ProfileModel";
import { AuthContext } from "../../context/AuthProvider";

const ViewInsuranceCompanyProfile = ({ companyId }) => {
  const [company, setCompany] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadCompanyData(companyId);
  }, [companyId]);

  const loadCompanyData = (companyId) => {
    InsuranceCompanyService.getInsuranceCompanyById(companyId, auth.accessToken)
      .then((response) => {
        setCompany(response.data);
        setShowProfileModal(true);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  };

  const closeModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <ProfileModal
        show={showProfileModal}
        handleClose={closeModal}
        title="Insurance Company Profile"
        formComponent={
          company && (
            <div>
              <p>Company ID: {company.companyId}</p>
              <p>Name: {company.companyName}</p>
              <p>Email: {company.email}</p>
            </div>
          )
        }
      />
    </>
  );
};

export default ViewInsuranceCompanyProfile;
