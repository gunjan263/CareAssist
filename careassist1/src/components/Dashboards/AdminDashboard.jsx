import React, { useState, useEffect, useContext } from "react";
import AdminService from "../../Services/AdminService";
import AdminSidebar from "../AdminComponent/AdminSiderbar";
import HealthcareProviderManagement from "../HealthcareProvider/HealthcareProviderManagement";
import ViewAdminProfile from "../AdminComponent/ViewAdminProfile";
import UpdateAdminProfile from "../AdminComponent/UpdateAdminProfile";
import DeleteAdminProfile from "../AdminComponent/DeleteAdminProfile";
import Admin from "../../assets/Admin.jpg"
import ProfileModal from "../Common/ProfileModel";
import Dropdown from "../Common/Dropdown";
import ClaimManagement from "../Claim/ClaimManagement";
import InsuranceCompanyManagement from "../InsuranceCompany/InsuranceCompanyManagement";
import PatientManagement from "../Patient/PatientManagementComponent";
import InsurancePlansManagement from "../InsurancePlans/InsurancePlansManagement";
import InvoiceManagement from "../Invoice/InvoiceManagement";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState({
    email: "",
    phoneNumber: "",
  });
  const [currentComponent, setCurrentComponent] = useState("");
  // const { auth } = useContext(AuthContext);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const Id = 1;
      const response = await AdminService.getAdministratorById(
        Id,
        auth.accessToken
      );
      setAdminData([response.data]);
    } catch (error) {
      console.error("Error fetching healthcare data:", error);
    }
  };

  const handleSidebarOptionClick = (routePath) => {
    setCurrentComponent(
      routePath === "/healthcare-provider"
        ? "HealthcareProviderManagement"
        : routePath === "/insurance-company"
        ? "InsuranceCompanyManagement"
        : routePath === "/patient"
        ? "PatientManagement"
        : routePath === "/claim"
        ? "ClaimManagement"
        : routePath === "/insurance-plans"
        ? "InsurancePlansManagement"
        : routePath === "/invoice"
        ? "InvoiceManagement"
        : ""
    );
  };

  const handleDropdownChange = (adminId, action) => {
    setSelectedAdminId(adminId);
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
    setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.updateAdministrator(
      selectedAdminId,
      updatedAdmin,
      auth.accessToken
    )
      .then(() => {
        console.log("Admin profile updated successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating admin profile:", error);
        window.alert("Error updating admin profile:");
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar handleSidebarOptionClick={handleSidebarOptionClick} />
        <div className="container ml-82 mr-12 w-3/4 bg-cover bg-center mt-[-20px]" style={{ backgroundImage: `url(${Admin})` }}>
          {adminData && (
            <ul>
              {adminData.map((admin) => (
                <li
                  key={admin.adminId}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="mr-4">
                    <span>{admin.email}</span>
                  </div>
                  <Dropdown
                    onViewProfile={() =>
                      handleDropdownChange(admin.adminId, "view")
                    }
                    onUpdateProfile={() =>
                      handleDropdownChange(admin.adminId, "update")
                    }
                    onLogout={() => handleDropdownChange(admin.adminId, "logout")}
                  />
                </li>
              ))}
            </ul>
          )}
          {selectedAction === "view" && (
            <ViewAdminProfile adminId={selectedAdminId} />
          )}
          <ProfileModal
            show={showModal}
            handleClose={handleCloseModal}
            title="Update Admin Profile"
            formComponent={
              <UpdateAdminProfile
                adminId={selectedAdminId}
                updatedAdmin={updatedAdmin}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            }
          />
          {deleteProfile && <DeleteAdminProfile />}
          {currentComponent === "HealthcareProviderManagement" && (
            <HealthcareProviderManagement />
          )}
          {currentComponent === "ClaimManagement" && <ClaimManagement />}
          {currentComponent === "InsuranceCompanyManagement" && (
            <InsuranceCompanyManagement />
          )}
          {currentComponent === "PatientManagement" && <PatientManagement />}
          {currentComponent === "InsurancePlansManagement" && (
            <InsurancePlansManagement />
          )}
          {currentComponent === "InvoiceManagement" && <InvoiceManagement />}
        </div>
      </div>
      <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
        <div className="bg-black/5 p-4 text-center text-surface dark:text-white ">
          © 2024 Copyright:
          <a href="https://tw-elements.com/">CareAssist</a>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
