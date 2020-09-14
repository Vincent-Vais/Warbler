import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";

export const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
});

export default rootReducer;
