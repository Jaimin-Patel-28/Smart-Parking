import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../../Authentication-UI/Pages/Login";
import Register from "../../Authentication-UI/Pages/Register";
import VerifyOTP from "../../Authentication-UI/Pages/VerifyOTP";
import ForgotPassword from "../../Authentication-UI/Pages/ForgotPassword";
import ResetPassword from "../../Authentication-UI/Pages/ResetPassword";

const AuthRoutes = () => {
  return (
    <div className="min-h-screen bg-[#222222] selection:bg-[#FA8112] selection:text-[#222222]">
      {/* Main Container: Ensures all auth forms are centered 
          and responsive across all device sizes.
      */}
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12">
        <div className="w-full">
          <Routes>
            {/* Redirect /auth to /auth/login */}
            <Route path="/" element={<Navigate to="login" replace />} />

            {/* Authentication Flow Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<VerifyOTP />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* Catch-all for misspelled auth links */}
            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
