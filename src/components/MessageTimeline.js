import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";
import NewsAside from "./NewsAside";

const MessageTimeline = ({ profileImageUrl, username }) => (
  <div className="row">
    <UserAside profileImageUrl={profileImageUrl} username={username} />
    <MessageList />
    <NewsAside />
  </div>
);

export default MessageTimeline;
