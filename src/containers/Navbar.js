import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../store/actions/auth";

import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  logOut = (event) => {
    event.preventDefault();
    this.props.logOut();
  };
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right nav-logout">
              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/messages/new`}
                >
                  New Message
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-danger btn-small"
                  onClick={this.logOut}
                >
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser });

export default connect(mapStateToProps, { logOut })(Navbar);
