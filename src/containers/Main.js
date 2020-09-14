import React from "react";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { removeError } from "../store/actions/error";

import Homepage from "../components/Homepage";
import Authform from "../components/Authform";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

import { authUser } from "../store/actions/auth";

const Main = (props) => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={(props) => (
            <Authform
              buttonText={"Log in"}
              heading={"Welcome Back!"}
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <Authform
              buttonText={"Sign me up!"}
              heading={"Join Warbler today"}
              signUp={true}
              onAuth={authUser}
              errors={errors}
              removeError={removeError}
              {...props}
            />
          )}
        />
        <Route
          path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
