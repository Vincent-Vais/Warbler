import React, { Component } from "react";

class Authform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { signUp, onAuth } = this.props;
    const authType = signUp ? "signup" : "signin";
    onAuth(authType, this.state)
      .then(() => this.props.history.push("/"))
      .catch((err) => console.log(err));
  };
  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      removeError,
      history,
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="text"
                className="form-control"
                value={email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={this.handleChange}
              />
              {signUp ? (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    id="image-url"
                    name="profileImageUrl"
                    type="text"
                    className="form-control"
                    value={profileImageUrl}
                    onChange={this.handleChange}
                  />
                </div>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-large submit-btn"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Authform;
