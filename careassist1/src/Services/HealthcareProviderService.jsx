import axios from "axios";

const BASE_REST_API_URL =
  "http://localhost:8080/careassist/api/healthcare-providers";

class HealthcareProviderService {
  getAllHealthcareProviders() {
    return axios.get(BASE_REST_API_URL + "/get/all");
  }

  addHealthcareProvider(provider, accessToken) {
    return axios.post(BASE_REST_API_URL + "/add", provider, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  getHealthcareProviderById(id, accessToken) {
    return axios.get(BASE_REST_API_URL + "/get/byID/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  updateHealthcareProviderById(id, provider, accessToken) {
    return axios.put(BASE_REST_API_URL + "/update/" + id, provider, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  deleteHealthcareProviderById(id, accessToken) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

export default new HealthcareProviderService();
