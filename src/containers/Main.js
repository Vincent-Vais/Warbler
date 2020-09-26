import React from "react";

import { Switch, Route, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { removeError, addError } from "../store/actions/error";

import Homepage from "../components/Homepage";
import Authform from "../components/Authform";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";
import DirectMessages from "../components/DirectMessages";

import { authUser } from "../store/actions/auth";

const Main = (props) => {
  const { authUser, errors, removeError, addError, currentUser } = props;
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
              addError={addError}
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
              addError={addError}
              {...props}
            />
          )}
        />
        <Route
          path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
        />
        <Route path="/messages" component={withAuth(DirectMessages)} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { authUser, removeError, addError })(Main)
);
