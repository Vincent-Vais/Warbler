import React from "react";
import { InputGroup, FormControl, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { loadUsers } from "../store/actions/users";
import { setChannel } from "../store/actions/channels";

class UsersPanel extends React.Component {
  state = {
    searchField: "",
  };
  componentDidMount() {
    debugger;
    const { users, channels, currentUser, dispatch } = this.props;
    if (!users.length) dispatch(loadUsers(currentUser));
    if (!channels.allChannels.length) dispatch({ type: "GET_CHANNELS" });
  }

  handleChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  showMessagePannel = (otherUser) => {
    const { channels, currentUser, addChannel, dispatch } = this.props;
    console.log(channels);
    const otherUserChannels = otherUser.channels;
    const userChannels = currentUser.channels;
    const match = channels.allChannels.filter(
      ({ users }) =>
        !!users.find((user) => user === currentUser._id) &&
        !!users.find((user) => user === otherUser._id)
    );
    debugger;
    if (
      match.length &&
      otherUserChannels.length &&
      userChannels.length &&
      channels.currentChannel &&
      match[0]._id !== channels.currentChannel._id
    ) {
      dispatch(() => setChannel(match));
      return;
    }
    dispatch({
      type: "ADD_CHANNEL",
      payload: { user1Id: currentUser._id, user2Id: otherUser._id },
    });
  };

  render() {
    const { users } = this.props;
    const { searchField } = this.state;
    const filteredUsers = users.filter(({ username }) =>
      username.includes(searchField.toLowerCase().replace("@", "").trim())
    );
    if (!users.length)
      return (
        <div className="pannel">
          <Spinner animation="grow" />
        </div>
      );
    return (
      <div className="pannel">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" className="pannel--input">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search for users"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={this.handleChange}
            value={searchField}
            className="pannel--input"
          />
        </InputGroup>
        <ul className="panel--list">
          {filteredUsers.map((user, i) => {
            return (
              <li className="pannel-list__item" key={i}>
                <button
                  key={user.id}
                  className="panel--list__button"
                  onClick={() => this.showMessagePannel(user)}
                >
                  @ {user.username}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
  users: state.users,
  channels: state.channels,
});

export default connect(mapStateToProps)(UsersPanel);
