import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {
  faClipboard,
  faBuilding,
  faListAlt,
  faFileInvoice,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Common/Sidebar";

const AdminSidebar = ({ handleSidebarOptionClick }) => {
  const { auth } = useContext(AuthContext);

  const adminLinks = [
    {
      label: "Dashboard",
      icon: faHome,
      action: "/AdminDashboard",
    },
    {
      label: "Claim",
      icon: faClipboard,
      action: "/claim",
    },
    {
      label: "Healthcare-Provider",
      icon: faBuilding,
      action: "/healthcare-provider",
    },
    {
      label: "Insurance Company",
      icon: faBuilding,
      action: "/insurance-company",
    },
    {
      label: "Insurance Plans",
      icon: faListAlt,
      action: "/insurance-plans",
    },
    {
      label: "Invoice",
      icon: faFileInvoice,
      action: "/invoice",
    },
    {
      label: "Patient",
      icon: faUser,
      action: "/patient",
    },
  ];

  const getAccessToken = () => {
    return auth?.accessToken || "";
  };

  const handleClick = (action) => {
    handleSidebarOptionClick(action, getAccessToken());
  };

  return (
    <Sidebar options={adminLinks} handleSidebarOptionClick={handleClick} />
  );
};

export default AdminSidebar;
