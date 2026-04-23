import { useState, useEffect } from "react";
import { createAdmin } from "../Services/adminService";
import toast from "react-hot-toast";
import {
  UserPlus,
  Mail,
  Lock,
  Building,
  User,
  ShieldCheck,
  Loader2,
  ChevronDown,
  Fingerprint,
  Terminal,
} from "lucide-react";
import api from "../../../Shared/Services/api";

const AddAdmin = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    parking: "",
    vehicleNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    const fetchParkings = async () => {
      try {
        const res = await api.get("/super-admin/parking");
        setParkings(res.data);
      } catch (err) {
        console.error("Registry Sync Failure:", err);
      }
    };
    fetchParkings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createAdmin(form);
      toast.success("Identity Sequence Generated: Admin Node Active");
      setForm({
        fullName: "",
        email: "",
        password: "",
        parking: "",
        vehicleNumber: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Initialization Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full pl-12 pr-10 py-3.5 bg-[#1a1a1a] border border-[#F5E7C6]/5 
    rounded-lg text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:outline-none 
    focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all font-medium
    appearance-none cursor-pointer text-sm
  `;

  const labelClasses =
    "text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] mb-2 block ml-1";

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. HEADER: Security Identity */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-4 rounded-xl bg-[#FA8112]/5 border border-[#FA8112]/10 text-[#FA8112] shadow-[0_0_20px_rgba(250,129,18,0.05)] mb-2">
          <UserPlus size={28} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold text-[#FAF3E1] uppercase tracking-tight">
          Initialize <span className="text-[#FA8112]">Admin</span> Node
        </h1>
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-[#FA8112]/20" />
          <p className="text-[#FAF3E1]/30 text-[10px] font-bold uppercase tracking-[0.4em]">
            Authorize Privileged Credentials
          </p>
          <span className="h-px w-6 bg-[#FA8112]/20" />
        </div>
      </div>

      {/* 2. FORM CONSOLE */}
      <div className="bg-[#FAF3E1]/[0.01] p-8 md:p-10 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 text-[#FA8112]/[0.02] group-hover:text-[#FA8112]/[0.04] transition-colors duration-700">
          <Fingerprint size={200} strokeWidth={1} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 gap-6">
            {/* Full Name */}
            <div className="relative group/field">
              <label className={labelClasses}>Entity Designation</label>
              <User
                className="absolute left-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
                size={16}
              />
              <input
                name="fullName"
                placeholder="Ex: ARTHUR_DENT"
                value={form.fullName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Email */}
            <div className="relative group/field">
              <label className={labelClasses}>Digital Address (Email)</label>
              <Mail
                className="absolute left-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
                size={16}
              />
              <input
                name="email"
                type="email"
                placeholder="admin@node-registry.io"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Password */}
            <div className="relative group/field">
              <label className={labelClasses}>Security Cipher (Password)</label>
              <Lock
                className="absolute left-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
                size={16}
              />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={inputClasses}
                minLength={8}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Number */}
              <div className="relative group/field">
                <label className={labelClasses}>Asset Identifier</label>
                <ShieldCheck
                  className="absolute left-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors"
                  size={16}
                />
                <input
                  name="vehicleNumber"
                  placeholder="PLATE_REF"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Assigned Parking */}
              <div className="relative group/field">
                <label className={labelClasses}>Sector Assignment</label>
                <Building
                  className="absolute left-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors pointer-events-none"
                  size={16}
                />

                <select
                  name="parking"
                  value={form.parking}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                >
                  <option value="" className="bg-[#222222]">
                    SELECT_TERMINAL
                  </option>
                  {parkings.map((p) => (
                    <option key={p._id} value={p._id} className="bg-[#222222]">
                      {p.name.toUpperCase()}
                    </option>
                  ))}
                </select>

                <div className="absolute right-4 top-[38px] text-[#FAF3E1]/10 group-focus-within/field:text-[#FA8112] transition-colors pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-4 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all active:scale-[0.98] disabled:opacity-30 shadow-2xl shadow-[#FA8112]/5"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Terminal size={14} strokeWidth={2.5} />
            )}
            Initialize_Admin_Node
          </button>
        </form>
      </div>

      {/* 3. FOOTER: Compliance */}
      <div className="flex flex-col items-center gap-4 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <ShieldCheck size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Authorized Personnel Only • Audit Trace Active
        </p>
      </div>
    </div>
  );
};

export default AddAdmin;
