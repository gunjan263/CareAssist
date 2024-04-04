import React, { useState, useEffect, useContext } from "react";
import ClaimService from "../../Services/ClaimService";
import { AuthContext } from "../../context/AuthProvider";

const ClaimPatient = ({ patientId }) => {
  const [claims, setClaims] = useState([]);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const { auth } = useContext(AuthContext);
  const [claimFormData, setClaimFormData] = useState({
    providerId: "",
    patientId: patientId,
    companyName: "",
    amount: "",
    status: "",
    pdf: null,
  });

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = () => {
    ClaimService.getClaimByPatientId(patientId)
      .then((response) => {
        setClaims(response.data);
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
      });
  };

  const handleDownloadPDF = async (claimId) => {
    try {
      const response = await ClaimService.getPDFByClaimId(claimId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        console.error("Error opening PDF in new tab");
      }
    } catch (error) {
      console.error("Error downloading claim PDF:", error);
    }
  };

  const handleApplyForClaim = () => {
    setShowClaimForm(true);
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    try {
      const providerId = parseInt(claimFormData.providerId); 
      const patientId = parseInt(claimFormData.patientId); 

      const response = await ClaimService.submitClaim(
        providerId, 
        patientId, 
        claimFormData.companyName,
        parseFloat(claimFormData.amount),
        claimFormData.status,
        claimFormData.pdf
      );

      console.log("Claim submitted successfully:", response.data);
      loadClaims();
      setClaimFormData({
        providerId: "",
        patientId: "",
        companyName: "",
        amount: "",
        status: "",
        pdf: null,
      });
      setShowClaimForm(false);
    } catch (error) {
      console.error("Error submitting claim:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setClaimFormData({
        ...claimFormData,
        [name]: files[0],
      });
    } else {
      const parsedValue =
        name === "providerId" || name === "patientId" ? parseInt(value) : value;
      setClaimFormData({
        ...claimFormData,
        [name]: parsedValue,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Claims for Patient ID: {patientId}
      </h2>
      <div className="mb-4">
        <button
          onClick={handleApplyForClaim}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Apply for Claim
        </button>
      </div>
      {showClaimForm && (
        <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Claim Application Form</h3>
          <form onSubmit={handleSubmitClaim}>
            <input
              type="text"
              name="providerId"
              value={claimFormData.providerId}
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
              placeholder="Provider ID"
            />
            <input
              type="text"
              name="patientId"
              value={claimFormData.patientId}
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
              placeholder="Patient ID"
            />
            <input
              type="text"
              name="companyName"
              value={claimFormData.companyName}
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
              placeholder="Company Name"
            />
            <input
              type="text"
              name="amount"
              value={claimFormData.amount}
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
              placeholder="Amount"
            />
            <select
              name="status"
              value={claimFormData.status}
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
            >
              <option value="">Select Status</option>
              
              <option value="SUBMITTED">Submitted</option>
            </select>
            <input
              type="file"
              name="pdf"
              onChange={handleChange}
              className="mb-2 px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            >
              Submit Claim
            </button>
          </form>
        </div>
      )}
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden divide-y divide-gray-200">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Claim ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Company Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Claim Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Claim Approval Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-amber-50 divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.claimId}>
                <td className="px-6 py-4 whitespace-nowrap">{claim.claimId}</td>
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
                  {claim.claimApprovalDate || "Not approved yet"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{claim.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownloadPDF(claim.claimId)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimPatient;
