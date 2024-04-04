import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const RequireAuth = () => {
  // const { auth } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const getAccessToken = () => {
    return auth?.accessToken || "";
  };

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location, accessToken: getAccessToken() }}
      replace
    />
  );
};
