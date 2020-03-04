import {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
} from "../constants/action-types";

const initialState = {
  categories: [],
  error: null
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_BEGIN:
      return {
        ...state,
        error: null
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        categories: []
      };

    default:
      return state;
  }
}
