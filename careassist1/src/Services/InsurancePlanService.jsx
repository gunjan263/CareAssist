import axios from "axios";

const BASE_REST_API_URL =
  "http://localhost:8080/careassist/api/insurance-plans";

class InsurancePlanService {
  static getAllInsurancePlans() {
    return axios.get(BASE_REST_API_URL + "/get/all");
  }

  static addInsurancePlan(plan, accessToken) {
    return axios.post(BASE_REST_API_URL + "/add/plan", plan, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  static getInsurancePlanById(id, accessToken) {
    return axios.get(BASE_REST_API_URL + "/get/byID/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  static updateInsurancePlanById(id, plan, accessToken) {
    return axios.put(BASE_REST_API_URL + "/update/" + id, plan, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  static deleteInsurancePlanById(id, accessToken) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

export default InsurancePlanService;
