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

  getUser: async function(id, phoneNumber) {
    try {
      const response = await axios.get(url + "/", { params: { id: id, phoneNumber: phoneNumber } });
      return response.data.user;
    } catch (error) {
      return error;
    }
  },

  editUser: async function(data) {
    return await axios.post(url + "/", data);
  },

  getMyFavs: async function(phoneNumber) {
    try {
      const response = await axios.get(url + "/myFavs", {
        params: { phoneNumber: phoneNumber }
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getMyCart: async function(phoneNumber) {
    try {
      const response = await axios.get(url + "/myCart", {
        params: { phoneNumber: phoneNumber }
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  addToCart: async function(data) {
    return await axios.post(url + "/addToCart", data);
  },

  removeFromCart: async function(phoneNumber, productID) {
    return await axios.delete(url + "/removeFromCart", {
      params: { phoneNumber: phoneNumber, productID: productID }
    });
  },

  removeFromFavs: async function(phoneNumber, productID) {
    return await axios.delete(url + "/removeFromFavs", {
      params: { phoneNumber: phoneNumber, productID: productID }
    }, { headers: null });
  },

  addToFavs: async function(data) {
    return await axios.post(url + "/addToFavs", data);
  },
  
  deleteProduct: async function(productID) {
    return await axios.delete(url + "/deleteProduct", {
      params: { productID: productID }
    }, { headers: null });
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
  },

  getMyProductsSold: async function(phoneNumber) {
    try {
      const response = await axios.get(url + "/myProductsSold", {
        params: { phoneNumber: phoneNumber }
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
};
