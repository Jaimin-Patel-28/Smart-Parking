import { Link } from "react-router-dom";

const AdminHeader = () => {
  const today = new Date().toLocaleDateString();

  return (
    <header className="bg-emerald-100 shadow px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg text-gray-600 font-semibold">Admin Panel</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      <div className="flex text-gray-600 items-center space-x-4">
        <Link to="/admin/profile" className="text-gray-600">
          Profile
        </Link>

        <Link to="/admin/logout" className="text-gray-600">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
