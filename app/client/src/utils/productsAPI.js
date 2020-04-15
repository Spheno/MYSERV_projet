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
  }
};
