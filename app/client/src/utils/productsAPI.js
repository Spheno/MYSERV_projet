import axios from "axios";

const url = "http://localhost:8800/products";

export default {
  getProducts() {
    return axios.get(url + "/");
  },

  getProduct(id) {
    return axios.get(url + "/", {
      params: { id: id }
    });
  }
};
