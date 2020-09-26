import { apiCall } from "../../services/api";
import { addError } from "./error";
// import { SHOW_CHANNELS } from "../actionTypes";

// export const showChannels = (channels) => ({
//   type: SHOW_CHANNELS,
//   payload: channels,
// });

export const setChannel = (channel) => {
  return (dispatch) => {
    localStorage.setItem("currentChannel", channel);
    dispatch({
      type: "SET_CHANNEL",
      payload: channel,
    });
  };
};

// export const loadChannels = () => {
//   return (dispatch) => {
//     apiCall("get", "api/channels")
//       .then((channels) => dispatch(showChannels(channels)))
//       .catch((err) => dispatch(addError(err.message)));
//   };
// };

// export const addChannel = (user1Id, user2Id) => {
//   return (dispatch) => {
//     apiCall("post", `api/channels`, {
//       user1Id,
//       user2Id,
//     })
//       .then((channel) => {
//         dispatch(loadChannels());
//         dispatch(setChannel(channel));
//       })
//       .catch((err) => dispatch(addError(err.message)));
//   };
// };
