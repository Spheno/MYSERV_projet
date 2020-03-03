import axios from "axios";

const url = "http://localhost:8800/products";

export default {
  getProducts() {
    return axios.get(url + "/");
  },

  getProduct() {
    return axios.get(url + "/:id");
  }
};
