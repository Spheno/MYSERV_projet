import axios from "axios";

const url = "http://localhost:8800/categories";

export default {
    getCategories() {
        return axios.get(url + '/');
    },

    getCategory() {
        return axios.get(url + '/:idCategory');
    }
};