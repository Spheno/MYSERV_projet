import { getCategories } from "./category_actions";
import { getProducts } from "./product_actions";

export function getAllData() {
    return dispatch => Promise.all([
      dispatch(getCategories()),
      dispatch(getProducts())
    ]);
  }