import React from "react";
import { Eye, Trash2, ShieldCheck, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserStatusToggle from "./UserStatusToggle";

const UserTable = ({ users, onToggleStatus, onDelete, processingId }) => {
  const navigate = useNavigate();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="overflow-x-auto bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black px-4">
            <th className="py-4 px-6">Profile</th>
            <th className="py-4 px-6">Contact</th>
            <th className="py-4 px-6">Bookings</th>
            <th className="py-4 px-6">Role</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="bg-[#FAF3E1]/2 hover:bg-[#FAF3E1]/4 transition-all duration-300 group border border-[#F5E7C6]/10 shadow-sm"
            >
              {/* Profile Section */}
              <td className="py-5 px-6 rounded-l-3xl">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors border ${
                      user.role === "admin"
                        ? "bg-[#FA8112]/20 text-[#FA8112] border-[#FA8112]/20"
                        : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/5"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <UserIcon size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-[#FAF3E1] text-sm tracking-tight">
                      {user.fullName || user.name}
                    </p>
                    <p className="text-[10px] text-[#FAF3E1]/20 font-mono tracking-widest mt-0.5">
                      UID: {String(user._id).slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>
              </td>

              {/* Contact Information */}
              <td className="py-5 px-6">
                <p className="text-sm font-bold text-[#FAF3E1]/80">
                  {user.email}
                </p>
                <p className="text-[10px] font-black text-[#FAF3E1]/30 uppercase tracking-tighter mt-1">
                  {user.mobile || user.phone || "No Registry"}
                </p>
              </td>

              {/* Bookings Count */}
              <td className="py-5 px-6">
                <span className="bg-[#FA8112]/10 text-[#FA8112] px-3 py-1.5 rounded-lg text-[10px] font-black border border-[#FA8112]/20 uppercase tracking-widest shadow-[0_0_10px_rgba(250,129,18,0.05)]">
                  {user.totalBookings} Active Slots
                </span>
              </td>

              {/* User Role */}
              <td className="py-5 px-6">
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                    user.role === "admin"
                      ? "text-[#FA8112]"
                      : "text-[#FAF3E1]/30"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* User Status */}
              <td className="py-5 px-6">
                <UserStatusToggle
                  status={user.status}
                  processing={processingId === user._id}
                  onToggle={() => onToggleStatus(user._id)}
                />
              </td>

              {/* Action Buttons */}
              <td className="py-5 px-6 text-right rounded-r-3xl">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => navigate(`/super-admin/users/${user._id}`)}
                    className="p-2.5 bg-[#FAF3E1]/5 hover:bg-[#FA8112] text-[#FAF3E1]/20 hover:text-[#222222] rounded-xl transition-all border border-[#F5E7C6]/5"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2.5 bg-[#FAF3E1]/5 hover:bg-rose-500/20 text-[#FAF3E1]/20 hover:text-rose-400 rounded-xl transition-all border border-[#F5E7C6]/5"
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
