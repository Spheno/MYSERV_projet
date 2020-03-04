import { combineReducers } from "redux";
import categories from "../reducers/categoriesReducer";
import products from "../reducers/productsReducer";

export default combineReducers({
  categories,
  products
});
