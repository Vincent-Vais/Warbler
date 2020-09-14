import { apiCall, setTokenHeader } from "../../services/api";

import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./error";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const setAuthToken = (token) => setTokenHeader(token);

export const logOut = () => {
  return (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
};

export const authUser = (type, userData) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          if (err && err.message) dispatch(addError(err.message));
          else dispatch(addError("Server is offline"));
          reject();
        });
    });
};
