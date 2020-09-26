import React from "react";
import DefaultProfileImage from "../images/default-profile-image.jpg";
import { Link } from "react-router-dom";

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-sm-2">
    <div
      className="card"
      style={{ width: "11rem", justifyContent: "center", alignItems: "center" }}
    >
      <img
        src={profileImageUrl || DefaultProfileImage}
        className="img-thumbnail"
        alt={username}
        width="200"
        height="200"
      />
      <div className="card-body">
        <h5 className="card-title">@ {username}</h5>
        <Link to="/messages" className="btn btn-primary">
          Direct Messages
        </Link>
      </div>
    </div>
  </aside>
);

export default UserAside;
