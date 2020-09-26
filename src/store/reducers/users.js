import { SHOW_USERS, USER_FETCHED } from "../actionTypes";

const users = (state = [], action) => {
  switch (action.type) {
    case SHOW_USERS:
      return [...action.payload];
    case USER_FETCHED:
      return state.reduce((accumulator, user) => {
        if (user._id === action.payload._id) accumulator.push(action.payload);
        else accumulator.push(user);
        return accumulator;
      }, []);
    default:
      return state;
  }
};

export default users;
