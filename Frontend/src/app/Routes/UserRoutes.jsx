import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../../User-Panel/Layout/UserLayout";

// Lazy Load Pages
const FindParking = lazy(
  () => import("../../User-Panel/Parking/Pages/FindParking"),
);
const ParkingDetails = lazy(
  () => import("../../User-Panel/Parking/Pages/ParkingDetails"),
);
const BookingPreview = lazy(
  () => import("../../User-Panel/Parking/Pages/BookingPreview"),
);
const BookingSuccess = lazy(
  () => import("../../User-Panel/Parking/Pages/BookingSuccess"),
);
const Profile = lazy(() => import("../../User-Panel/Profile/Pages/Profile"));

// Placeholders
const Dashboard = lazy(
  () => import("../../User-Panel/Dashboard/Pages/Dashboard"),
);
const MyBookings = lazy(
  () => import("../../User-Panel/MyBookings/Pages/MyBookings"),
);
const BookingHistory = lazy(
  () => import("../../User-Panel/Parking/Pages/BookingHistory"),
);
const BookingDetails = lazy(
  () => import("../../User-Panel/MyBookings/Pages/BookingDetails"),
);
const Wallet = lazy(() => import("../../User-Panel/Wallet/Pages/Wallet"));
const Notifications = lazy(
  () => import("../../User-Panel/Notifications/Pages/Notifications"),
);
const Support = lazy(() => import("../../User-Panel/Support/Pages/Support"));

const UserRoutes = () => {
  return (
    <UserLayout>
      <Suspense
        fallback={<div className="p-10 text-[#FA8112]">Loading...</div>}
      >
        <Routes>
          {/* Default Path: Notice we use the full absolute path to prevent loops */}
          <Route path="/" element={<Navigate to="/user/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="find-parking" element={<FindParking />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="booking-history" element={<BookingHistory />} />
          <Route path="bookings/:id" element={<BookingDetails />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="support" element={<Support />} />

          {/* Parking Journey */}
          <Route path="parking/:id" element={<ParkingDetails />} />
          <Route path="parking/preview" element={<BookingPreview />} />
          <Route path="parking/success" element={<BookingSuccess />} />
          <Route path="profile" element={<Profile />} />

          {/* CRITICAL: Catch-all should point back to a safe, existing route using absolute path */}
          <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
        </Routes>
      </Suspense>
    </UserLayout>
  );
};

export default UserRoutes;
