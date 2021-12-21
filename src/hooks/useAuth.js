import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  let [user, setUser] = useState(false);

  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      setUser(jwt_decode(token));
    }
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    setUser,
  };
};
