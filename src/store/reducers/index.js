import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import users from "./users";
import channels from "./channels";

export const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  users,
  channels,
});

export default rootReducer;
