import React, { useState } from "react";
import InvoiceService from "../../Services/InvoiceService"; 

const GenerateInvoiceForm = () => {
  const [formData, setFormData] = useState({
    providerId: "",
    patientId: "",
    amount: "",
    status: "",
    pdf: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pdf: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await InvoiceService.generateInvoiceAndUploadPDF(
        formData.providerId,
        formData.patientId,
        formData.amount,
        formData.status,
        formData.pdf
      );
      console.log("Invoice generated successfully:", response.data);
      setSubmitting(false);
      setInvoiceGenerated(true);
    } catch (error) {
      console.error("Error generating invoice:", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!invoiceGenerated ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <input
              type="text"
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              placeholder="Provider ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder="Patient ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={submitting}
          >
            {submitting ? "Generating Invoice..." : "Generate Invoice"}
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
          <p>Invoice generated successfully!</p>
          {/* Additional content or actions */}
        </div>
      )}
    </div>
  );
};

export default GenerateInvoiceForm;
