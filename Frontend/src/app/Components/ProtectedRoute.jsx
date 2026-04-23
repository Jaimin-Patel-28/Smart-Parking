import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  // If no token, redirect to auth
  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // REFINED: Professional Loading State
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#222222] antialiased">
        <div className="flex flex-col items-center gap-4">
          {/* Custom Spinner: Subtle ring with a glowing accent */}
          <div className="relative flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-[#FAF3E1]/5"></div>
            <Loader2
              className="absolute h-12 w-12 text-[#FA8112] animate-spin"
              strokeWidth={1.5}
            />
          </div>

          <div className="text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FA8112] animate-pulse">
              Authenticating
            </p>
            <p className="text-[11px] text-[#FAF3E1]/20 font-medium">
              Verifying secure session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Logic remains identical to preserve your application flow
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (user.role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    } else if (user.role === "super-admin") {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
