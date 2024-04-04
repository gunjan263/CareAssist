import React, { useState, useEffect, useContext } from "react";
import ProfileModal from "../Common/ProfileModel";
import Dropdown from "../Common/Dropdown";
import ClaimManagement from "../Claim/ClaimManagement";
import InsurancePlansManagement from "../InsurancePlans/InsurancePlansManagement";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ViewInsuranceCompanyProfile from "../InsuranceCompany/ViewInsuranceCompanyProfile";
import UpdateInsuranceCompanyProfile from "../InsuranceCompany/UpdateInsuranceCompanyProfile";
import InsuranceCompanyService from "../../Services/InsuranceCompanyService";
import InsuranceCompanySidebar from "../InsuranceCompany/InsuranceCompanySidebar";
import InsuranceCompanyDashboardBg from "../../assets/InsuranceCompanyDashboardBg.jpg";

const InsuranceCompanyDashboard = () => {
  const [insuranceCompanyData, setInsuranceCompanyData] = useState([]);
  const [selectedInsuranceCompanyId, setSelectedInsuranceCompanyId] =
    useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [updatedInsuranceCompany, setUpdatedInsuranceCompany] = useState({
    companyName: "",
    email: "",
  });
  const [currentComponent, setCurrentComponent] = useState("");

  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInsuranceCompanyData();
  }, []);

  const fetchInsuranceCompanyData = () => {
    InsuranceCompanyService.getAllInsuranceCompanies()
      .then((response) => {
        setInsuranceCompanyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  };

  const handleSidebarOptionClick = (routePath) => {
    setCurrentComponent(
      // routePath === "/insuranceCompanyDashboard"
      //   ? "InsuranceCompanyDashboard"
      //   :
      routePath === "/claim"
        ? "ClaimManagement"
        : routePath === "/insurance-plans"
        ? "InsurancePlansManagement"
        : ""
    );
  };

  const handleDropdownChange = (companyId, action) => {
    setSelectedInsuranceCompanyId(companyId);
    setSelectedAction(action);
    if (action === "view") {
      setViewProfile(true);
    } else if (action === "update") {
      setShowModal(true);
      setViewProfile(false);
    } else if (action === "logout") {
      logout();
      navigate("/");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAction("");
  };

  const handleChange = (e) => {
    setUpdatedInsuranceCompany({
      ...updatedInsuranceCompany,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    InsuranceCompanyService.updateInsuranceCompanyById(
      selectedInsuranceCompanyId,
      updatedInsuranceCompany,
      auth.accessToken
    )
      .then(() => {
        console.log("Insurance Company profile updated successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating Insurance Company profile:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <InsuranceCompanySidebar
          handleSidebarOptionClick={handleSidebarOptionClick}
        />
        <div className="container ml-64 mr-0 w-full bg-cover bg-center mt-[-50px]" style={{ backgroundImage: `url(${InsuranceCompanyDashboardBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

          {insuranceCompanyData && (
            <ul>
              {insuranceCompanyData.map((insuranceCompany) => (
                <li
                  key={insuranceCompany.companyId}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="mr-4">
                    <span>{insuranceCompany.email}</span>
                  </div>
                  <Dropdown
                    onViewProfile={() =>
                      handleDropdownChange(insuranceCompany.companyId, "view")
                    }
                    onUpdateProfile={() =>
                      handleDropdownChange(
                        insuranceCompany.companyId,
                        "update"
                      )
                    }
                    onLogout={() =>
                      handleDropdownChange(
                        insuranceCompany.companyId,
                        "logout"
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          )}
          {selectedAction === "view" && (
            <ViewInsuranceCompanyProfile
              companyId={selectedInsuranceCompanyId}
            />
          )}
          {showModal && (
            <ProfileModal
              show={showModal}
              handleClose={handleCloseModal}
              title="Update Insurance Company Profile"
              formComponent={
                <div>
                  <UpdateInsuranceCompanyProfile
                    companyId={selectedInsuranceCompanyId}
                    updatedInsuranceCompany={updatedInsuranceCompany}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              }
            />
          )}
          {currentComponent === "ClaimManagement" && <ClaimManagement />}
          {currentComponent === "InsurancePlansManagement" && (
            <InsurancePlansManagement />
          )}
        </div>
      </div>
      <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
        <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
          © 2024 Copyright:
          <a href="https://tw-elements.com/">CareAssist</a>
        </div>
      </footer>
    </div>
  );
};

export default InsuranceCompanyDashboard;
