import React from "react";
import { Eye, Trash2, ShieldCheck, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserStatusToggle from "./UserStatusToggle";

const UserTable = ({ users, onToggleStatus, onDelete, processingId }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-widest font-black">
            <th className="py-3 px-4">Profile</th>
            <th className="py-3 px-4">Contact</th>
            <th className="py-3 px-4">Bookings</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="bg-white hover:bg-slate-50 transition-all group shadow-sm rounded-xl"
            >
              <td className="py-4 px-4 rounded-l-2xl">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${user.role === "admin" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {user.role === "admin" ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      ID: {user._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <p className="text-sm font-medium text-slate-600">
                  {user.email}
                </p>
                <p className="text-xs text-slate-400">
                  {user.phone || "No Phone"}
                </p>
              </td>
              <td className="py-4 px-4">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-black border border-emerald-100">
                  {user.totalBookings} Slots
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${user.role === "admin" ? "text-indigo-600" : "text-slate-500"}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="py-4 px-4">
                <UserStatusToggle
                  status={user.status}
                  processing={processingId === user._id}
                  onToggle={() => onToggleStatus(user._id)}
                />
              </td>
              <td className="py-4 px-4 text-right rounded-r-2xl">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => navigate(`/admin/users/${user._id}`)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-all"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
