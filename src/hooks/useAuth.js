import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "./useCookies";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  let [user, setUser] = useState(false);

  let [isLoading, setIsLoading] = useState(true);

  let { clearCookie, getCookie } = useCookies();

  useEffect(() => {
    let token = getCookie("authToken");
    if (token !== null) {
      setUser(jwt_decode(token));
    }
    setIsLoading(false);
  }, []);

  const onLogout = () => {
    clearCookie("authToken");
    window.location.href = "/auth/sign-in";
  };

  return {
    user,
    isLoading,
    setUser,
    onLogout,
  };
};
