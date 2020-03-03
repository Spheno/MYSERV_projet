import { ADD_ARTICLE, LOGIN, LOGOUT } from "../constants/action-types";

export function addArticle(payload) {
  return {
    type: ADD_ARTICLE,
    payload
  };
}

export function login(userInfo) {
  return {
    type: LOGIN,
    payload: userInfo
  };
};

export function logout() {
  return {
      type: LOGOUT
  }
}

