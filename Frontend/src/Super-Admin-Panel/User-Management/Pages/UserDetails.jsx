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
} from "lucide-react";
import { userService } from "../Services/userService";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(id);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
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
      alert("User profile updated successfully!");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center font-bold text-slate-400 animate-pulse">
        Loading User Profile...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Directory
        </button>
        <button
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
            isEditing
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {isEditing ? (
            <>
              <Save size={18} /> Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Card: Profile Overview */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 text-center shadow-sm">
            <div
              className={`h-24 w-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                user.role === "admin"
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              {user.role === "admin" ? (
                <Shield size={40} />
              ) : (
                <UserIcon size={40} />
              )}
            </div>
            <h2 className="text-xl font-black text-slate-800">{user.name}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {user.role}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex justify-around">
              <div>
                <p className="text-2xl font-black text-slate-800">
                  {user.totalBookings}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Bookings
                </p>
              </div>
              <div>
                <p
                  className={`text-2xl font-black ${user.status === "active" ? "text-emerald-500" : "text-slate-400"}`}
                >
                  {user.status === "active" ? (
                    <CheckCircle2 className="mx-auto" />
                  ) : (
                    "••"
                  )}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Detailed Information */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">
                Account Details
              </h3>
            </div>

            <div className="p-8 grid sm:grid-cols-2 gap-8">
              {/* Field: Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-bold text-slate-700 flex items-center gap-2">
                    <UserIcon size={16} className="text-slate-300" />{" "}
                    {user.name}
                  </p>
                )}
              </div>

              {/* Field: Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">
                  Email Address
                </label>
                <p className="font-bold text-slate-700 flex items-center gap-2">
                  <Mail size={16} className="text-slate-300" /> {user.email}
                </p>
              </div>

              {/* Field: Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-bold text-slate-700 flex items-center gap-2">
                    <Phone size={16} className="text-slate-300" />{" "}
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Field: Role Toggle */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">
                  System Role
                </label>
                {isEditing ? (
                  <select
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                ) : (
                  <p className="font-bold text-slate-700 flex items-center gap-2">
                    <Shield size={16} className="text-slate-300" />{" "}
                    {user.role.toUpperCase()}
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="sm:col-span-2 pt-6 border-t border-slate-100 flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <Calendar size={14} />
                  <span>
                    Member since:{" "}
                    <strong>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span>
                    Last Updated:{" "}
                    <strong>
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </strong>
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
