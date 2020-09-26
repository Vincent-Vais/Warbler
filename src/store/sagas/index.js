import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_CHANNEL,
  CHANNELS_FETCHED,
  GET_USER,
  SET_CHANNEL,
  GET_CHANNELS,
  USER_FETCHED,
  GET_CHANNEL,
  GET_CURRENT_USER,
  CURRENT_USER_FETCHED,
} from "../actionTypes";
import { apiCall } from "../../services/api";

function* createChannel(action) {
  try {
    const data = {
      user1Id: action.payload.user1Id,
      user2Id: action.payload.user2Id,
    };
    const newChannel = yield call(apiCall, "post", "api/channels", data);
    yield put({ type: GET_CHANNELS });
    yield put({ type: GET_CURRENT_USER, payload: action.payload.user1Id });
    yield put({ type: GET_USER, payload: action.payload.user2Id });
    yield put({ type: SET_CHANNEL, payload: newChannel });
  } catch (e) {
    console.log(e);
  }
}

function* fetchAllChannels(action) {
  try {
    const newChannels = yield call(apiCall, "get", "api/channels");
    yield put({ type: CHANNELS_FETCHED, payload: newChannels });
  } catch (e) {
    console.log(e);
  }
}

function* fetchUser(action) {
  try {
    const newUser = yield call(apiCall, "get", `api/users/${action.payload}`);
    yield put({ type: USER_FETCHED, payload: newUser });
  } catch (e) {
    console.log(e);
  }
}

function* fetchCurrentUser(action) {
  try {
    const user = yield call(apiCall, "get", `api/users/${action.payload}`);
    yield put({ type: CURRENT_USER_FETCHED, payload: user });
  } catch (e) {
    console.log(e);
  }
}

function* addChannel() {
  yield takeEvery(ADD_CHANNEL, createChannel);
}

function* getChannels() {
  yield takeEvery(GET_CHANNELS, fetchAllChannels);
}

function* getUser() {
  yield takeEvery(GET_USER, fetchUser);
}

function* getCurrentUser() {
  yield takeEvery(GET_CURRENT_USER, fetchCurrentUser);
}

export { addChannel, getChannels, getUser, getCurrentUser };
