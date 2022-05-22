import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils";

export const ProtectedRoute = ({
  isAuthenticated,
  component,
  isAuthPage = false,
}) => {
  const token = getCookie("authToken");

  if (isAuthenticated && token === null) return <Navigate replace to="/" />;

  if (isAuthPage && token !== null)
    return <Navigate replace to="/admin/dashboard" />;

  return component;
};
