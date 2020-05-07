import axios from "axios";

const jsonConfig = {
  "content-type": "application/json;charset=utf-8"
};

const url = "http://localhost:8800/uploads";

export default {
  getProductPictures: async function(phoneNumber, productTitle) {
    try {
      const response = await axios.get(url + "/", {
        params: {
          phoneNumber: phoneNumber,
          productTitle: productTitle
        }
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  customProfile: async function(data) {
    try {
      const response = axios.post(url + "/customProfile", data);
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteAvatar: function(authorNumber) {
    return axios.get(url + "/deleteAvatar", {
      params: {
        authorNumber: authorNumber
      }
    });
  },

  createProduct: async function(data) {
    try {
      const response = axios.post(url + "/product", data);
      return response;
    } catch (error) {
      return error;
    }
  },

  updateProduct: async function(id, data) {
    try {
      const response = axios.put(url + `/product/edit/${id}`, data, {
        headers: jsonConfig
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  deleteProduct: async function(productID, phoneNumber, title) {
    return await axios.delete(
      url + "/deleteProduct",
      {
        params: { productID: productID, phoneNumber: phoneNumber, title: title }
      },
      { headers: null }
    );
  }
};
