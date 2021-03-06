import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE } from "../actionTypes";

const messages = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.messages];
    case REMOVE_MESSAGE:
      return state.filter((message) => message._id !== action.id);
    case ADD_MESSAGE:
      return state.includes(action.message)
        ? state
        : [action.message, ...state];
    default:
      return state;
  }
};

export default messages;
