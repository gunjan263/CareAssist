import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/careassist/api/patients";

class PatientService {
  getAllPatients() {
    return axios.get(BASE_REST_API_URL + "/get/all");
  }

  addPatient(patient) {
    return axios.post(BASE_REST_API_URL + "/add/patient", patient);
  }

  getPatientById(id, token) {
    return axios.get(`${BASE_REST_API_URL}/get/byID/${id}`);
  }

  // async getPatientById(id, token) {
  //   console.log(
  //     "url:http://localhost:8080/careassist/api/patients/get/byID/${id}"
  //   );
  //   const response = await axios({
  //     method: "get",
  //     url: `http://localhost:8080/careassist/api/patients/get/byID/${id}`,

  //     headers: {
  //       "Content-Type": "application/json; charset=UTF-8",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(response);
  // }

  getPatientByUserId(userId) {
    return axios.get(BASE_REST_API_URL + "/byUserId/" + userId);
  }

  updatePatientByUserId(userId, patient) {
    return axios.get(BASE_REST_API_URL + "/update/byUserId/" + userId, patient);
  }

  updatePatientById(id, patient, token) {
    return axios.put(BASE_REST_API_URL + "/update/" + id, patient);
  }
  // updatePatientById(id, patient, token) {
  //   console.log("token", token);
  //   return axios.put(BASE_REST_API_URL + "/update/" + id, patient, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  deletePatientById(id) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id);
  }

  selectInsurancePlanForPatient(patientId, insurancePlanId, token) {
    return axios.post(
      `${BASE_REST_API_URL}/${patientId}/insurance-plans/select?insurancePlanId=${insurancePlanId}`
    );
  }

  findInsurancePlanIdsByPatientId(patientId) {
    return axios.get(
      BASE_REST_API_URL + "/find-insurance-plan-ids?patientId=" + patientId
    );
  }

  findInsurancePlansByPatientId(patientId, token) {
    return axios.get(
      `${BASE_REST_API_URL}/find-insurance-plans?patientId=${patientId}`
    );
  }
  // getPlanPurchasedDate(patientId) {
  //   return axios.get(BASE_REST_API_URL + "/plan-purchased-date/" + patientId);
  // }
}

export default new PatientService();
