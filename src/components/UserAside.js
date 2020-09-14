import React from "react";
import DefaultProfileImage from "../images/default-profile-image.jpg";

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={profileImageUrl || DefaultProfileImage}
          className="img-thumbnail"
          alt={username}
          width="200"
          height="200"
        />
      </div>
    </div>
  </aside>
);

export default UserAside;
