import axios from "axios";

const url = "http://localhost:8800/search";

export default {
  searchByProduct: async function (productName) {
    try {
      const response = await axios.get(url + "/byProduct", {
        params: { productName: productName },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  searchByUser: async function (userName) {
    try {
      const response = await axios.get(url + "/byUser", {
        params: { userName: userName },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  searchByTag: async function (tag) {
    try {
      const response = await axios.get(url + "/byTag", {
        params: { tag: tag },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
