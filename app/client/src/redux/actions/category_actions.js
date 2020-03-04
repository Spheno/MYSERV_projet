import API from "../../utils/categoriesAPI";

import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
} from "../constants/action-types";

export function getCategories() {
  return async dispatch => {
    dispatch(getCategoriesBegin());
    try {
      const response = await API.getCategories();
      dispatch(getCategoriesSuccess(response.data));
    } catch (error) {
      return dispatch(getCategoriesFailure(error));
    }
  };
}

export const getCategoriesBegin = () => ({
  type: GET_CATEGORIES_BEGIN
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const getCategoriesFailure = error => ({
  type: GET_CATEGORIES_FAILURE,
  payload: { error }
});
