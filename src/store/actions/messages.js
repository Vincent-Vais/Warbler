import { apiCall } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE } from "../actionTypes";

export const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages,
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  id,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const deleteMessage = (user_id, message_id) => {
  return (dispatch) =>
    apiCall("delete", `api/users/${user_id}/messages/${message_id}`)
      .then((res) => {
        console.log(res);
        console.log(message_id);
        dispatch(removeMessage(message_id));
      })
      .catch((err) => dispatch(addError(err.message)));
};

export const fetchMessages = () => {
  return (dispatch) =>
    apiCall("get", "api/messages")
      .then((res) => {
        dispatch(loadMessages(res));
      })
      .catch((err) => dispatch(addError(err.message)));
};

export const postNewMessage = (text) => {
  return (dispatch, getState) => {
    const { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`, { text })
      .then((res) => {
        dispatch(addMessage(res));
      })
      .catch((err) => dispatch(addError(err.message)));
  };
};
