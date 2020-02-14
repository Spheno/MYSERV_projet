import axios from "axios";
const headers = {
  "content-type": "application/json;charset=utf-8",
};
const url = "http://localhost:8800";

export default {
  login: function(phoneNumber, password) {
    return axios.post(
      `${url}/user/login`,
      {
        phoneNumber,
        password
      },
      {
        headers: headers
      }
    );
  },

  signup: function(send) {
    return axios.post(`${url}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
  }
};