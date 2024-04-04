import axios from "axios";

const API_URL = "http://localhost:8080";

const UserService = {
  registerUser: (userData) => {
    return axios.post(API_URL + "/register", userData);
  },

  userLogin: (userData) => {
    return axios.post(API_URL + "/login", userData);
  },
};

export default UserService;
