import React, { useState, useEffect } from "react";
import PatientService from "../../Services/PatientService";

const PurchasedPlans = ({ patientId }) => {
  const [purchasedPlans, setPurchasedPlans] = useState([]);

  useEffect(() => {
    fetchPurchasedPlans();
  }, []);

  const fetchPurchasedPlans = async () => {
    try {
      const response = await PatientService.findInsurancePlansByPatientId(
        patientId
      );
      setPurchasedPlans(response.data);
    } catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  };

  return (
    <div className="mt-4 border border-gray-300 rounded p-4">
      <h2 className="text-lg font-bold mb-2">Purchased Insurance Plans:</h2>
      {purchasedPlans && purchasedPlans.length > 0 ? (
        purchasedPlans.map((plan, index) => (
          <div key={index} className="mb-2">
            {" "}
           
            <h3 className="text-md font-semibold">{plan.planName}</h3>
            <p>
              <strong>Company Name:</strong> {plan.companyName}
            </p>
            <p>
              <strong>Coverage Amount:</strong> ${plan.coverageAmount}
            </p>
            <p>
              <strong>Premium:</strong> ${plan.premium}
            </p>
            <p>
              <strong>Plan Highlights:</strong> {plan.planHighlights}
            </p>
            <p>
              <strong>Validity Period:</strong> {plan.validityPeriod}
            </p>
          </div>
        ))
      ) : (
        <p>No purchased insurance plans found.</p>
      )}
    </div>
  );
};

export default PurchasedPlans;
