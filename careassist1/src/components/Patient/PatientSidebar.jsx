// PatientSidebar.jsx
import React from "react";
import {
  faClipboard,
  faListAlt,
  faFileInvoice,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Common/Sidebar";

const PatientSidebar = ({ handleSidebarOptionClick }) => {
  const patientLinks = [
    {
      label: "Dashboard",
      icon: faHome,
      action: "/patient/dashboard",
    },
    {
      label: "Claim",
      icon: faClipboard,
      action: "/patient/claim",
    },
    {
      label: "Insurance Plans",
      icon: faListAlt,
      action: "/patient/insurance-plans",
    },
    {
      label: "Invoice",
      icon: faFileInvoice,
      action: "/patient/invoice",
    },
  ];
  return (
    <Sidebar
      options={patientLinks}
      handleSidebarOptionClick={handleSidebarOptionClick}
    />
  );
};

export default PatientSidebar;
