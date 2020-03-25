import axios from "axios";

const jsonConfig = {
  "content-type": "application/json;charset=utf-8"
};

const url = "http://localhost:8800/user";

export default {
  login: function(phoneNumber, password) {
    return axios.post(
      url + "/login",
      {
        phoneNumber,
        password
      },
      {
        headers: jsonConfig
      }
    );
  },

  signup: function(send) {
    return axios.post(url + "/signup", send, { headers: jsonConfig });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
    return axios.get(url + "/logout");
  },

  createProduct: async function(data) {
    return axios.post(url + "/product", data);
  },

  getMyProducts: async function(phoneNumber) {
    try {
      const response = await axios.get(url + "/myProducts", {
        params: { phoneNumber: phoneNumber }
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
};
