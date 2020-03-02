import axios from "axios";

const options = {
  "content-type": "application/json;charset=utf-8",
};
const url = "http://localhost:8800";

export default {
    getCategories() {
        return axios.get(url + '/categories');
    }
};