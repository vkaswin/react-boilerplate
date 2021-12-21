import React from "react";
import { Outlet } from "react-router-dom";

import "./AuthLayout.scss";

const AuthLayout = () => {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
