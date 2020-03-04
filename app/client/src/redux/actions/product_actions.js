import API from "../../utils/productsAPI";

import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE
} from "../constants/action-types";

export function getProducts() {
  return async dispatch => {
    dispatch(getProductsBegin());
    try {
      const response = await API.getProducts();
      dispatch(getProductsSuccess(response.data));
    } catch (error) {
      return dispatch(getProductsFailure(error));
    }
  };
}

export const getProductsBegin = () => ({
  type: GET_PRODUCTS_BEGIN
});

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: { products }
});

export const getProductsFailure = error => ({
  type: GET_PRODUCTS_FAILURE,
  payload: { error }
});
