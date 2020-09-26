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
    const { signUp, onAuth, addError } = this.props;
    const authType = signUp ? "signup" : "signin";
    const { profileImageUrl, username } = this.state;
    if (!profileImageUrl)
      this.setState({ profileImageUrl: this.getAvatar(username) }, () => {
        onAuth(authType, this.state)
          .then(() => this.props.history.push("/"))
          .catch((err) => addError(err));
      });
  };

  getAvatar = (name) => `https://ui-avatars.com/api/?name=${name}`;

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
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-envelope-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-lock-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                      <path
                        fillRule="evenodd"
                        d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </div>

              {signUp ? (
                <div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={this.handleChange}
                      placeholder="Username"
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-file-person-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      id="image-url"
                      name="profileImageUrl"
                      type="text"
                      className="form-control"
                      value={profileImageUrl}
                      onChange={this.handleChange}
                      placeholder="Image URL"
                    />
                  </div>
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
