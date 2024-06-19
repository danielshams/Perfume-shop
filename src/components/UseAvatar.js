import React from "react";
import useUser from "../authentication/useUser";
import "./UseAvatar.css";

export default function UseAvatar() {
  const { user } = useUser();

  const avatar =
    user && user.user_metadata && user.user_metadata.avatar
      ? user.user_metadata.avatar
      : "default-user.svg";

  return (
    <div>
      <img className="avatar-image" src={avatar} alt="user" />
    </div>
  );
}
