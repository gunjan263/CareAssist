import axios from "axios";

const BASE_REST_API_URL =
  "http://localhost:8080/careassist/api/insurance-companies";

class InsuranceCompanyService {
  getAllInsuranceCompanies() {
    return axios.get(BASE_REST_API_URL + "/get/all");
  }

  addInsuranceCompany(company, accessToken) {
    return axios.post(BASE_REST_API_URL + "/add/company", company, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  getInsuranceCompanyById(id, accessToken) {
    return axios.get(BASE_REST_API_URL + "/get/byID/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  updateInsuranceCompanyById(id, company, accessToken) {
    return axios.put(BASE_REST_API_URL + "/update/" + id, company, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  deleteInsuranceCompanyById(id, accessToken) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

export default new InsuranceCompanyService();
