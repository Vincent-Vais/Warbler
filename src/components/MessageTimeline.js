import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeline = ({ profileImageUrl, username }) => (
  <div className="row">
    <UserAside profileImageUrl={profileImageUrl} username={username} />
    <MessageList />
  </div>
);

export default MessageTimeline;
