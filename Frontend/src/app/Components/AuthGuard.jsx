import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";

const AuthGuard = ({ children }) => {
  const { user, token } = useAuth();

  // If user is authenticated, redirect to appropriate dashboard
  if (token && user) {
    if (user.role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    } else if (user.role === "super-admin") {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // If not authenticated, allow access to auth routes
  return children;
};

export default AuthGuard;
