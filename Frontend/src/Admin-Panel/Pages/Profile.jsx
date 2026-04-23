import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Save,
  X,
  Loader,
  User,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import useAdminProfile from "../Profile/Hooks/useAdminProfile";

const Profile = () => {
  const navigate = useNavigate();
  const {
    profile,
    loading,
    updating,
    error,
    successMessage,
    handleUpdateProfile,
  } = useAdminProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleEditClick = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
        address: profile.address || "",
      });
      setFormErrors({});
      setIsEditing(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName?.trim()) errors.fullName = "Full name is required";
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (
      formData.mobile &&
      !/^\d{10,15}$/.test(formData.mobile.replace(/\D/g, ""))
    ) {
      errors.mobile = "Invalid phone number (10-15 digits)";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await handleUpdateProfile(formData);
      setIsEditing(false);
    } catch (err) {}
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
        <p className="text-[#FAF3E1]/40 text-xs font-bold uppercase tracking-widest">
          Loading Account...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 text-rose-400 text-center">
        <p className="font-medium">
          Failed to load profile. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      {/* 1. BACK NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Back
          </span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
            Account Settings
          </h2>
          <p className="text-[#FAF3E1]/40 text-sm mt-1">
            Manage your personal information and preferences.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="px-6 py-2.5 rounded-lg bg-[#FA8112] text-[#222222] text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#FA8112]/10"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* ALERT FEEDBACK */}
      {(error || successMessage) && (
        <div
          className={`p-4 rounded-lg border text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            successMessage
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/5 border-rose-500/20 text-rose-300"
          }`}
        >
          {successMessage ? <BadgeCheck size={18} /> : <X size={18} />}
          <span>{successMessage || error}</span>
        </div>
      )}

      {/* 2. PROFILE VIEW/EDIT MODE */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden shadow-2xl">
        {!isEditing ? (
          <div className="divide-y divide-[#F5E7C6]/5">
            {/* Hero Section */}
            <div className="p-8 flex flex-col md:flex-row gap-6 items-center md:items-start bg-[#FAF3E1]/2">
              <div className="h-24 w-24 rounded-2xl bg-[#FA8112]/10 border-2 border-[#FA8112]/20 flex items-center justify-center text-[#FA8112]">
                <User size={48} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h3 className="text-2xl font-bold text-[#FAF3E1]">
                  {profile.fullName}
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FA8112]/10 text-[#FA8112] text-[10px] font-bold uppercase border border-[#FA8112]/20">
                    <ShieldCheck size={12} /> {profile.role}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${
                      profile.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${profile.status === "active" ? "bg-emerald-400 pulse" : "bg-rose-400"}`}
                    />
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Email Address", val: profile.email, icon: Mail },
                {
                  label: "Mobile Number",
                  val: profile.mobile || "Not Linked",
                  icon: Phone,
                },
                {
                  label: "Resident Address",
                  val: profile.address || "No address provided",
                  icon: MapPin,
                  full: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.full ? "md:col-span-2" : ""} space-y-2`}
                >
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
                    <item.icon size={12} className="text-[#FA8112]" />{" "}
                    {item.label}
                  </p>
                  <p className="text-[#FAF3E1] font-medium text-sm">
                    {item.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Meta Data */}
            <div className="p-8 bg-[#FAF3E1]/2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 mb-1">
                  Assigned Parking
                </p>
                <p className="text-[#FAF3E1] font-semibold text-sm">
                  {profile.parking?.name || "Global Admin"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 mb-1">
                  Registration Date
                </p>
                <div className="flex items-center justify-end gap-2 text-[#FAF3E1] font-semibold text-sm">
                  <Calendar size={14} className="text-[#FA8112]" />
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EDIT MODE FORM */
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full h-12 rounded-lg bg-[#222] border ${formErrors.fullName ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all`}
                />
                {formErrors.fullName && (
                  <p className="text-rose-400 text-[10px] font-bold uppercase mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-12 rounded-lg bg-[#222] border ${formErrors.email ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all`}
                />
                {formErrors.email && (
                  <p className="text-rose-400 text-[10px] font-bold uppercase mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full h-12 rounded-lg bg-[#222] border ${formErrors.mobile ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all`}
                />
                {formErrors.mobile && (
                  <p className="text-rose-400 text-[10px] font-bold uppercase mt-1">
                    {formErrors.mobile}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                Resident Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 py-3 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#F5E7C6]/5">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 h-12 rounded-lg bg-[#FA8112] text-[#222222] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-[#FA8112]/10"
              >
                {updating ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={updating}
                className="flex-1 h-12 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/60 border border-[#F5E7C6]/10 text-[11px] font-bold uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
