import React, { useState, useEffect, useContext } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import PatientService from "../../Services/PatientService";
import UpdateProfileModal from "../Common/ProfileModel";
import PatientForm from "./PatientForm";
import { AuthContext } from "../../context/AuthProvider";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [patientToUpdate, setPatientToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPatients, setTotalPatients] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = () => {
    PatientService.getAllPatients()
      .then((response) => {
        setPatients(response.data);
        setTotalPatients(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  const deletePatient = (id) => {
    PatientService.deletePatientById(auth.userId, auth.accessToken)
      .then(() => {
        fetchAllPatients();
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  const handleUpdate = (id) => {
    const patientToUpdate = patients.find(
      (patient) => patient.patientId === id
    );
    if (patientToUpdate) {
      setPatientToUpdate(patientToUpdate);
      setShowForm(true);
    } else {
      console.error("Patient not found.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      deletePatient(id);
    }
  };

  const handleAdd = () => {
    setShowForm(true);
    setPatientToUpdate(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchAllPatients();
  };

  const filteredPatients = patients.filter((patient) =>
    (patient.firstName + " " + patient.lastName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Patient Data</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center ml-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {totalPatients}
            </h2>
          </div>
        </div>

        {/* <button className="btn btn-primary" onClick={handleAdd}>
          <FaPlus className="mr-2" /> Add
        </button> */}
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />

      {showForm && (
        <UpdateProfileModal
          show={showForm}
          handleClose={handleCloseForm}
          title={patientToUpdate ? "Update Patient" : "Add Patient"}
          formComponent={
            <PatientForm
              id={patientToUpdate ? patientToUpdate.patientId : null}
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
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Symptoms
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-50  divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.patientId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.dateOfBirth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.symptoms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success text-white-600 hover:text-white-900"
                      onClick={() => handleUpdate(patient.patientId)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="btn btn-danger text-white-600 hover:text-white-900"
                      onClick={() => handleDelete(patient.patientId)}
                    >
                      Delete
                    </button> */}
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

export default PatientManagement;
