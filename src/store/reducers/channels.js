import { SET_CHANNEL, CHANNELS_FETCHED } from "../actionTypes";

const INIT_STATE = {
  allChannels: [],
  currentChannel: localStorage.getItem("currentChannel") || null,
};

const channels = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANNELS_FETCHED:
      return {
        ...state,
        allChannels: [...action.payload],
      };
    case SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};

export default channels;
