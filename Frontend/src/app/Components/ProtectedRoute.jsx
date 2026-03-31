import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  // If no token, redirect to auth
  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user data is not loaded yet, show loading
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#222222] text-[#FAF3E1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA8112] mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    if (user.role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    } else if (user.role === "admin" || user.role === "super-admin") {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;