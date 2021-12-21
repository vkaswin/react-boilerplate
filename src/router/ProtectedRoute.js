import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ auth, component, name = false }) => {
  let token = localStorage.getItem("token");

  if (auth && token === null) return <Navigate replace to="/" />;

  if (name && name === "AuthLayout" && token !== null)
    return <Navigate replace to="/admin/dashboard" />;

  return component;
};
