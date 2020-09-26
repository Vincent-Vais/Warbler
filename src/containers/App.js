import React from "react";

import { Provider } from "react-redux";
import store from "../store";

import { BrowserRouter as Router } from "react-router-dom";

import { setAuthToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";

import Navbar from "./Navbar";
import Main from "./Main";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
