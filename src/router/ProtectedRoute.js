import React from "react";
import { Navigate } from "react-router";
import { useCookies } from "hooks";

export const ProtectedRoute = ({
  isAuthenticated,
  component,
  isAuthPage = false,
}) => {
  const { getCookie } = useCookies();

  const token = getCookie("authToken");

  if (isAuthenticated && token === null) return <Navigate replace to="/" />;

  if (isAuthPage && token !== null)
    return <Navigate replace to="/admin/dashboard" />;

  return component;
};
