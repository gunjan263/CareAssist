import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import PatientSidebar from "../Patient/PatientSidebar";
import InsurancePlanSelection from "../InsurancePlans/InsurancePlanSelection";
import ViewPatientProfile from "../Patient/ViewPatientProfile";
import UpdatePatientProfile from "../Patient/UpdatePatientProfile";
import DeletePatientProfile from "../Patient/DeletePatientProfile";
import Dropdown from "../Common/Dropdown";
import PatientService from "../../Services/PatientService";
import ProfileModel from "../Common/ProfileModel";
import ClaimPatient from "../Claim/ClaimPatient";
import PatientInvoice from "../Invoice/PatientInvoice";
import { AuthContext } from "../../context/AuthProvider";
import patientDashboardBg from "../../assets/patientDashboardBg.jpg";
import CustomPopup from "../Common/CustomPopup";

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [updatedPatient, setUpdatedPatient] = useState({
    firstName: "",
    lastName: "",
    providerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    symptoms: "",
  });
  const [currentComponent, setCurrentComponent] = useState("");
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(true);

  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    if (auth.userId) {
      fetchPatientData(auth.userId);
    }
  }, []);

  const fetchPatientData = async (userId) => {
    try {
      const response = await PatientService.getPatientByUserId(auth.userId);
      if (response.data) {
        const patient = response.data;
        setPatientData(patient);
        setSelectedPatientId(patient.patientId);
      }
    } catch (error) {
      console.log("Error fetching patient data:", error);
    }
  };

  const handleSidebarOptionClick = (routePath) => {
    setCurrentComponent(
      routePath === "/patient/dashboard"
        ? "PatientDashboard"
        : routePath === "/patient/claim"
        ? "ClaimPatient"
        : routePath === "/patient/insurance-plans"
        ? "InsurancePlanSelection"
        : routePath === "/patient/invoice"
        ? "PatientInvoice"
        : ""
    );
  };

  const handleDropdownChange = (patientId, action) => {
    setSelectedPatientId(patientId);
    setSelectedAction(action);
    if (action === "view") {
      setViewProfile(true);
    } else if (action === "update") {
      setShowModal(true);
      setViewProfile(false);
    } else if (action === "delete") {
      setDeleteProfile(true);
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
    setUpdatedPatient({ ...updatedPatient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PatientService.updatePatientById(
      selectedPatientId,
      updatedPatient,
      auth.accessToken
    )
      .then(() => {
        console.log("Patient profile updated successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating patient profile:", error);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4">
        {showPopup && (
          <CustomPopup
            message="Dear patient, please update your details in the profile section to maintain accurate and current medical records. Your cooperation ensures tailored healthcare services. Thank you for your attention to this matter."
            onCancel={() => setShowPopup(false)}
            onConfirm={() => setShowPopup(false)}
          />
        )}
        <PatientSidebar handleSidebarOptionClick={handleSidebarOptionClick} />
      </div>
      <div
        className="flex flex-col flex-grow bg-cover bg-center relative ml-[-7%] mt-[-5%]"
        style={{
          backgroundImage: `url(${patientDashboardBg})`,
          backgroundPosition: "left center",
        }}
      >
        <div className="container mx-auto py-8 relative z-10 w-4/5">
          {patientData && (
            <ul>
              <li
                key={patientData.patientId}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="mr-4">
                  <span>{patientData.email}</span>
                </div>
                <Dropdown
                  onViewProfile={() =>
                    handleDropdownChange(patientData.patientId, "view")
                  }
                  onUpdateProfile={() =>
                    handleDropdownChange(patientData.patientId, "update")
                  }
                  onLogout={() =>
                    handleDropdownChange(patientData.patientId, "logout")
                  }
                />
              </li>
            </ul>
          )}
          {selectedAction === "view" && (
            <ViewPatientProfile patientId={selectedPatientId} />
          )}

          {showModal && (
            <ProfileModel
              show={showModal}
              handleClose={handleCloseModal}
              title="Update Patient Profile"
              formComponent={
                <UpdatePatientProfile
                  patientId={selectedPatientId}
                  updatedPatient={updatedPatient}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              }
            />
          )}
          {deleteProfile && (
            <DeletePatientProfile
              id={selectedPatientId}
              setShowDeleteProfile={setDeleteProfile}
            />
          )}
          
          {currentComponent === "ClaimPatient" && (
            <ClaimPatient patientId={selectedPatientId} />
          )}
          {currentComponent === "InsurancePlanSelection" && (
            <InsurancePlanSelection patientId={selectedPatientId} />
          )}
          {currentComponent === "PatientInvoice" && (
            <PatientInvoice patientId={selectedPatientId} />
          )}
        </div>
        <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left absolute bottom-0 left-0 w-full z-20">
          <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
            © 2024 Copyright:
            <a href="https://tw-elements.com/">CareAssist</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PatientDashboard;
