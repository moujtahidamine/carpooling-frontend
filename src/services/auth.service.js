import axios from "axios";
import { API_URL } from "../constants";

const register = (data) => {
  return axios.post(API_URL + "/register", data);
};

const login = (data) => {
  return axios
    .post(API_URL + "/login", data)
    .then((response) => {
      console.log(response.data)
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
