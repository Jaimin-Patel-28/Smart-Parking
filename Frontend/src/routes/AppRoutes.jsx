import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/user/Dashboard";
import ProfilePage from "../pages/user/ProfilePage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import FindParking from "../pages/user/FindParking";
import WalletHub from "../pages/user/WalletHub";
import ActiveBookings from "../pages/user/Mybookings/ActiveBookings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 PUBLIC PANEL */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
      </Route>

      {/* 🔐 USER PANEL */}
      <Route path="/user" element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          {/* 👇 THIS IS IMPORTANT */}
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="bookings">
            <Route index element={<MyBookingsPage />} />
            <Route path="edit-session" element={<ActiveBookings />} />
          </Route>

          <Route path="find-parking" element={<FindParking />} />
          <Route path="wallet" element={<WalletHub />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
