import React, { useState, useEffect, useContext } from "react";
import { FaCheck, FaFilePdf, FaSearch } from "react-icons/fa";
import ClaimService from "../../Services/ClaimService";
import PatientService from "../../Services/PatientService";
import PatientInsurancePlan from "../InsurancePlans/PatientInsurancePlan";
import { AuthContext } from "../../context/AuthProvider";

const ClaimManagement = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [claimApprovalDate, setClaimApprovalDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalClaims, setTotalClaims] = useState(0);
  const [viewingClaims, setViewingClaims] = useState(true); // State to toggle between viewing claims and managing insurance plans
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (viewingClaims) {
      fetchAllClaims();
    } else {
      alert("no claims available");
    }
  }, [viewingClaims]); 
  const fetchAllClaims = async () => {
    try {
      const response = await ClaimService.getAllClaims();
      setClaims(response.data);
      setTotalClaims(response.data.length);
      console.log("Claims fetched successfully.");
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      if (!selectedClaim || !selectedStatus || !claimApprovalDate) {
        alert("Please select claim, status, and approval date.");
        return;
      }

      const newStatus = selectedStatus;

      await ClaimService.updateClaimStatus(
        selectedClaim.claimId,
        newStatus,
        claimApprovalDate,
        auth.accessToken
      );

      const updatedClaims = claims.map((claim) =>
        claim.claimId === selectedClaim.claimId
          ? {
              ...claim,
              status: newStatus,
              claimApprovalDate: claimApprovalDate,
            }
          : claim
      );

      setClaims(updatedClaims);

      console.log(`Claim ${selectedClaim.claimId} status updated successfully`);
      setSelectedClaim(null);
    } catch (error) {
      console.error("Error updating claim status:", error);
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const response = await ClaimService.getPDFByClaimId(id, auth.accessToken);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      console.log(`PDF for claim ${id} downloaded successfully.`);
    } catch (error) {
      console.error("Error downloading claim PDF:", error);
    }
  };

  
  const toggleView = () => {
    setViewingClaims(!viewingClaims);
  };

  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={toggleView} className="mr-4">
            {viewingClaims ? "Manage Insurance Plans" : "View Claims"}
          </button>
        </div>
      </nav>
      {viewingClaims ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Claim Data
          </h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by ID or Patient ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700">
                {totalClaims}
              </h2>
            </div>
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-sky-800 text-white font-EB">
                <tr>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Company ID
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Claim Amount
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Claim Date
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Claim Approval Date
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    Update
                  </th>
                  <th className="px-6 py-3 text-s font-medium uppercase tracking-wider">
                    View PDF
                  </th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 divide-y divide-gray-200 font-EB">
                {claims
                  .filter(
                    (claim) =>
                      claim.claimId
                        .toString()
                        .includes(searchTerm.toLowerCase()) ||
                      claim.patientId
                        .toString()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((claim) => (
                    <tr key={claim.claimId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.claimId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.patientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.companyId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.claimAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.claimDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.claimApprovalDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedClaim(claim)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Update
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDownloadPDF(claim.claimId)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaFilePdf />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {selectedClaim && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Update Claim Status
                </h2>
                <div className="flex flex-col space-y-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="APPROVED">Approved</option>
                    <option value="UNDER_PROCESS">Under Process</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <input
                    type="date"
                    value={claimApprovalDate}
                    onChange={(e) => setClaimApprovalDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdateStatus}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setSelectedClaim(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <PatientInsurancePlan />
      )}
    </div>
  );
};

export default ClaimManagement;
