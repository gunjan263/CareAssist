import React, { useState, useEffect } from "react";
import PatientService from "../../Services/PatientService";
import ProfileModal from "../Common/ProfileModel";

const ViewPatientProfile = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    loadPatientData(patientId);
  }, [patientId]);

  const loadPatientData = (patientId) => {
    PatientService.getPatientById(patientId)
      .then((response) => {
        setPatient(response.data);
        setShowProfileModal(true);
      })
      .catch((error) => {
        console.error("Error loading patient data:", error);
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
        title="Patient Profile"
        formComponent={
          patient && (
            <div>
              <p>Patient ID: {patient.userId}</p>
              <p>First Name: {patient.firstName}</p>
              <p>Last Name: {patient.lastName}</p>
              <p>Email: {patient.email}</p>
              <p>Phone Number: {patient.phoneNumber}</p>
              <p>Address: {patient.address}</p>
              <p>Date of Birth: {patient.dateOfBirth}</p>
              <p>Gender: {patient.gender}</p>
              <p>Symptoms: {patient.symptoms}</p>
            </div>
          )
        }
      />
    </>
  );
};

export default ViewPatientProfile;
