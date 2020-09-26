import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { addChannel, getChannels, getUser, getCurrentUser } from "./sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

let reduxDevTools;

if (process.env.NODE_ENV === "development") {
  reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}
const configureStore = () =>
  createStore(
    rootReducer,
    compose(applyMiddleware(thunk, sagaMiddleware), reduxDevTools)
  );

const store = configureStore();

sagaMiddleware.run(addChannel);
sagaMiddleware.run(getChannels);
sagaMiddleware.run(getUser);
sagaMiddleware.run(getCurrentUser);

export default store;
