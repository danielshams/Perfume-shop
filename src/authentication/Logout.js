import React from "react";
import useLogout from "./useLogout";
import "./Logout.css";

export default function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <button className="logout" disabled={isLoading} onClick={logout}>
      خروج از حساب کاربری{" "}
    </button>
  );
}
