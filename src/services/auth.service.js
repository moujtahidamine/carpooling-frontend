import axios from "axios";
import { API_URL } from "../constants";

const signup = (data) => {
  return axios.post(API_URL + "/register", data);
};

const login = (data) => {
  return axios
    .post(API_URL + "/login", data)
    .then((response) => {
      console.log(response)
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  signup,
  login,
  logout,
};
