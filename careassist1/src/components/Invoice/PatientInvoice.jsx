import React, { useState, useEffect, useContext } from "react";
import InvoiceService from "../../Services/InvoiceService";
import { AuthContext } from "../../context/AuthProvider";

const PatientInvoice = ({ patientId }) => {
  const [invoices, setInvoices] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    InvoiceService.getInvoiceByPatientId(patientId)
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const handleDownloadPDF = async (invoiceId) => {
    try {
      const response = await InvoiceService.getPDFByInvoiceId(
        invoiceId,
        auth.accessToken
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        console.error("Error opening PDF in new tab");
      }
    } catch (error) {
      console.error("Error downloading invoice PDF:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Invoices for Patient ID: {patientId}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden divide-y divide-gray-200">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Provider ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Invoice Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
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
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.patientId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.providerId}
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
                    onClick={() => handleDownloadPDF(invoice.invoiceId)}
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

export default PatientInvoice;
