import React, { Component } from "react";
import { connect } from "react-redux";

export default function (WrappedComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      if (!this.props.isAuthenticated) this.props.history.push("/signin");
    }
    componentDidUpdate() {
      if (!this.props.isAuthenticated) this.props.history.push("/signin");
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: state.currentUser.isAuthenticated,
  });

  return connect(mapStateToProps)(Authenticate);
}
