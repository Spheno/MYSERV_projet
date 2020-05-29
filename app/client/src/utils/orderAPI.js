import axios from "axios";

const url = "http://localhost:8800/orders";

export default {
  getMyOrders: async function (phoneNumber) {
    try {
      const response = await axios.get(url + "/myOrders", {
        params: { phoneNumber: phoneNumber },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
