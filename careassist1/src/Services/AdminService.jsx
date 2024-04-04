import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/careassist/api/administrators";

class AdminService {
  getAllAdministrators(accessToken) {
    return axios.get(BASE_REST_API_URL + "/get/all", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  addAdmin(admin, accessToken) {
    return axios.post(BASE_REST_API_URL + "/add/admin", admin, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  getAdministratorById(id, accessToken) {
    return axios.get(BASE_REST_API_URL + "/get/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  updateAdministrator(id, admin, accessToken) {
    return axios.put(BASE_REST_API_URL + "/update/" + id, admin, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  deleteAdministrator(id, accessToken) {
    return axios.delete(BASE_REST_API_URL + "/delete/" + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}

export default new AdminService();
