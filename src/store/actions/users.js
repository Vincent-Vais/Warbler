import { apiCall } from "../../services/api";
import { addError } from "./error";
import { SHOW_USERS } from "../actionTypes";

export const showUsers = (users) => ({
  type: SHOW_USERS,
  payload: users,
});

export const loadUsers = (currentUser) => {
  return (dispatch) => {
    apiCall("get", "/api/users")
      .then((data) => {
        const users = data.reduce(
          (accumulator, { channels, _id, profileImageUrl, username }) => {
            console.log(_id);
            if (_id !== currentUser._id)
              accumulator.push({ channels, _id, profileImageUrl, username });
            return accumulator;
          },
          []
        );
        dispatch(showUsers(users));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};
