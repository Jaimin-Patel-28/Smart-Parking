import React from "react";
import {
  Eye,
  Trash2,
  ShieldCheck,
  User as UserIcon,
  Fingerprint,
  Mail,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserStatusToggle from "./UserStatusToggle";

const UserTable = ({ users, onToggleStatus, onDelete, processingId }) => {
  const navigate = useNavigate();

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="overflow-x-auto custom-scrollbar bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-1.5 px-1">
        <thead>
          <tr className="text-[#FAF3E1]/20 text-[9px] uppercase font-bold tracking-[0.4em]">
            <th className="py-5 px-8">Entity Profile</th>
            <th className="py-5 px-6">Contact Registry</th>
            <th className="py-5 px-6">Utilization</th>
            <th className="py-5 px-6">Access Level</th>
            <th className="py-5 px-6">Node Status</th>
            <th className="py-5 px-8 text-right">Operations</th>
          </tr>
        </thead>

        <tbody className="space-y-2">
          {users.map((user) => (
            <tr
              key={user._id}
              className="group bg-[#FAF3E1]/[0.01] hover:bg-[#FAF3E1]/[0.03] transition-all duration-500 border-y border-[#F5E7C6]/5"
            >
              {/* 1. Entity Profile */}
              <td className="py-6 px-8 rounded-l-lg border-l border-[#F5E7C6]/5">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-500 border ${
                      user.role === "admin"
                        ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20 shadow-[0_0_15px_rgba(250,129,18,0.1)]"
                        : "bg-[#FAF3E1]/[0.02] text-[#FAF3E1]/20 border-[#F5E7C6]/5 group-hover:border-[#FAF3E1]/10"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <ShieldCheck size={18} strokeWidth={1.5} />
                    ) : (
                      <UserIcon size={18} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#FAF3E1] text-sm tracking-tight leading-none">
                      {user.fullName || user.name}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Fingerprint size={10} className="text-[#FA8112]" />
                      <p className="text-[10px] text-[#FAF3E1] font-mono tracking-widest uppercase">
                        UID-{String(user._id).slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              {/* 2. Contact Registry */}
              <td className="py-6 px-6">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#FAF3E1]/80">
                    <Mail size={12} className="text-[#FA8112]/40" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                    <Phone size={10} />
                    {user.mobile || user.phone || "UNREGISTERED"}
                  </div>
                </div>
              </td>

              {/* 3. Utilization (Bookings) */}
              <td className="py-6 px-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 group-hover:border-[#FA8112]/20 transition-colors">
                  <span className="text-sm font-bold text-[#FAF3E1] tabular-nums">
                    {user.totalBookings}
                  </span>
                  <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                    Units
                  </span>
                </div>
              </td>

              {/* 4. Access Level */}
              <td className="py-6 px-6">
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                    user.role === "admin"
                      ? "text-[#FA8112]"
                      : "text-[#FAF3E1]/10 group-hover:text-[#FAF3E1]/30"
                  }`}
                >
                  {user.role === "admin" ? "Privileged" : "Standard"}
                </span>
              </td>

              {/* 5. Node Status */}
              <td className="py-6 px-6">
                <UserStatusToggle
                  status={user.status}
                  processing={processingId === user._id}
                  onToggle={() => onToggleStatus(user._id)}
                />
              </td>

              {/* 6. Operations */}
              <td className="py-6 px-8 text-right rounded-r-lg border-r border-[#F5E7C6]/5">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => navigate(`/super-admin/users/${user._id}`)}
                    className="p-2 rounded-md bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all"
                    title="Inspect Profile"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="p-2 rounded-md bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-rose-500 hover:border-rose-500/20 transition-all"
                    title="Purge Identity"
                  >
                    <Trash2 size={14} />
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
