import React, { useEffect, useState } from "react";
import {
  UserRound,
  Shield,
  Mail,
  Phone,
  Car,
  MapPin,
  Calendar,
  Save,
  RefreshCw,
  ArrowRight,
  Settings,
  BarChart3,
  LifeBuoy,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfile } from "../Hooks/useProfile";

const Profile = () => {
  const { profile, loading, saving, error, fetchProfile, saveProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    vehicleNumber: "",
  });

  useEffect(() => {
    if (!profile) return;
    setFormData({
      fullName: profile.fullName || profile.name || "",
      mobile: profile.mobile || profile.phone || "",
      address: profile.address || "",
      vehicleNumber: profile.vehicleNumber || "",
    });
  }, [profile]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const result = await saveProfile(formData);
    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <RefreshCw className="h-10 w-10 animate-spin text-[#FA8112]" />
        <p className="font-black text-[#FAF3E1]/30 uppercase tracking-[0.3em] text-[10px]">
          Loading Profile Matrix...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
            Super Admin <span className="text-[#FA8112]">Profile</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Identity, contact, and platform ownership context
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProfile}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 text-[#FAF3E1] text-[10px] font-black uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-colors"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FA8112] text-[#222222] text-[10px] font-black uppercase tracking-widest disabled:opacity-50 hover:bg-[#FAF3E1] transition-colors"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-200 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-6">
            <div className="h-16 w-16 rounded-2xl bg-[#FA8112]/20 text-[#FA8112] flex items-center justify-center mb-4">
              <UserRound size={30} />
            </div>
            <h2 className="text-xl font-black text-[#FAF3E1] tracking-tight">
              {profile?.fullName || "Super Admin"}
            </h2>
            <p className="text-sm text-[#FAF3E1]/70 mt-1">{profile?.email || "-"}</p>
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#FAF3E1]/70 mt-3">
              <Shield size={14} className="text-[#FA8112]" />
              {profile?.role || "super-admin"}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#F5E7C6]/10 pt-4">
              <p className="text-[10px] text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-[#FA8112]" />
                Created: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-"}
              </p>
              <p className="text-[10px] text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-[#FA8112]" />
                Updated: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "-"}
              </p>
              <p className="text-[10px] text-[#FAF3E1]/45 uppercase tracking-widest">
                Status: <span className="text-[#FA8112]">{profile?.status || "active"}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-6">
            <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/super-admin/settings"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 text-[#FAF3E1] hover:border-[#FA8112]/40 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Settings size={15} className="text-[#FA8112]" /> Settings
                </span>
                <ArrowRight size={14} className="text-[#FAF3E1]/40" />
              </Link>
              <Link
                to="/super-admin/reports"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 text-[#FAF3E1] hover:border-[#FA8112]/40 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <BarChart3 size={15} className="text-[#FA8112]" /> Reports
                </span>
                <ArrowRight size={14} className="text-[#FAF3E1]/40" />
              </Link>
              <Link
                to="/super-admin/wallet"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 text-[#FAF3E1] hover:border-[#FA8112]/40 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Wallet size={15} className="text-[#FA8112]" /> Wallet
                </span>
                <ArrowRight size={14} className="text-[#FAF3E1]/40" />
              </Link>
              <Link
                to="/super-admin/support"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 text-[#FAF3E1] hover:border-[#FA8112]/40 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <LifeBuoy size={15} className="text-[#FA8112]" /> Support
                </span>
                <ArrowRight size={14} className="text-[#FAF3E1]/40" />
              </Link>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-6 md:p-8">
          <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest mb-6">
            Editable Profile Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-[10px] font-black text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <UserRound size={12} className="text-[#FA8112]" /> Full Name
              </span>
              <input
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/60"
                placeholder="Enter full name"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[10px] font-black text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <Mail size={12} className="text-[#FA8112]" /> Email (Read only)
              </span>
              <input
                value={profile?.email || ""}
                disabled
                className="w-full bg-[#222222]/60 border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1]/60 cursor-not-allowed"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[10px] font-black text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <Phone size={12} className="text-[#FA8112]" /> Mobile
              </span>
              <input
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/60"
                placeholder="Enter mobile number"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[10px] font-black text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <Car size={12} className="text-[#FA8112]" /> Vehicle Number
              </span>
              <input
                value={formData.vehicleNumber}
                onChange={(e) => handleChange("vehicleNumber", e.target.value.toUpperCase())}
                className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/60"
                placeholder="Enter vehicle number"
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-[10px] font-black text-[#FAF3E1]/45 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-[#FA8112]" /> Address
              </span>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full min-h-30 bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/60"
                placeholder="Enter address"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
