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
  ChevronDown, // Added for custom dropdown arrow
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
        console.error("Failed to fetch parkings:", err);
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
      toast.success("Identity Sequence Generated: Admin Created");
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
    w-full pl-12 pr-10 py-4 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 
    rounded-2xl text-[#FAF3E1] placeholder-[#FAF3E1]/20 focus:outline-none 
    focus:border-[#FA8112] focus:ring-1 focus:ring-[#FA8112]/20 transition-all font-medium
    appearance-none cursor-pointer
  `;

  const labelClasses =
    "text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em] mb-2 block ml-1";

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-4 rounded-3xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112] mb-2">
          <UserPlus size={32} />
        </div>
        <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
          Create <span className="text-[#FA8112]">Admin</span> Node
        </h1>
        <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em]">
          Authorize new administrative credentials
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#FAF3E1]/2 p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FA8112]/5 blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 gap-6">
            {/* Full Name */}
            <div className="relative group">
              <label className={labelClasses}>Full Name</label>
              <User
                className="absolute left-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={18}
              />
              <input
                name="fullName"
                placeholder="Ex: John Connor"
                value={form.fullName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <label className={labelClasses}>Digital Address (Email)</label>
              <Mail
                className="absolute left-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={18}
              />
              <input
                name="email"
                type="email"
                placeholder="admin@terminal.io"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <label className={labelClasses}>Security Cipher (Password)</label>
              <Lock
                className="absolute left-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={18}
              />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={inputClasses}
                minLength={8}
                title="Minimum 8 characters with uppercase, lowercase, number, and special character"
                required
              />
            </div>

            {/* Vehicle Number */}
            <div className="relative group">
              <label className={labelClasses}>Vehicle Number</label>
              <ShieldCheck
                className="absolute left-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={18}
              />
              <input
                name="vehicleNumber"
                placeholder="Ex: ABC123"
                value={form.vehicleNumber}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Styled Parking Dropdown */}
            <div className="relative group">
              <label className={labelClasses}>Assigned Parking</label>
              <Building
                className="absolute left-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors pointer-events-none"
                size={18}
              />

              <select
                name="parking"
                value={form.parking}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="" className="bg-[#222222] text-[#FAF3E1]">
                  Select Parking Terminal
                </option>
                {parkings.map((p) => (
                  <option
                    key={p._id}
                    value={p._id}
                    className="bg-[#222222] text-[#FAF3E1]"
                  >
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Custom Arrow */}
              <div className="absolute right-4 top-11.5 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-5 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#FAF3E1] transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-[#FA8112]/10"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <ShieldCheck size={18} />
            )}
            Initialize Admin Node
          </button>
        </form>
      </div>

      <p className="text-center text-[9px] font-black text-[#FAF3E1]/10 uppercase tracking-[0.4em]">
        Authorized personnel only • Access logs are recorded
      </p>
    </div>
  );
};

export default AddAdmin;
