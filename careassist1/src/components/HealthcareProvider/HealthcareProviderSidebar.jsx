import React from "react";
import { faFileInvoice, faHome } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Common/Sidebar";

const HealthcareSidebar = ({ handleSidebarOptionClick }) => {
  const healthcareLinks = [
    {
      label: "Dashboard",
      icon: faHome,
      action: "/healthcareDashboard",
    },
    {
      label: "Invoice",
      icon: faFileInvoice,
      action: "/healthcare-invoice",
    },
  ];

  return (
    <Sidebar
      options={healthcareLinks}
      handleSidebarOptionClick={handleSidebarOptionClick}
    />
  );
};

export default HealthcareSidebar;
