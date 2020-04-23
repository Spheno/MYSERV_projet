import { getCategories } from "./category_actions";
import { getProductsOnSale } from "./product_actions";

export function getAllData(phoneNumber) {
    return dispatch => Promise.all([
      dispatch(getCategories()),
      dispatch(getProductsOnSale(phoneNumber))
    ]);
  }