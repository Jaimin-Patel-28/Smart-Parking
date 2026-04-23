import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  User as UserIcon,
  Save,
  CheckCircle2,
  Fingerprint,
  Activity,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { userService } from "../Services/userService";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(id);
        const userData = res.data;
        setUser(userData);
        setFormData({
          ...userData,
          fullName: userData.fullName || userData.name || "",
          mobile: userData.mobile || userData.phone || "",
        });
      } catch (err) {
        console.error("Registry Sync Failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await userService.updateUser(id, formData);
      setUser(res.data);
      setIsEditing(false);
      toast.success("Identity Sequence Synchronized");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Protocol Failure: Update Blocked",
      );
    }
  };

  if (loading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Activity
            size={40}
            className="animate-pulse text-[#FA8112]/40"
            strokeWidth={1}
          />
          <div className="absolute inset-0 border border-[#FA8112]/10 rounded-full animate-ping" />
        </div>
        <p className="font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em] text-[9px]">
          Accessing User Registry...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. COMMAND HEADER */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-[#FAF3E1]/20 hover:text-[#FA8112] font-bold uppercase tracking-[0.3em] text-[10px] transition-all group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Entity Directory
        </button>

        <button
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
          className={`flex items-center gap-3 px-8 py-2.5 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl active:scale-[0.98] ${
            isEditing
              ? "bg-[#FA8112] text-[#222222] shadow-[#FA8112]/10"
              : "bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:text-[#FA8112] hover:border-[#FA8112]/20"
          }`}
        >
          {isEditing ? (
            <>
              <Save size={14} /> Commit Changes
            </>
          ) : (
            "Modify Profile"
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 2. ENTITY OVERVIEW CARD */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 p-10 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 text-[#FA8112]/[0.02] group-hover:text-[#FA8112]/[0.05] transition-colors duration-700">
              <Fingerprint size={180} strokeWidth={1} />
            </div>

            <div
              className={`h-24 w-24 mx-auto rounded-xl flex items-center justify-center mb-8 border transition-all duration-500 ${
                user.role === "admin"
                  ? "bg-[#FA8112]/5 text-[#FA8112] border-[#FA8112]/20 shadow-[0_0_20px_rgba(250,129,18,0.1)]"
                  : "bg-[#FAF3E1]/[0.02] text-[#FAF3E1]/10 border-[#F5E7C6]/5"
              }`}
            >
              {user.role === "admin" ? (
                <ShieldCheck size={40} strokeWidth={1} />
              ) : (
                <UserIcon size={40} strokeWidth={1} />
              )}
            </div>

            <h2 className="text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
              {user.fullName || user.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-1 w-1 rounded-full bg-[#FA8112]/40" />
              <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
                System {user.role}
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-[#F5E7C6]/5 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-[#FAF3E1] tracking-tighter tabular-nums">
                  {user.totalBookings}
                </p>
                <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                  Bookings
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  {user.status === "active" ? (
                    <div className="relative flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
                      <CheckCircle2
                        className="relative text-emerald-500"
                        size={24}
                      />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-[#FAF3E1]/5 border border-dashed border-[#FAF3E1]/20" />
                  )}
                </div>
                <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                  Node Status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACCOUNT INTELLIGENCE CONSOLE */}
        <div className="lg:col-span-2">
          <div className="bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 shadow-2xl overflow-hidden h-full">
            <div className="p-8 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-[0.4em] flex items-center gap-3">
                <Terminal size={14} className="text-[#FA8112]" />
                Identity Configuration
              </h3>
              <span className="text-[9px] font-mono text-[#FAF3E1]/10">
                UID_{String(user._id).slice(-8).toUpperCase()}
              </span>
            </div>

            <div className="p-10 grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {/* Name Input */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.3em] ml-1">
                  Entity Label
                </label>
                {isEditing ? (
                  <input
                    className="w-full px-5 py-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1] focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] outline-none transition-all text-sm font-medium"
                    value={formData.fullName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                ) : (
                  <p className="px-5 py-3 text-sm font-bold text-[#FAF3E1] bg-[#FAF3E1]/[0.02] rounded-lg border border-transparent flex items-center gap-3 italic">
                    {user.fullName || user.name}
                  </p>
                )}
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] ml-1">
                  Digital Signature
                </label>
                <div className="px-5 py-3 bg-[#1a1a1a]/50 border border-[#F5E7C6]/5 rounded-lg flex items-center gap-3 text-sm font-mono text-[#FAF3E1]/40">
                  <Mail size={14} className="text-[#FA8112]/20" /> {user.email}
                </div>
              </div>

              {/* Mobile Input */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.3em] ml-1">
                  Contact Terminal
                </label>
                {isEditing ? (
                  <input
                    className="w-full px-5 py-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1] focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] outline-none transition-all text-sm font-mono"
                    value={formData.mobile || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                ) : (
                  <p className="px-5 py-3 text-sm font-mono text-[#FAF3E1]/80 bg-[#FAF3E1]/[0.02] rounded-lg flex items-center gap-3">
                    <Phone size={14} className="text-[#FA8112]/20" />{" "}
                    {user.mobile || user.phone || "NODE_UNSET"}
                  </p>
                )}
              </div>

              {/* Role Select */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.3em] ml-1">
                  Privilege Class
                </label>
                {isEditing ? (
                  <div className="relative">
                    <select
                      className="w-full px-5 py-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1] outline-none focus:border-[#FA8112]/40 appearance-none cursor-pointer text-sm font-bold uppercase tracking-widest"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="user">Standard_Access</option>
                      <option value="admin">Administrator_Node</option>
                    </select>
                  </div>
                ) : (
                  <div className="px-5 py-3 rounded-lg bg-[#FA8112]/5 border border-[#FA8112]/10 flex items-center gap-3">
                    <ShieldCheck size={14} className="text-[#FA8112]" />
                    <p className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.2em]">
                      {user.role}
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER METADATA */}
              <div className="sm:col-span-2 pt-10 border-t border-[#F5E7C6]/5 flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-3 opacity-20">
                  <Calendar size={14} className="text-[#FA8112]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
                    Registry_Init:{" "}
                    <span className="text-[#FAF3E1] tabular-nums">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-20">
                  <Activity size={14} className="text-[#FA8112]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
                    Log_Update:{" "}
                    <span className="text-[#FAF3E1] tabular-nums">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
