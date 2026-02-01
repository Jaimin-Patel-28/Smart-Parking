import UserSidebar from "../components/sidebar/UserSidebar";

const UserLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <UserSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default UserLayout;
