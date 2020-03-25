import axios from "axios";

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
  }
};
