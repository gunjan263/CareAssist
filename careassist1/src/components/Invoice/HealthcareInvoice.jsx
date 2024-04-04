import React, { useState, useEffect } from "react";
import { FaFilePdf, FaSearch } from "react-icons/fa";
import InvoiceService from "../../Services/InvoiceService";
import UpdateInvoiceStatusForm from "./UpdateInvoiceStatusForm";
import ProfileModal from "../Common/ProfileModel";
import GenerateInvoiceForm from "./GenerateInvoiceForm";

const HeathcareInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      const response = await InvoiceService.getAllInvoices();
      setInvoices(response.data);
      setTotalInvoices(response.data.length);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleUpdateStatus = async (status) => {
    try {
      if (!selectedInvoice || !status) {
        alert("Please select an invoice and a status.");
        return;
      }

      const payload = {
        invoiceStatus: status,
      };

      await InvoiceService.updateInvoice(selectedInvoice.invoiceId, "PAID");

      const updatedInvoices = invoices.map((invoice) =>
        invoice.invoiceId === selectedInvoice.invoiceId
          ? { ...invoice, invoiceStatus: status }
          : invoice
      );

      setInvoices(updatedInvoices);

      alert(`Invoice ${selectedInvoice.invoiceId} status updated successfully`);

      setSelectedInvoice(null);
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      const response = await InvoiceService.getPDFByInvoiceId(id);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Error downloading invoice PDF:", error);
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceId.toString().includes(searchTerm.toLowerCase())
  );

  const handleGenerateInvoice = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitInvoice = async (formData) => {
    try {
      await InvoiceService.generateInvoiceAndUploadPDF(formData);
      fetchAllInvoices(); 
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">All Invoices</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700">
            {totalInvoices}
          </h2>
        </div>
        <button
          onClick={handleGenerateInvoice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Invoice
        </button>
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Provider ID
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Provider Name
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Invoice Date
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                Update
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                View PDF
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.patientId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.providerId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.providerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedInvoice(invoice)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownloadPDF(invoice.invoiceId)}
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
      {selectedInvoice && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Update Invoice Status
            </h2>
            <UpdateInvoiceStatusForm
              onSubmit={handleUpdateStatus}
              onCancel={() => setSelectedInvoice(null)}
            />
          </div>
        </div>
      )}
      <ProfileModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Generate Invoice"
        formComponent={<GenerateInvoiceForm onSubmit={handleSubmitInvoice} onClose={handleCloseModal} />}
      />
    </div>
  );
};

export default HeathcareInvoice;