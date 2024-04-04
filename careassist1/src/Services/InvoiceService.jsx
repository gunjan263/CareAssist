import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/careassist/api/invoices";

class InvoiceService {
  updateInvoice(id, status, accessToken) {
    const payload = { invoiceStatus: status }; // Construct the payload object
    return axios.put(BASE_REST_API_URL + "/update/" + id, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
      },
    });
  }

  deleteInvoice(id, accessToken) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
      },
    });
  }

  getInvoiceStatusById(id, accessToken) {
    return axios.get(BASE_REST_API_URL + "/" + id + "/status", {
      headers: {
        Authorization: `Bearer ${accessToken}}`, // Include the token in the Authorization header
      },
    });
  }

  getAllInvoiceStatus(accessToken) {
    return axios.get(BASE_REST_API_URL + "/all/status", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
      },
    });
  }

  generateInvoiceAndUploadPDF(providerId, patientId, amount, status, pdf) {
    const formData = new FormData();
    formData.append("providerId", providerId);
    formData.append("patientId", patientId);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("pdf", pdf);
  
    return axios.post(BASE_REST_API_URL + "/generate-invoice", formData);
  }
  
  getPatientInvoices(patientId, token) {
    return axios.get(BASE_REST_API_URL + "/get/" + patientId, {
      responseType: "arraybuffer",
    });
  }

  getPDFByInvoiceId(invoiceId, token) {
    return axios.get(BASE_REST_API_URL + "/get/pdf/" + invoiceId, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
  }

  getAllInvoices() {
    return axios.get(BASE_REST_API_URL + "/get/all/invoice");
  }
  getInvoiceByProviderId(providerId) {
    return axios.get(BASE_REST_API_URL + "/invoices/provider/" + providerId);
  }
  getInvoiceByPatientId(patientId) {
    return axios.get(BASE_REST_API_URL + "/patient/" + patientId);
  }
}

export default new InvoiceService();
