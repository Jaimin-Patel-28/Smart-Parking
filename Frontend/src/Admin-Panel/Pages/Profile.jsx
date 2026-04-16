import { useState } from "react";
import { Mail, Phone, MapPin, Save, X, Loader } from "lucide-react";
import useAdminProfile from "../Profile/Hooks/useAdminProfile";

const Profile = () => {
  const { profile, loading, updating, error, successMessage, handleUpdateProfile } = useAdminProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Initialize form data when profile loads
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

    if (!formData.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.mobile && !/^\d{10,15}$/.test(formData.mobile.replace(/\D/g, ""))) {
      errors.mobile = "Invalid phone number (10-15 digits)";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
    } catch (err) {
      // Error is already set in hook
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400">
        <p>Failed to load profile. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#FAF3E1]">Admin Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="px-4 py-2 rounded-xl bg-[#FA8112] text-[#222222] text-sm font-black uppercase tracking-widest hover:bg-[#FA8112]/90 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-400 flex items-center gap-3">
          <X className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-400">
          {successMessage}
        </div>
      )}

      {/* View Mode */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-wider">Full Name</p>
                <p className="text-[#FAF3E1] text-xl font-semibold">{profile.fullName}</p>
              </div>
            </div>

            <hr className="border-[#F5E7C6]/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-wider">Role</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FA8112]" />
                  <p className="text-[#FAF3E1] capitalize font-medium">{profile.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${profile.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                  <p className="text-[#FAF3E1] capitalize font-medium">{profile.status}</p>
                </div>
              </div>
            </div>

            <hr className="border-[#F5E7C6]/10" />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FAF3E1]/50 text-sm uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="text-[#FAF3E1] font-medium">{profile.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FAF3E1]/50 text-sm uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                Mobile
              </div>
              <p className="text-[#FAF3E1] font-medium">{profile.mobile || "Not provided"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FAF3E1]/50 text-sm uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Address
              </div>
              <p className="text-[#FAF3E1] font-medium">{profile.address || "Not provided"}</p>
            </div>

            <hr className="border-[#F5E7C6]/10" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#FAF3E1]/50 uppercase tracking-wider">Parking</p>
                <p className="text-[#FAF3E1] font-medium mt-1">{profile.parking?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[#FAF3E1]/50 uppercase tracking-wider">Member Since</p>
                <p className="text-[#FAF3E1] font-medium mt-1">
                  {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-wider">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full h-11 rounded-xl bg-[#222222] border ${formErrors.fullName ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] placeholder-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112] transition`}
            />
            {formErrors.fullName && <p className="text-rose-400 text-xs">{formErrors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-wider">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full h-11 rounded-xl bg-[#222222] border ${formErrors.email ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] placeholder-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112] transition`}
            />
            {formErrors.email && <p className="text-rose-400 text-xs">{formErrors.email}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-wider">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`w-full h-11 rounded-xl bg-[#222222] border ${formErrors.mobile ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 text-[#FAF3E1] placeholder-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112] transition`}
            />
            {formErrors.mobile && <p className="text-rose-400 text-xs">{formErrors.mobile}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-wider">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows="3"
              className={`w-full rounded-xl bg-[#222222] border ${formErrors.address ? "border-rose-500" : "border-[#F5E7C6]/10"} px-4 py-3 text-[#FAF3E1] placeholder-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112] transition resize-none`}
            />
            {formErrors.address && <p className="text-rose-400 text-xs">{formErrors.address}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 h-11 rounded-xl bg-[#FA8112] text-[#222222] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FA8112]/90 disabled:opacity-50 transition"
            >
              {updating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormErrors({});
              }}
              disabled={updating}
              className="flex-1 h-11 rounded-xl bg-[#FAF3E1]/10 text-[#FAF3E1] text-sm font-black uppercase tracking-widest border border-[#F5E7C6]/10 hover:bg-[#FAF3E1]/20 disabled:opacity-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
