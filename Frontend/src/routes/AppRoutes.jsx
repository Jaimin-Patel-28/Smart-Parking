import { Routes, Route } from "react-router-dom";

//layouts
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

//public
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";

//user
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/user/Dashboard";
import ProfilePage from "../pages/user/ProfilePage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import FindParking from "../pages/user/FindParking";
import WalletHub from "../pages/user/WalletHub";
import ActiveBookings from "../pages/user/Mybookings/ActiveBookings";
import Notifications from "../pages/user/Notifications";
import BookingHistory from "../pages/user/Mybookings/BookingHistory";
import HelpCenter from "../pages/user/HelpCenter";


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
            <Route path="history" element={<BookingHistory />} />
          </Route>

          <Route path="find-parking">
            <Route index element={<FindParking/>}/>
          </Route>

          <Route path="wallet">
            <Route index element={<WalletHub/>}/>
          </Route>

          <Route path="notifications">
            <Route index element={<Notifications/>}/>
          </Route>
          <Route path="help">
            <Route index element={<HelpCenter/>}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
