import React from "react";
import UseAvatar from "../components/UseAvatar";
import Logout from "../authentication/Logout";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import UpdatePasswordForm from "../authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../authentication/UpdateUserDataForm";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="first-part">
        <UseAvatar />
        <UpdateUserDataForm />
      </div>
      <div className="second-part">
        <UpdatePasswordForm />
      </div>
      <div className="buttons-dashboard">
        <NavLink to="/homepage">
          <button className="bck-to-store-button">بازگشت به فروشگاه</button>
        </NavLink>
        <div className="logout-button">
          <Logout />
        </div>
      </div>
    </div>
  );
}
