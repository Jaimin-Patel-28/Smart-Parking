import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";
import Dashboard from "../pages/user/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌐 PUBLIC PANEL */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔐 AUTH */}
      <Route path="/auth" element={<Auth />} />

      {/* 🧑 USER PANEL */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
