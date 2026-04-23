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
  BarChart3,
  LifeBuoy,
  Wallet,
  Fingerprint,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProfile } from "../Hooks/useProfile";

const Profile = () => {
  const { profile, loading, saving, error, fetchProfile, saveProfile } =
    useProfile();
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
      toast.success("Identity Manifest Updated");
    } else {
      toast.error(result.message || "Protocol Failure: Update Blocked");
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <RefreshCw
          className="h-10 w-10 animate-spin text-[#FA8112]/40"
          strokeWidth={1}
        />
        <p className="font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em] text-[9px]">
          Decrypting Identity Matrix...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. PROFILE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Fingerprint size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Personal Registry
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Super Admin <span className="text-[#FA8112]">Profile</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
            Identity, contact parameters, and platform ownership context.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProfile}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-widest hover:text-[#FA8112] transition-all active:scale-95"
          >
            <RefreshCw size={14} /> Resync
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-2.5 rounded-lg bg-[#FA8112] text-[#222222] text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-[#FAF3E1] transition-all active:scale-95 shadow-xl shadow-[#FA8112]/5"
          >
            {saving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Commiting..." : "Update Identity"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          Critical Sync Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT COLUMN: STATIC INFO */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 text-[#FA8112]/[0.03] group-hover:text-[#FA8112]/[0.05] transition-colors duration-700">
              <Shield size={120} strokeWidth={1} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="h-16 w-16 rounded-lg bg-[#FA8112]/5 border border-[#FA8112]/10 text-[#FA8112] flex items-center justify-center shadow-[0_0_20px_rgba(250,129,18,0.05)]">
                <UserRound size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#FAF3E1] tracking-tight uppercase">
                  {profile?.fullName || "Registry Subject"}
                </h2>
                <p className="text-[11px] font-mono text-[#FAF3E1]/40 tracking-wider italic">
                  {profile?.email || "-"}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FA8112]/5 border border-[#FA8112]/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8112]">
                <Activity size={12} className="animate-pulse" />
                Root Privilege Mode
              </div>

              <div className="pt-6 border-t border-[#F5E7C6]/5 space-y-4">
                <p className="text-[9px] text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Calendar size={12} className="text-[#FA8112]/40" />
                  Initialized:{" "}
                  <span className="text-[#FAF3E1]/40 tabular-nums">
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </p>
                <p className="text-[9px] text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Fingerprint size={12} className="text-[#FA8112]/40" />
                  Logic State:{" "}
                  <span className="text-[#FA8112]">
                    {profile?.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 space-y-6">
            <h3 className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] ml-1">
              Internal Shortcuts
            </h3>
            <div className="space-y-3">
              {[
                {
                  to: "/super-admin/reports",
                  icon: BarChart3,
                  label: "Analytics",
                },
                {
                  to: "/super-admin/wallet",
                  icon: Wallet,
                  label: "Financials",
                },
                {
                  to: "/super-admin/support",
                  icon: LifeBuoy,
                  label: "Help Desk",
                },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between px-5 py-3.5 rounded-lg bg-[#1a1a1a] border border-[#F5E7C6]/5 text-[#FAF3E1]/40 hover:border-[#FA8112]/30 hover:text-[#FA8112] transition-all group/link"
                >
                  <span className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-colors">
                    <link.icon size={14} strokeWidth={2} /> {link.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform opacity-20"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EDITABLE FIELDS */}
        <div className="xl:col-span-2 bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <h3 className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.4em] mb-10 pb-4 border-b border-[#F5E7C6]/5">
            Identity Configuration Console
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-2">
                <UserRound size={12} className="text-[#FA8112]/40" /> Registry
                Name
              </span>
              <input
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all uppercase tracking-wider font-medium"
                placeholder="INPUT_SUBJECT_NAME"
              />
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-2">
                <Mail size={12} className="text-[#FA8112]/40" /> Locked
                Credential
              </span>
              <div className="w-full bg-[#1a1a1a]/50 border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-sm text-[#FAF3E1]/20 font-mono italic select-none">
                {profile?.email || "SYNC_ERR"}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-2">
                <Phone size={12} className="text-[#FA8112]/40" /> Contact
                Terminal
              </span>
              <input
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all font-mono tracking-tighter"
                placeholder="+91-XXXXX-XXXXX"
              />
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-2">
                <Car size={12} className="text-[#FA8112]/40" /> Authorized
                Vehicle
              </span>
              <input
                value={formData.vehicleNumber}
                onChange={(e) =>
                  handleChange("vehicleNumber", e.target.value.toUpperCase())
                }
                className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all font-mono tracking-widest"
                placeholder="PLATE_ID_XXXX"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-2">
                <MapPin size={12} className="text-[#FA8112]/40" /> Physical Node
                Address
              </span>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full min-h-[140px] bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg px-5 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all font-medium resize-none"
                placeholder="INPUT_PHYSICAL_LOCATION_DETAILS..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
