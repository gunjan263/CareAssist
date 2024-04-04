import React, { useState, useEffect, useContext } from "react";
import HealthcareSidebar from "../HealthcareProvider/HealthcareProviderSidebar";
import ViewHealthcareProfile from "../HealthcareProvider/ViewHealthcareProfile";
import UpdateHealthcareProfile from "../HealthcareProvider/UpdateHealthcareProfile";
import ProfileModal from "../Common/ProfileModel";
import Dropdown from "../Common/Dropdown";
import HealthcareProviderService from "../../Services/HealthcareProviderService";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import HealthcareInvoice from "../Invoice/HealthcareInvoice";
import HealthcareDashboardBg from "../../assets/HealthcareDashboardBg.jpg";

const HealthcareProviderDashboard = () => {
  const [healthcareData, setHealthcareData] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(1); // Setting both healthcareId and providerId to 1
  const [selectedAction, setSelectedAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updatedHealthcare, setUpdatedHealthcare] = useState({
    email: "",
    phoneNumber: "",
  });
  const [currentComponent, setCurrentComponent] = useState("");
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHealthcareData();
  }, []);

  const fetchHealthcareData = async () => {
    try {
      const response =
        await HealthcareProviderService.getHealthcareProviderById(
          selectedProviderId,
          auth.accessToken
        );
      setHealthcareData([response.data]);
    } catch (error) {
      console.error("Error fetching healthcare data:", error);
    }
  };

  const handleSidebarOptionClick = (routePath) => {
    setCurrentComponent(
      routePath === "/healthcareDashboard"
        ? "HealthcareDashboard"
        : routePath === "/healthcare-invoice"
        ? "HealthcareInvoice"
        : ""
    );
  };

  const handleDropdownChange = (providerId, action) => {
    setSelectedProviderId(providerId);
    setSelectedAction(action);
    setShowModal(true);
    if (action === "logout") {
      logout();
      navigate("/");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAction("");
  };

  const handleChange = (e) => {
    setUpdatedHealthcare({
      ...updatedHealthcare,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAction === "update") {
        await HealthcareProviderService.updateHealthcareProviderById(
          selectedProviderId,
          updatedHealthcare,
          auth.accessToken
        );
        console.log("Healthcare profile updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating healthcare profile:", error);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen mt-[-20px]"
      style={{
        backgroundImage: `url(${HealthcareDashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-grow">
        <HealthcareSidebar
          handleSidebarOptionClick={handleSidebarOptionClick}
        />
        <div className="container ml-82 mr-12 w-3/4">
          {healthcareData && (
            <ul>
              {healthcareData.map((healthcare) => (
                <li
                  key={healthcare.providerId}
                  className="flex items-center justify-between border-b py-2 "
                >
                  <div className="mr-4">
                    <span>{healthcare.email}</span>
                  </div>
                  <Dropdown
                    onViewProfile={() =>
                      handleDropdownChange(healthcare.providerId, "view")
                    }
                    onUpdateProfile={() =>
                      handleDropdownChange(healthcare.providerId, "update")
                    }
                    onLogout={() =>
                      handleDropdownChange(healthcare.providerId, "logout")
                    }
                  />
                </li>
              ))}
            </ul>
          )}
          {selectedAction === "view" && selectedProviderId && (
            <ProfileModal
              show={showModal}
              handleClose={handleCloseModal}
              title="View Healthcare Profile"
              formComponent={
                <ViewHealthcareProfile providerId={selectedProviderId} />
              }
            />
          )}
          {selectedAction === "update" && (
            <ProfileModal
              show={showModal}
              handleClose={handleCloseModal}
              title="Update Healthcare Profile"
              formComponent={
                <UpdateHealthcareProfile
                  providerId={selectedProviderId}
                  updatedHealthcare={updatedHealthcare}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              }
            />
          )}

          {currentComponent === "HealthcareInvoice" && (
            <HealthcareInvoice providerId={selectedProviderId} />
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

export default HealthcareProviderDashboard;
