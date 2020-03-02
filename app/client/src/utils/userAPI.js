import axios from "axios";

const options = {
  "content-type": "application/json;charset=utf-8",
};
const url = "http://localhost:8800/user";

export default {
  login: function(phoneNumber, password) {
    return axios.post(
      url + '/login',
      {
        phoneNumber,
        password
      },
      {
        headers: options
      }
    );
  },

  signup: function(send) {
    return axios.post(url + '/signup', send, { headers: options })
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
    return axios.get(url + "/logout");
  }
};