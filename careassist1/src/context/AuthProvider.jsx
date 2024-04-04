import { createContext, useState } from "react";
import React from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    userId: 0,
  });

  const logout = () => {
    setAuth({ user: null, accessToken: null, userId: 0 });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
