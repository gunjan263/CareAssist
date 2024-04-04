import React, { useState, useEffect, useContext } from "react";
import InsurancePlanService from "../../Services/InsurancePlanService";
import PatientService from "../../Services/PatientService";
import ConfirmationModal from "../Common/ConfirmationModal"; 
import PurchasedPlans from "./PurchasedPlans"; 
import { AuthContext } from "../../context/AuthProvider";

const InsurancePlanSelection = ({ patientId }) => {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [selectedPlanId, setSelectedPlanId] = useState(null); 
  const [viewOption, setViewOption] = useState("available"); 
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchInsurancePlans();
  }, []);

  const fetchInsurancePlans = async () => {
    try {
      const response = await InsurancePlanService.getAllInsurancePlans();
      setInsurancePlans(response.data);
    } catch (error) {
      console.error("Error fetching insurance plans:", error);
    }
  };

  const handlePlanSelect = async (planId) => {
    setSelectedPlanId(planId); 
    setShowConfirmation(true); 
  };

  const confirmSelection = async () => {
    try {
      PatientService.selectInsurancePlanForPatient(
        patientId,
        selectedPlanId,
        auth.accessToken
      );
      setSelectedPlans([...selectedPlans, selectedPlanId]);
    } catch (error) {
      console.error("Error selecting insurance plan for patient:", error);
    }
    setShowConfirmation(false); 
  };

  const cancelSelection = () => {
    setShowConfirmation(false); 
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-screen-xl">
        <div className="flex justify-between border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-bold">Insurance Plans</h2>
          <div>
            <button
              className={`mr-4 ${
                viewOption === "available"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
              onClick={() => setViewOption("available")}
            >
              Available Plans
            </button>
            <button
              className={`mr-4 ${
                viewOption === "purchased"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
              onClick={() => setViewOption("purchased")}
            >
              Purchased Plans
            </button>
          </div>
        </div>
        {viewOption === "available" && (
          <>
            {insurancePlans.map((plan) => (
              <div
                key={plan.planId}
                className="border border-gray-300 mb-4 rounded p-4 flex"
              >
                <div className="w-1/3 pr-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {plan.planName}
                  </h3>
                  <p>Plan ID: {plan.planId}</p>
                  <p>Plan Description: {plan.planDescription}</p>
                </div>
                <div className="w-1/3 pr-4">
                  <p>Premium: ${plan.premium}</p>
                  <p>Coverage Amount: ${plan.coverageAmount}</p>
                  <p>Validity Period: {plan.validityPeriod}</p>
                </div>
                <div className="w-1/3">
                  <p>Plan Highlights: {plan.planHighlights}</p>
                </div>
                <div>
                  <button
                    onClick={() => handlePlanSelect(plan.planId)}
                    disabled={selectedPlans.includes(plan.planId)}
                    className="mt-20 mb-2 px-2 py-1 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600"
                  >
                    {selectedPlans.includes(plan.planId)
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {viewOption === "purchased" && <PurchasedPlans patientId={patientId} />}
        {showConfirmation && (
          <ConfirmationModal
            message="Are you sure you want to select this insurance plan?"
            onConfirm={confirmSelection}
            onCancel={cancelSelection}
          />
        )}
      </div>
    </div>
  );
};

export default InsurancePlanSelection;
