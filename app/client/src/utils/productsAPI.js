import axios from "axios";

const url = "http://localhost:8800/products";

export default {
  getProducts() {
    return axios.get(url + "/");
  },

  getProductByID: async function(id) {
    try {
      const response = await axios.get(url + "/id", {
        params: { id: id }
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // not sold products from other users
  getProductsOnSale: async phoneNumber => {
    return axios.get(url + "/onSale", { params: { phoneNumber: phoneNumber } });
  },

  getProductComments: async function(productID) {
    try {
      const response = await axios.get(url + "/getProductComments", {
        params: { productID: productID }
      });
      return response.data
    } catch(error) {
      return error;
    }
  },

  addProductComment: async function(data) {
    return await axios.post(url + "/addProductComment", data)
  },

  deleteProductComment: async function(reviewID, productID) {
    return await axios.delete(url + "/deleteProductComment", {
      params: { reviewID: reviewID, productID: productID }
    });
  },
};
