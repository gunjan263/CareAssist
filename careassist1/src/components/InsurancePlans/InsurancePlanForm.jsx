import React, { useState, useEffect, useContext } from "react";
import InsurancePlanService from "../../Services/InsurancePlanService";
import { AuthContext } from "../../context/AuthProvider";

const PlanForm = ({ id, handleClose, handleFormSubmit }) => {
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [premium, setPremium] = useState("");
  const [planHighlights, setPlanHighlights] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      InsurancePlanService.getInsurancePlanById(id, auth.accessToken)
        .then((response) => {
          const {
            planName,
            planDescription,
            companyId,
            coverageAmount,
            premium,
            planHighlights,
            validityPeriod,
            companyName,
          } = response.data;
          setPlanName(planName);
          setPlanDescription(planDescription);
          setCompanyId(companyId);
          setCoverageAmount(coverageAmount);
          setPremium(premium);
          setPlanHighlights(planHighlights);
          setValidityPeriod(validityPeriod);
          setCompanyName(companyName);
        })
        .catch((error) => {
          console.log("Error fetching insurance plan:", error);
        });
    }
  }, [id, auth.accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      planName: planName,
      planDescription: planDescription,
      companyId: companyId,
      coverageAmount: coverageAmount,
      premium: premium,
      planHighlights: planHighlights,
      validityPeriod: validityPeriod,
      companyName: companyName,
    };

    if (id) {
      InsurancePlanService.updateInsurancePlanById(id, data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error updating insurance plan:", error);
        });
    } else {
      InsurancePlanService.addInsurancePlan(data, auth.accessToken)
        .then(() => {
          handleFormSubmit();
        })
        .catch((error) => {
          console.error("Error adding insurance plan:", error);
        });
    }

    setPlanName("");
    setPlanDescription("");
    setCompanyId("");
    setCoverageAmount("");
    setPremium("");
    setPlanHighlights("");
    setValidityPeriod("");
    setCompanyName("");
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="planName" className="block text-gray-700">
          Plan Name
        </label>
        <input
          type="text"
          id="planName"
          className="form-input mt-1 block w-full"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="planDescription" className="block text-gray-700">
          Plan Description
        </label>
        <input
          type="text"
          id="planDescription"
          className="form-input mt-1 block w-full"
          value={planDescription}
          onChange={(e) => setPlanDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="companyId" className="block text-gray-700">
          Company Id
        </label>
        <input
          type="number"
          id="companyId"
          className="form-input mt-1 block w-full"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coverageAmount" className="block text-gray-700">
          Coverage Amount
        </label>
        <input
          type="number"
          id="coverageAmount"
          className="form-input mt-1 block w-full"
          value={coverageAmount}
          onChange={(e) => setCoverageAmount(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="premium" className="block text-gray-700">
          Premium
        </label>
        <input
          type="number"
          id="premium"
          className="form-input mt-1 block w-full"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="planHighlights" className="block text-gray-700">
          Plan Highlights
        </label>
        <input
          type="text"
          id="planHighlights"
          className="form-input mt-1 block w-full"
          value={planHighlights}
          onChange={(e) => setPlanHighlights(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="validityPeriod" className="block text-gray-700">
          Validity Period
        </label>
        <select
          id="validityPeriod"
          className="form-select mt-1 block w-full"
          value={validityPeriod}
          onChange={(e) => setValidityPeriod(e.target.value)}
          required
        >
          <option value="">Select validity period</option>
          <option value="ONE_YEAR">One Year</option>
          <option value="TWO_YEARS">Two Years</option>
          <option value="THREE_YEARS">Three Years</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="companyName" className="block text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="form-input mt-1 block w-full"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div className="text-right">
        <button
          type="button"
          className="btn btn-secondary text-white mr-2 bg-gray-500"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary text-white mr-2 bg-blue-500"
        >
          {id ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default PlanForm;