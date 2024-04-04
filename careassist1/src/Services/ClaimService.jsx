// ClaimService.jsx
import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/careassist/api/claims";

class ClaimService {
  updateClaimStatus(id, status, claimApprovalDate, accessToken) {
    return axios.put(
      `${BASE_REST_API_URL}/update/status/${id}`,
      {
        status,
        claimApprovalDate,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }

  submitClaim(providerId, patientId, companyName, amount, status, pdf) {
    const formData = new FormData();
    formData.append("providerId", providerId);
    formData.append("patientId", patientId);
    formData.append("companyName", companyName);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("pdf", pdf);
    return axios.post(BASE_REST_API_URL + "/submit", formData);
  }

  getPDFByPatientId(patientId) {
    return axios.get(BASE_REST_API_URL + "/pdfBy/PatientID/" + patientId, {
      responseType: "arraybuffer",
    });
  }

  getAllClaims() {
    return axios.get(BASE_REST_API_URL + "/get/all");
  }

  getPDFByClaimId(claimId) {
    return axios.get(BASE_REST_API_URL + "/get/pdf/" + claimId, {
      responseType: "arraybuffer",
    });
  }

  getClaimByPatientId(patientId) {
    return axios.get(BASE_REST_API_URL + "/patient/claim/" + patientId);
  }
}

export default new ClaimService();
