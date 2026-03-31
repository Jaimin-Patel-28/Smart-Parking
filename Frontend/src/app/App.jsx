import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Route Imports
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes"; // Updated path
import AdminRoutes from "./Routes/AdminRoutes";
import PublicRoutes from "./Routes/PublicRoutes"; // Updated path
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthGuard from "./Components/AuthGuard";

const App = () => {
  return (
    <>
      <Routes>
        {/* 1. Authentication Module - Public but redirects if authenticated */}
        <Route
          path="/auth/*"
          element={
            <AuthGuard>
              <AuthRoutes />
            </AuthGuard>
          }
        />

        {/* 2. User Panel Module - Protected for users only */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserRoutes />
            </ProtectedRoute>
          }
        />

        {/* 3. Admin / Super Admin Module - Protected for admins and super-admins */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* 4. Public Panel Module - Public */}
        <Route path="/public/*" element={<PublicRoutes />} />

        {/* 5. Root Redirect Logic */}
        <Route path="/" element={<Navigate to="/public/home" replace />} />

        {/* 6. Catch-all for unmatched routes */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center bg-[#222222] text-[#FAF3E1]">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-[#FA8112]">404</h1>
                <p className="mt-2 opacity-60">Page Not Found</p>
              </div>
            </div>
          }
        />
      </Routes>

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#FAF3E1",
            border: "1px solid rgba(245, 231, 198, 0.1)",
          },
        }}
      />
    </>
  );
};

export default App;
