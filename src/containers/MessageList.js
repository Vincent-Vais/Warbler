import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages, deleteMessage } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    const { messages, deleteMessage, currentUser } = this.props;
    return (
      <div className="row col-sm-7">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messages.map(({ _id, createdAt, text, user }) => (
              <MessageItem
                key={_id}
                date={createdAt}
                username={user.username}
                profileImageUrl={user.profileImageUrl}
                deleteMessage={deleteMessage.bind(this, user._id, _id)}
                isCorrectUser={currentUser === user._id}
              >
                {text}
              </MessageItem>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  currentUser: state.currentUser.user.id,
});

export default connect(mapStateToProps, { fetchMessages, deleteMessage })(
  MessageList
);
