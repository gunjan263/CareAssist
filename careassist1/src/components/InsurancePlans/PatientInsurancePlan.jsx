import React, { useState, useEffect, useContext } from "react";
import PatientService from "../../Services/PatientService";
import InsurancePlanService from "../../Services/InsurancePlanService"; 
import { AuthContext } from "../../context/AuthProvider";

const PatientInsurancePlan = () => {
  const [patientId, setPatientId] = useState("");
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { auth } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const response = await PatientService.findInsurancePlanIdsByPatientId(
        patientId
      );
      setInsurancePlans(response.data);
      setSearched(true);
    } catch (error) {
      console.error("Error fetching insurance plans:", error);
    }
  };

  const handlePlanDetails = async (planId) => {
    try {
      const response = await InsurancePlanService.getInsurancePlanById(
        planId,
        auth.accessToken
      );
      setSelectedPlan(response.data);
    } catch (error) {
      console.error("Error fetching insurance plan details:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Patient Insurance Plans
      </h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </div>
      {searched && insurancePlans.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  Insurance Plan ID
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  Insurance Plan Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-amber-50 divide-y divide-gray-200">
              {insurancePlans.map((plan) => (
                <tr key={plan}>
                  <td className="px-6 py-4 whitespace-nowrap">{plan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handlePlanDetails(plan)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : searched ? (
        <p className="text-center text-red-500">
          No insurance plans found for the provided patient ID.
        </p>
      ) : null}
      {selectedPlan && (
        <div>
          <h3 className="text-lg font-semibold mt-4">
            Insurance Plan Details:
          </h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p>
              <span className="font-semibold">Plan ID:</span>{" "}
              {selectedPlan.planId}
            </p>
            <p>
              <span className="font-semibold">Plan Name:</span>{" "}
              {selectedPlan.planName}
            </p>
            <p>
              <span className="font-semibold">Plan Description:</span>{" "}
              {selectedPlan.planDescription}
            </p>
            <p>
              <span className="font-semibold">Company ID:</span>{" "}
              {selectedPlan.companyId}
            </p>
            <p>
              <span className="font-semibold">Coverage Amount:</span>{" "}
              {selectedPlan.coverageAmount}
            </p>
            <p>
              <span className="font-semibold">Premium:</span>{" "}
              {selectedPlan.premium}
            </p>
            <p>
              <span className="font-semibold">Plan Highlights:</span>{" "}
              {selectedPlan.planHighlights}
            </p>
            <p>
              <span className="font-semibold">Validity Period:</span>{" "}
              {selectedPlan.validityPeriod}
            </p>
            <p>
              <span className="font-semibold">Company Name:</span>{" "}
              {selectedPlan.companyName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientInsurancePlan;
