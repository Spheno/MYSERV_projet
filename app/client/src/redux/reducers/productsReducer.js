import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
  } from "../constants/action-types";
  
  const initialState = {
    products: [],
    error: null
  };
  
  export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS_BEGIN:
        return {
          ...state,
          error: null
        };
  
      case GET_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload.products
        };
  
      case GET_PRODUCTS_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          products: []
        };
  
      default:
        return state;
    }
  }
  