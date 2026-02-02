import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/sidebar/UserSidebar";

const SIDEBAR_WIDTH = 260; // px

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: isSidebarOpen ? SIDEBAR_WIDTH : 80,
          transition: "width 0.3s ease",
          flexShrink: 0,
        }}
      >
        <UserSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>

      {/* MAIN CONTENT */}
      <main
        style={{
          flexGrow: 1,
          padding: "24px",
          transition: "margin 0.3s ease",
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
