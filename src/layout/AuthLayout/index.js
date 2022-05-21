import React from "react";
import { Outlet } from "react-router-dom";

import authBack from "assets/images/login.svg";

import "./AuthLayout.scss";

const AuthLayout = () => {
  return (
    <div className="authLayout">
      <div className="row">
        <div className="col-md-8">
          <div className="auth-left">
            <div className="auth-logo">
              <span>React App</span>
            </div>
            <div className="auth-img">
              <img src={authBack} alt="sign-in" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="auth-right">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
