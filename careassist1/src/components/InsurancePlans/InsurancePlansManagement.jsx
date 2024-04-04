import React, { useState, useEffect, useContext } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import InsurancePlanService from "../../Services/InsurancePlanService";
import UpdateProfileModal from "../Common/ProfileModel";
import InsurancePlanForm from "../InsurancePlans/InsurancePlanForm";
import { AuthContext } from "../../context/AuthProvider";

const InsurancePlanManagement = () => {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [planToUpdate, setPlanToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPlans, setTotalPlans] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchAllInsurancePlans();
  }, []);

  const fetchAllInsurancePlans = () => {
    InsurancePlanService.getAllInsurancePlans()
      .then((response) => {
        setInsurancePlans(response.data);
        setTotalPlans(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching insurance plans:", error);
      });
  };

  const deleteInsurancePlan = (id) => {
    InsurancePlanService.deleteInsurancePlanById(id, auth.accessToken)
      .then(() => {
        fetchAllInsurancePlans();
      })
      .catch((error) => {
        console.error("Error deleting insurance plan:", error);
      });
  };

  const handleUpdate = (id) => {
    const planToUpdate = insurancePlans.find((plan) => plan.planId === id);
    if (planToUpdate) {
      setPlanToUpdate(planToUpdate);
      setShowForm(true);
    } else {
      console.error("Insurance plan not found.");
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this insurance plan?")
    ) {
      deleteInsurancePlan(id);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
    setPlanToUpdate(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchAllInsurancePlans();
  };

  const filteredInsurancePlans = insurancePlans.filter((plan) =>
    plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Insurance Plan Management
      </h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by plan name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center ml-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {totalPlans}
            </h2>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleAdd}>
          <FaPlus className="mr-2" /> Add
        </button>
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />

      {showForm && (
        <UpdateProfileModal
          show={showForm}
          handleClose={handleCloseForm}
          title={planToUpdate ? "Update Insurance Plan" : "Add Insurance Plan"}
          formComponent={
            <InsurancePlanForm
              id={planToUpdate ? planToUpdate.planId : null}
              handleClose={handleCloseForm}
              handleFormSubmit={handleFormSubmit}
            />
          }
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Plan Name
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Plan Description
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Company Id
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Coverage Amount
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Premium
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Plan Highlights
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Validity Period
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Company Name
              </th>

              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50  divide-y divide-gray-200">
            {filteredInsurancePlans.map((plan) => (
              <tr key={plan.planId}>
                <td className="px-6 py-4 whitespace-nowrap">{plan.planName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.planDescription}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.companyId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.coverageAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.premium}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.planHighlights}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.validityPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {plan.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success text-white-600 hover:text-white-900"
                      onClick={() => handleUpdate(plan.planId)}
                    >
                      Edit
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsurancePlanManagement;
